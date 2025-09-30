import { createClient } from "@/lib/supabase/server"
import { QuizClient } from "@/components/quiz-client"
import { redirect } from "next/navigation"

export default async function QuizPage() {
  const supabase = await createClient()

  // Fetch all quiz questions with their answers and related data
  const { data: questions, error } = await supabase
    .from("quiz_questions")
    .select(
      `
      id,
      question_text,
      question_order,
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

  if (!questions || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">No hay preguntas disponibles</h1>
          <p className="mt-2 text-muted-foreground">Por favor, vuelve más tarde.</p>
        </div>
      </div>
    )
  }

  return <QuizClient questions={questions} />
}
