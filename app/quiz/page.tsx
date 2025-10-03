// app/quiz/page.tsx
// Ruta: app/quiz/page.tsx
// Última modificación: October 02, 2025
// Descripción: Página del quiz que fetcha preguntas con weight desde Supabase, transforma datos y renderiza QuizClient.

import { createClient } from "@/lib/supabase/server"
import { QuizClient } from "@/components/quiz-client"
import { redirect } from "next/navigation"

export default async function QuizPage() {
  const supabase = await createClient()

  const { data: rawQuestions, error } = await supabase
    .from("quiz_questions")
    .select(
      `
      id,
      question_text,
      question_order,
      weight,
      topic_id,
      topics (
        id,
        name,
        icon
      ),
      quiz_answers (
        id,
        answer_text,
        answer_order,
        position_id,
        context_title,
        context_description,
        context_data,
        context_examples,
        wikipedia_links,
        positions (
          id,
          title,
          description,
          weight
        )
      )
    `,
    )
    .order("question_order", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching quiz questions:", error)
    redirect("/")
  }

  if (!rawQuestions || rawQuestions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-between px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">No hay preguntas disponibles</h1>
          <p className="mt-2 text-muted-foreground">Por favor, vuelve más tarde.</p>
        </div>
      </div>
    )
  }

  const questions = rawQuestions.map((q: any) => ({
    ...q,
    topics: Array.isArray(q.topics) ? q.topics[0] : q.topics,
    quiz_answers: q.quiz_answers.map((a: any) => ({
      ...a,
      positions: Array.isArray(a.positions) ? a.positions[0] : a.positions
    }))
  }))

  return <QuizClient questions={questions} />
}