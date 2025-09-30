export type CompassPosition = {
  economic: number // -10 to +10 (socialist to libertarian)
  social: number // -10 to +10 (authoritarian to liberal)
}

export type UserAnswer = {
  position_id: string
  position_weight: number
  question_weight: number
}

export type Position = {
  id: string
  title: string
  economic_weight: number
  social_weight: number
  weight: number
}

/**
 * Calculate user's position on the political compass based on their quiz answers
 * @param answers User's quiz answers
 * @param positions All available positions with their axis weights
 * @returns CompassPosition with economic and social coordinates
 */
export function calculateCompassPosition(answers: UserAnswer[], positions: Position[]): CompassPosition {
  let economicSum = 0
  let socialSum = 0
  let totalWeight = 0

  answers.forEach((answer) => {
    const position = positions.find((p) => p.id === answer.position_id)
    if (!position) return

    const answerWeight = answer.position_weight * answer.question_weight

    // Calculate contribution to each axis
    economicSum += position.economic_weight * answerWeight
    socialSum += position.social_weight * answerWeight
    totalWeight += Math.abs(answerWeight)
  })

  // Normalize to -10 to +10 scale
  const economic = totalWeight > 0 ? (economicSum / totalWeight) * 10 : 0
  const social = totalWeight > 0 ? (socialSum / totalWeight) * 10 : 0

  return {
    economic: Math.max(-10, Math.min(10, economic)),
    social: Math.max(-10, Math.min(10, social)),
  }
}

/**
 * Calculate distance between two compass positions
 * @param pos1 First position
 * @param pos2 Second position
 * @returns Euclidean distance between positions
 */
export function calculateCompassDistance(pos1: CompassPosition, pos2: CompassPosition): number {
  const dx = pos1.economic - pos2.economic
  const dy = pos1.social - pos2.social
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Get ideological label based on compass position
 * @param position Compass position
 * @returns Human-readable ideological label
 */
export function getIdeologyLabel(position: CompassPosition): string {
  const { economic, social } = position

  // Determine economic tendency
  let economicLabel = ""
  if (economic > 5) economicLabel = "Libertario"
  else if (economic > 2) economicLabel = "Liberal"
  else if (economic > -2) economicLabel = "Centrista"
  else if (economic > -5) economicLabel = "Socialdemócrata"
  else economicLabel = "Socialista"

  // Determine social tendency
  let socialLabel = ""
  if (social > 5) socialLabel = "Progresista"
  else if (social > 2) socialLabel = "Liberal"
  else if (social > -2) socialLabel = ""
  else if (social > -5) socialLabel = "Conservador"
  else socialLabel = "Autoritario"

  // Combine labels
  if (socialLabel) {
    return `${economicLabel} ${socialLabel}`
  }
  return economicLabel
}
