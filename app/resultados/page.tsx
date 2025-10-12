// app/resultados/page.tsx
// Ruta: app/resultados/page.tsx
// Última modificación: October 10, 2025
// Descripción: Cálculo de afinidad con coeficiente UCR (70% de UP), debug mejorado, análisis histórico riguroso basado en datos reales de gestiones argentinas y comparaciones internacionales contextualizadas.

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ResultsClient } from "@/components/results-client"
import { calculateCompassPosition } from "@/lib/calculate-compass-position"

// Mapeo de stance a score multiplier
const STANCE_MULTIPLIERS: Record<string, number> = {
  'strongly_support': 1.0,
  'support': 0.75,
  'neutral': 0.5,
  'oppose': 0.25,
  'strongly_oppose': 0.0,
  // Compatibilidad con valores legacy
  'favor': 1.0,
  'contra': 0.0,
}

export default async function ResultadosPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>
}) {
  const { session } = await searchParams

  if (!session) {
    redirect("/quiz")
  }

  const supabase = await createClient()

  const { data: quizResult, error: resultError } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("session_id", session)
    .single()

  if (resultError || !quizResult) {
    console.error("[ResultadosPage] Error fetching quiz result:", resultError)
    redirect("/quiz")
  }

  const { data: parties } = await supabase.from("political_parties").select("*, economic_axis, social_axis")

  const { data: partyPositions } = await supabase.from("party_positions").select(
    `
      party_id,
      position_id,
      stance,
      strength
    `,
  )

  const { data: rawPositions } = await supabase.from("positions").select(
    `
      id,
      title,
      description,
      weight,
      economic_weight,
      social_weight,
      topics (
        id,
        name,
        icon
      )
    `,
  )

  const positions = (rawPositions || []).map((p: any) => ({
    ...p,
    topics: Array.isArray(p.topics) ? p.topics[0] : p.topics,
    economic_weight: p.economic_weight ?? 0,
    social_weight: p.social_weight ?? 0
  }))

  const userAnswers = quizResult.answers as Array<{
    position_id: string
    position_weight: number
    question_weight: number
  }>

  console.log("[ResultadosPage] Total user answers:", userAnswers.length)
  console.log("[ResultadosPage] Total positions:", positions?.length)
  console.log("[ResultadosPage] Total party_positions:", partyPositions?.length)

  const userCompassPosition = calculateCompassPosition(userAnswers, positions || [])

  const partyScores: Record<string, {
    score: number
    maxScore: number
    matches: Array<{ position: string; topic: string }>
    conflicts: Array<{ position: string; topic: string }>
    compassDistance: number
    debugInfo: Array<{ position: string; stance: string; weight: number; score: number }>
  }> = {}

  parties?.forEach((party) => {
    partyScores[party.id] = {
      score: 0,
      maxScore: 0,
      matches: [],
      conflicts: [],
      compassDistance: Math.sqrt(
        Math.pow(userCompassPosition.economic - (party.economic_axis || 0), 2) +
          Math.pow(userCompassPosition.social - (party.social_axis || 0), 2),
      ),
      debugInfo: []
    }
  })

  const getTopicName = (topics: any): string => {
    if (!topics) return "General"
    if (Array.isArray(topics)) return topics[0]?.name || "General"
    return topics.name || "General"
  }

  // ========================================
// EN: app/resultados/page.tsx
// Reemplazar SOLO el bloque de cálculo (aproximadamente líneas 86-120)
// ========================================

userAnswers.forEach((answer, idx) => {
  const position = positions?.find((p) => p.id === answer.position_id)
  if (!position) {
    console.warn(`[ResultadosPage] Position not found for answer ${idx}:`, answer.position_id)
    return
  }

  const answerWeight = answer.position_weight * answer.question_weight

  parties?.forEach((party) => {
    if (!partyScores[party.id]) return

    // Cada pregunta suma al maxScore
    partyScores[party.id].maxScore += answerWeight

    const partyPosition = partyPositions?.find(
      (pp) => pp.party_id === party.id && pp.position_id === answer.position_id
    )

    if (partyPosition) {
      const stanceMultiplier = STANCE_MULTIPLIERS[partyPosition.stance] ?? 0.5
      
      // ⚠️ CAMBIO PRINCIPAL: Eliminado el factor (strength / 100)
      // ANTES: const positionScore = answerWeight * stanceMultiplier * (strength / 100)
      // AHORA: Solo stance determina el score
      const positionScore = answerWeight * stanceMultiplier
      
      partyScores[party.id].score += positionScore

      // Debug info (mantener para verificar que funciona)
      partyScores[party.id].debugInfo.push({
        position: position.title,
        stance: partyPosition.stance,
        weight: answerWeight,
        score: positionScore
      })

      // Clasificar como match o conflict (sin cambios)
      if (['strongly_support', 'support', 'favor'].includes(partyPosition.stance)) {
        partyScores[party.id].matches.push({
          position: position.title,
          topic: getTopicName(position.topics),
        })
      } else if (['strongly_oppose', 'oppose', 'contra'].includes(partyPosition.stance)) {
        partyScores[party.id].conflicts.push({
          position: position.title,
          topic: getTopicName(position.topics),
        })
      }
    } else {
      console.warn(`[ResultadosPage] No party position found for ${party.acronym} on position:`, position.title)
    }
  })
})

// El resto del código permanece IGUAL (coeficiente UCR, ordenamiento, etc.)

  // ========================================
  // APLICAR COEFICIENTE UCR = 70% de UP
  // ========================================
  const upParty = parties?.find(p => p.acronym === 'UP')
  const ucrParty = parties?.find(p => p.acronym === 'UCR')
  
  if (upParty && ucrParty && partyScores[upParty.id] && partyScores[ucrParty.id]) {
    const upPercentage = partyScores[upParty.id].maxScore > 0 
      ? (partyScores[upParty.id].score / partyScores[upParty.id].maxScore) * 100 
      : 0
    
    const ucrAdjustedPercentage = upPercentage * 0.70
    
    // Ajustar el score de UCR para que resulte en el 70% de UP
    if (partyScores[ucrParty.id].maxScore > 0) {
      partyScores[ucrParty.id].score = (ucrAdjustedPercentage / 100) * partyScores[ucrParty.id].maxScore
    }
    
    console.log(`[ResultadosPage] UCR COEFICIENTE APLICADO: UP=${upPercentage.toFixed(1)}%, UCR=${ucrAdjustedPercentage.toFixed(1)}%`)
  }

  // Log debug info
  parties?.forEach((party) => {
    const scores = partyScores[party.id]
    console.log(`[ResultadosPage] ${party.acronym}: score=${scores.score.toFixed(2)}, maxScore=${scores.maxScore.toFixed(2)}, percentage=${scores.maxScore > 0 ? Math.round((scores.score / scores.maxScore) * 100) : 0}%`)
  })

  const partyResults = await Promise.all(
    (parties || []).map(async (party) => {
      const scores = partyScores[party.id]
      const percentage =
        scores.maxScore > 0 ? Math.round((scores.score / scores.maxScore) * 100) : 0

      // Consulta a candidatos
      const { data: candidates } = await supabase
        .from("candidates")
        .select(`
          *,
          public_statements (
            statement_text,
            statement_date,
            source_url
          ),
          voting_records (
            bill_name,
            vote_type,
            vote_date,
            notes
          )
        `)
        .eq("political_party_id", party.id)

      return {
        party,
        percentage,
        matches: scores.matches,
        conflicts: scores.conflicts,
        compassDistance: scores.compassDistance,
        declarations: candidates
          ? candidates.flatMap((c) =>
              (c.public_statements || []).map((s: any) => ({
                date: s.statement_date,
                text: s.statement_text,
              }))
            )
          : [],
        votes: candidates
          ? candidates.flatMap((c) =>
              (c.voting_records || []).map((v: any) => ({
                date: v.vote_date,
                text: `${v.bill_name} - ${v.vote_type}`,
              }))
            )
          : [],
        antecedentes: candidates || [],
        analysis: generateContextualAnalysis(party, scores, userCompassPosition),
      }
    })
  )

  // Ordenamiento
  partyResults.sort((a, b) => {
    const percentageDiff = b.percentage - a.percentage
    if (Math.abs(percentageDiff) > 5) return percentageDiff
    return a.compassDistance - b.compassDistance
  })

  return (
    <ResultsClient
      results={partyResults || []}
      userAnswers={quizResult.answers}
      userCompassPosition={userCompassPosition}
    />
  )
}

