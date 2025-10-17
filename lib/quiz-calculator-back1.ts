// lib/quiz-calculator.ts
// Ruta: lib/quiz-calculator.ts
// Última modificación: 13 de octubre, 2025
// Descripción: Lógica centralizada para calcular afinidad partidaria basada en respuestas del quiz. CORREGIDO: algoritmo ahora calcula correctamente matches/conflicts y porcentajes de afinidad.

import type { UserAnswer, Position, PartyPosition, PoliticalParty, PartyScore, CompassPosition } from './types'

// Mapeo de stance a score multiplier (0 = oposición total, 1 = apoyo total)
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

/**
 * Calcula los scores de afinidad para todos los partidos basándose en las respuestas del usuario
 */
export function calculatePartyScores(
  userAnswers: UserAnswer[],
  parties: PoliticalParty[],
  partyPositions: PartyPosition[],
  positions: Position[],
  userCompassPosition: CompassPosition
): Record<string, PartyScore> {
  
  const partyScores: Record<string, PartyScore> = {}

  // Inicializar scores para cada partido
  parties.forEach((party) => {
    partyScores[party.id] = {
      score: 0,
      maxScore: 0,
      matches: [],
      conflicts: [],
      compassDistance: Math.sqrt(
        Math.pow(userCompassPosition.economic - (party.economic_axis || 0), 2) +
          Math.pow(userCompassPosition.social - (party.social_axis || 0), 2)
      ),
      debugInfo: []
    }
  })

  // Helper para obtener nombre del topic
  const getTopicName = (topics: any): string => {
    if (!topics) return "General"
    if (Array.isArray(topics)) return topics[0]?.name || "General"
    return topics.name || "General"
  }

  // Procesar cada respuesta del usuario
  userAnswers.forEach((answer) => {
    const position = positions.find((p) => p.id === answer.position_id)
    
    if (!position) {
      console.warn('[QuizCalculator] Position not found:', answer.position_id)
      return
    }

    // Peso total de esta respuesta
    const totalWeight = (answer.question_weight || 3) * (answer.position_weight || 3)

    // Para cada partido, buscar su stance en esta posición
    partyPositions.forEach((pp) => {
      if (pp.position_id === answer.position_id) {
        const party = partyScores[pp.party_id]
        if (!party) return

        // CRÍTICO: Cada respuesta suma al maxScore
        party.maxScore += totalWeight

        // Calcular puntos según stance
        let points = 0
        switch (pp.stance) {
          case "strongly_support":
            points = totalWeight * 1.0
            party.matches.push({
              position: position.title,
              topic: getTopicName(position.topics)
            })
            break
          case "support":
            points = totalWeight * 0.75
            party.matches.push({
              position: position.title,
              topic: getTopicName(position.topics)
            })
            break
          case "neutral":
            points = totalWeight * 0.5
            break
          /*case "oppose":
            //points = totalWeight * 0.25
            //party.conflicts.push({
              //position: position.title,
              //topic: getTopicName(position.topics)
            //})
            //break
          //case "strongly_oppose":
            //points = 0
            //party.conflicts.push({
              //position: position.title,
              //topic: getTopicName(position.topics)
            //})
            break*/
            
            //Reparando los conflictos en posturas de izquierda y progresistas cambiamos esto
            /*case "oppose":
              points = totalWeight * 0.25
              // Solo agregar a conflicts si el usuario eligió esta posición (position_weight > 0)
              if (answer.position_weight > 0) {
                party.conflicts.push({
                  position: position.title,
                  topic: getTopicName(position.topics)
                })
              }
            break
            case "strongly_oppose":
              points = 0
              // Solo agregar a conflicts si el usuario eligió esta posición (position_weight > 0)
              if (answer.position_weight > 0) {
                party.conflicts.push({
                  position: position.title,
                  topic: getTopicName(position.topics)
                })
              }
            break*/
            //Agregando esto 16/10
            case "oppose":
            points = totalWeight * 0.25
            // NO agregar a conflicts - el usuario no eligió esta posición
            break
            case "strongly_oppose":
            points = 0
            // NO agregar a conflicts - el usuario no eligió esta posición
            break
            
            
            case "favor":
            points = totalWeight * 1.0
            party.matches.push({
              position: position.title,
              topic: getTopicName(position.topics)
            })
            break
          case "contra":
            points = 0
            party.conflicts.push({
              position: position.title,
              topic: getTopicName(position.topics)
            })
            break
        }
        
        party.score += points

        // Debug info
        party.debugInfo.push({
          position: position.title,
          stance: pp.stance,
          weight: totalWeight,
          score: points,
          strength: pp.strength
        })
      }
    })
  })

  return partyScores
}

/**
 * Aplica el coeficiente UCR = 70% de UP
 * (Ajuste especial para reflejar la realidad política argentina)
 */
export function applyUCRCoefficient(
  partyScores: Record<string, PartyScore>,
  parties: PoliticalParty[]
): void {
  const upParty = parties.find(p => p.acronym === 'UP')
  const ucrParty = parties.find(p => p.acronym === 'UCR')
  
  if (!upParty || !ucrParty || !partyScores[upParty.id] || !partyScores[ucrParty.id]) {
    return
  }

  const upPercentage = partyScores[upParty.id].maxScore > 0 
    ? (partyScores[upParty.id].score / partyScores[upParty.id].maxScore) * 100 
    : 0
  
  const ucrAdjustedPercentage = upPercentage * 0.70
  
  // Ajustar el score de UCR para que resulte en el 70% de UP
  if (partyScores[ucrParty.id].maxScore > 0) {
    partyScores[ucrParty.id].score = (ucrAdjustedPercentage / 100) * partyScores[ucrParty.id].maxScore
  }
  
  console.log(
    `[QuizCalculator] UCR COEFICIENTE APLICADO: UP=${upPercentage.toFixed(1)}%, UCR=${ucrAdjustedPercentage.toFixed(1)}%`
  )
}

/**
 * Calcula el porcentaje de afinidad para un partido
 */
export function calculatePercentage(score: number, maxScore: number): number {
  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
}