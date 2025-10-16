// app/resultados/page.tsx
// Ruta: app/resultados/page.tsx
// Última modificación: 12 de octubre, 2025
// Descripción: Página de resultados del quiz. Calcula afinidad partidaria usando el nuevo sistema corregido en quiz-calculator.ts

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ResultsClient } from "@/components/results-client"
import { calculateCompassPosition } from "@/lib/calculate-compass-position"
import { calculatePartyScores, applyUCRCoefficient, calculatePercentage } from "@/lib/quiz-calculator"
import type { UserAnswer } from "@/lib/types"

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

  // 1. Obtener resultado del quiz
  const { data: quizResult, error: resultError } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("session_id", session)
    .single()

  if (resultError || !quizResult) {
    console.error("[ResultadosPage] Error fetching quiz result:", resultError)
    redirect("/quiz")
  }

  // 2. Obtener datos necesarios de Supabase
  const { data: parties } = await supabase
    .from("political_parties")
    .select("*, economic_axis, social_axis")

  const { data: partyPositions } = await supabase
    .from("party_positions")
    .select("party_id, position_id, stance, strength")

  const { data: rawPositions } = await supabase
    .from("positions")
    .select(`
      id,
      title,
      description,
      weight,
      economic_weight,
      social_weight,
      topics (id, name, icon)
    `)

  // 3. Normalizar datos
  const positions = (rawPositions || []).map((p: any) => ({
    ...p,
    topics: Array.isArray(p.topics) ? p.topics[0] : p.topics,
    economic_weight: p.economic_weight ?? 0,
    social_weight: p.social_weight ?? 0
  }))

  const userAnswers = quizResult.answers as UserAnswer[]

  console.log("[ResultadosPage] Total user answers:", userAnswers.length)
  console.log("[ResultadosPage] Total positions:", positions?.length)
  console.log("[ResultadosPage] Total party_positions:", partyPositions?.length)

  // 4. Calcular posición del usuario en la brújula política
  const userCompassPosition = calculateCompassPosition(userAnswers, positions)

  // 5. CÁLCULO PRINCIPAL: Calcular scores de afinidad por partido
  const partyScores = calculatePartyScores(
    userAnswers,
    parties || [],
    partyPositions || [],
    positions,
    userCompassPosition
  )

  // 6. Aplicar coeficiente UCR (70% de UP)
  applyUCRCoefficient(partyScores, parties || [])

  // 7. Log de debug
  parties?.forEach((party) => {
    const scores = partyScores[party.id]
    const percentage = calculatePercentage(scores.score, scores.maxScore)
    console.log(
      `[ResultadosPage] ${party.acronym}: score=${scores.score.toFixed(2)}, maxScore=${scores.maxScore.toFixed(2)}, percentage=${percentage}%`
    )
    
    // Log detallado de los primeros 3 matches/conflicts
    if (scores.debugInfo.length > 0) {
      console.log(`  Primeras 3 posiciones:`)
      scores.debugInfo.slice(0, 3).forEach(info => {
        console.log(`    - ${info.position}: stance=${info.stance}, score=${info.score.toFixed(2)}`)
      })
    }
  })

  // 8. Generar resultados finales con análisis contextual
  const partyResults = await Promise.all(
    (parties || []).map(async (party) => {
      const scores = partyScores[party.id]
      const percentage = calculatePercentage(scores.score, scores.maxScore)

      // Consulta a candidatos para declaraciones y votaciones
      const { data: candidates } = await supabase
        .from("candidates")
        .select(`
          *,
          public_statements (statement_text, statement_date, source_url),
          voting_records (bill_name, vote_type, vote_date, notes)
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

  // 9. Ordenar resultados: primero por porcentaje, luego por distancia ideológica
  partyResults.sort((a, b) => {
    const percentageDiff = b.percentage - a.percentage
    if (Math.abs(percentageDiff) > 5) return percentageDiff
    return a.compassDistance - b.compassDistance
  })

  // 10. Renderizar cliente con resultados
  return (
    <ResultsClient
      results={partyResults}
      userAnswers={quizResult.answers}
      userCompassPosition={userCompassPosition}
    />
  )
}

// ===========================================
// FUNCIÓN DE ANÁLISIS CONTEXTUAL
// ===========================================

function generateContextualAnalysis(
  party: any,
  scores: { matches: any[]; conflicts: any[]; compassDistance: number },
  userPosition: { economic: number; social: number }
): string {
  const acronym = party.acronym || party.name
  const economicDiff = Math.abs((party.economic_axis || 0) - userPosition.economic)
  const socialDiff = Math.abs((party.social_axis || 0) - userPosition.social)
  
  let analysis = ""

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

  analysis += ` Distancia ideológica total: ${scores.compassDistance.toFixed(2)} puntos en la brújula política.`

  return analysis
}