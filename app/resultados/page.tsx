// app/resultados/page.tsx
// Ruta: app/resultados/page.tsx
// Última modificación: October 03, 2025
// Descripción: Página de resultados que calcula scores de partidos basado en respuestas del quiz y posiciones políticas.

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

  const userCompassPosition = calculateCompassPosition(userAnswers, positions || [])

  const partyScores: Record<string, {
    score: number
    maxScore: number
    matches: Array<{ position: string; topic: string }>
    conflicts: Array<{ position: string; topic: string }>
    compassDistance: number
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
    }
  })

  const getTopicName = (topics: any): string => {
    if (!topics) return "General"
    if (Array.isArray(topics)) return topics[0]?.name || "General"
    return topics.name || "General"
  }

  userAnswers.forEach((answer) => {
    const position = positions?.find((p) => p.id === answer.position_id)
    if (!position) return

    const answerWeight = answer.position_weight * answer.question_weight

    const partiesWithPosition = partyPositions?.filter((pp) => pp.position_id === answer.position_id)

    parties?.forEach((party) => {
      if (!partyScores[party.id]) return

      partyScores[party.id].maxScore += answerWeight

      const partyPosition = partiesWithPosition?.find((pp) => pp.party_id === party.id)

      if (partyPosition) {
        if (partyPosition.stance === "favor") {
          const strength = partyPosition.strength || 5
          partyScores[party.id].score += answerWeight * (strength / 5)
          partyScores[party.id].matches.push({
            position: position.title,
            topic: getTopicName(position.topics),
          })
        } else if (partyPosition.stance === "contra") {
          partyScores[party.id].conflicts.push({
            position: position.title,
            topic: getTopicName(position.topics),
          })
        }
      }
    })
  })

const partyResults = await Promise.all(
  (parties || []).map(async (party) => {
    const scores = partyScores[party.id]
    const percentage =
      scores.maxScore > 0 ? Math.round((scores.score / scores.maxScore) * 100) : 0

    // 👇 consulta a candidatos
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
      analysis: "",
    }
  })
)

// ordenamiento
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