import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ResultsClient } from "@/components/results-client"
import { calculateCompassPosition } from "@/lib/calculate-compass-position"

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

  // Fetch quiz results
  const { data: quizResult, error: resultError } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("session_id", session)
    .single()

  if (resultError || !quizResult) {
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

  const { data: positions } = await supabase.from("positions").select(
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

  const userAnswers = quizResult.answers as Array<{
    position_id: string
    position_weight: number
    question_weight: number
  }>

  const userCompassPosition = calculateCompassPosition(userAnswers, positions || [])

  const partyScores: Record<
    string,
    {
      score: number
      maxScore: number
      matches: Array<{ position: string; topic: string }>
      conflicts: Array<{ position: string; topic: string }>
      compassDistance: number
    }
  > = {}

  // Initialize party scores
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
    }
  })

  // Calculate scores based on user answers and party positions
  userAnswers.forEach((answer) => {
    const position = positions?.find((p) => p.id === answer.position_id)
    if (!position) return

    const answerWeight = answer.position_weight * answer.question_weight

    // Find which parties support this position
    const partiesWithPosition = partyPositions?.filter((pp) => pp.position_id === answer.position_id)

    parties?.forEach((party) => {
      if (!partyScores[party.id]) return

      partyScores[party.id].maxScore += answerWeight

      const partyPosition = partiesWithPosition?.find((pp) => pp.party_id === party.id)

      if (partyPosition) {
        if (partyPosition.stance === "favor") {
          // Party supports this position - add to score
          const strength = partyPosition.strength || 5
          partyScores[party.id].score += answerWeight * (strength / 5)
          partyScores[party.id].matches.push({
            position: position.title,
            topic: position.topics?.name || "General",
          })
        } else if (partyPosition.stance === "contra") {
          // Party opposes this position - conflict
          partyScores[party.id].conflicts.push({
            position: position.title,
            topic: position.topics?.name || "General",
          })
        }
      }
    })
  })

  const partyResults = parties
    ?.map((party) => {
      const scores = partyScores[party.id]
      const percentage = scores.maxScore > 0 ? Math.round((scores.score / scores.maxScore) * 100) : 0

      return {
        party,
        percentage,
        matches: scores.matches,
        conflicts: scores.conflicts,
        compassDistance: scores.compassDistance,
      }
    })
    .sort((a, b) => {
      // Secondary sort by percentage match
      const distanceDiff = a.compassDistance - b.compassDistance
      if (Math.abs(distanceDiff) > 1) return distanceDiff
      return b.percentage - a.percentage
    })

  return (
    <ResultsClient
      results={partyResults || []}
      userAnswers={quizResult.answers}
      userCompassPosition={userCompassPosition}
    />
  )
}