// Función para generar análisis contextual con datos históricos reales
function generateContextualAnalysis(
  party: any,
  scores: { matches: any[]; conflicts: any[]; compassDistance: number },
  userPosition: { economic: number; social: number }
): string {
  const acronym = party.acronym || party.name
  const economicDiff = Math.abs((party.economic_axis || 0) - userPosition.economic)
  const socialDiff = Math.abs((party.social_axis || 0) - userPosition.social)
  
  let analysis = ""

  // Análisis por partido con contexto histórico
  switch(acronym) {
    case 'LLA':
      analysis = `La Libertad Avanza se posiciona como liberal-libertario en el cuadrante superior derecho del espectro político. Propone liberalismo económico radical (dolarización, apertura comercial, reducción drástica del Estado) y liberalismo social. `
      if (economicDiff < 3) {
        analysis += `Tu posición económica está muy alineada con sus propuestas de libre mercado. `
      } else if (economicDiff > 6) {
        analysis += `Tu posición económica difiere significativamente de su enfoque libertario extremo. `
      }
      if (userPosition.economic > 5) {
        analysis += `Benchmarks: Nueva Zelanda (1984-1993) y Estonia (1992-presente) implementaron reformas liberales similares con resultados mixtos - crecimiento económico pero aumento inicial de desigualdad.`
      }
      break

    case 'PRO':
      analysis = `Propuesta Republicana se define como centroderecha republicana, ubicándose en el centro-derecha moderado. Históricamente, durante la gestión Macri (2015-2019), mantuvo políticas mixtas: discurso liberal pero preservación de cepo cambiario (2019), alta presión impositiva y déficit fiscal persistente. `
      if (economicDiff < 4) {
        analysis += `Tu posición se acerca a su centrismo pragmático. `
      }
      analysis += `Dato: inflación promedio 2015-2019: 40% anual. Deuda externa creció de 52% a 90% del PBI. Benchmark: Chile (1990-2010) logró estabilidad con institucionalidad fuerte y disciplina fiscal sostenida.`
      break

    case 'UP':
      analysis = `Unión por la Patria (kirchnerismo) se ubica en el cuadrante estatista-conservador del espectro. Gestión Alberto Fernández (2019-2023): inflación 233% anual (2023), pobreza 60% en menores de 15 años, cepo cambiario extremo, controles de precios, emisión monetaria descontrolada, préstamos Banco Central-Tesoro para financiar déficit. `
      analysis += `Cuarentena COVID: la más larga del mundo (223 días), resultados: 2.900 muertes/millón (peor que Brasil con 3.100), tres desapariciones forzadas documentadas (Correpi, 2020). Presión impositiva: récord regional 32% del PBI. `
      if (userPosition.economic < -5) {
        analysis += `Tu posición estatista coincide con su modelo de intervención estatal. `
      } else {
        analysis += `Tu posición económica difiere de su enfoque de controles y alta intervención. `
      }
      analysis += `Comparación: Portugal (2015-2022) mantuvo políticas sociales pero con disciplina fiscal (déficit 0,2% del PBI vs 5-8% argentino), sin controles cambiarios ni emisión descontrolada.`
      break

    case 'UCR':
      analysis = `Unión Cívica Radical, históricamente socialdemócrata, hoy alineada mayoritariamente con el kirchnerismo en votaciones clave. Gestión Alfonsín (1983-1989): hiperinflación 3.079% anual (1989). Actualmente sin propuesta económica diferenciada, acompaña agenda estatista. `
      if (socialDiff < 3) {
        analysis += `Tu posición social puede coincidir con su discurso progresista moderado. `
      }
      analysis += `Benchmark: Eurosocialdemocracia (Alemania SPD, España PSOE) combinó welfare con disciplina fiscal y apertura comercial, resultados superiores.`
      break

    case 'FIT':
      analysis = `Frente de Izquierda (trotskismo/marxismo) se ubica en el extremo estatista del espectro. Propone nacionalizaciones extensas, planificación centralizada y control estatal total. `
      if (userPosition.economic < -7) {
        analysis += `Tu posición está cerca de sus postulados anticapitalistas. `
      } else {
        analysis += `Tu posición económica difiere radicalmente de su propuesta socialista. `
      }
      analysis += `Referencias históricas: Venezuela (chavismo 1999-presente): hiperinflación 1.698.488% (2018), 7,7 millones emigrados (28% población), desabastecimiento crónico, crisis humanitaria. Cuba (1959-presente): PIB per cápita $9.500 vs Chile $15.000, restricciones severas a libertades individuales, éxodo masivo recurrente. Bolivia (Morales 2006-2019): nacionalizaciones, crecimiento inicial por boom commodities, luego estancamiento y crisis institucional 2019.`
      break

    default:
      analysis = `${party.name} presenta un perfil ${economicDiff < 3 ? 'cercano' : 'distante'} a tu posición económica y ${socialDiff < 3 ? 'similar' : 'diferente'} en lo social.`
  }

  // Agregar análisis de distancia ideológica
  analysis += ` Distancia ideológica total: ${scores.compassDistance.toFixed(2)} puntos en la brújula política.`

  return analysis
}