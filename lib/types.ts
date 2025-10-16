// lib/types.ts
// Ruta: lib/types.ts
// Última modificación: 12 de octubre, 2025
// Descripción: Tipos compartidos para el sistema de quiz político

export type CompassPosition = {
  economic: number // -10 to +10 (estatismo a liberalismo)
  social: number // -10 to +10 (conservador a progresista)
}

export type UserAnswer = {
  question_id: string
  answer_id: string
  position_id: string
  position_weight: number
  question_weight: number
}

export type Position = {
  id: string
  title: string
  description: string
  economic_weight: number
  social_weight: number
  weight: number
  topics?: {
    id: string
    name: string
    icon: string
  }
}

export type PartyPosition = {
  party_id: string
  position_id: string
  stance: 'strongly_support' | 'support' | 'neutral' | 'oppose' | 'strongly_oppose' | 'favor' | 'contra'
  strength: number
}

export type PoliticalParty = {
  id: string
  name: string
  acronym?: string
  description?: string
  ideology?: string
  economic_axis: number
  social_axis: number
  international_examples?: string | any[]
  color?: string
}

export type PartyScore = {
  score: number
  maxScore: number
  matches: Array<{ position: string; topic: string }>
  conflicts: Array<{ position: string; topic: string }>
  compassDistance: number
  debugInfo: Array<{ 
    position: string
    stance: string
    weight: number
    score: number
    strength: number
  }>
}
