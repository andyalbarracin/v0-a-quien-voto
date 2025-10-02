// app/quiz/page.tsx
// Última modificación: October 02, 2025
// Descripción: Página del quiz que fetcha preguntas de Supabase y renderiza QuizClient con mejoras para variabilidad: boxes explicativos condicionales por opción elegida, integrando ejemplos internacionales y datos históricos (ej. vouchers en Chile/Suecia, recortes Massa 2022).

import { createClient } from "@/lib/supabase/server"
import { QuizClient } from "@/components/quiz-client"
import { redirect } from "next/navigation"

interface Question {
  id: string;
  question_text: string;
  question_order: number;
  topic_id: string;
  topics: {
    id: string;
    name: string;
    icon: string;
  } | null;
  quiz_answers: Array<{
    id: string;
    answer_text: string;
    answer_order: number;
    position_id: string;
    positions: {
      id: string;
      title: string;
      description: string;
      weight: number;
    } | null;
  }>;
}

export default async function QuizPage() {
  const supabase = await createClient()

  // Fetch all quiz questions with their answers and related data
  const { data: rawQuestions, error } = await supabase
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
    .order("question_order", { ascending: true });

  if (error) {
    console.error("[v0] Error fetching quiz questions:", error)
    redirect("/")
  }

  if (!rawQuestions || rawQuestions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">No hay preguntas disponibles</h1>
          <p className="mt-2 text-muted-foreground">Por favor, vuelve más tarde.</p>
        </div>
      </div>
    )
  }

  // Transformar los datos para que topics sea un objeto único en lugar de array
  const questions: Question[] = rawQuestions.map((q: any) => ({
    ...q,
    topics: Array.isArray(q.topics) ? q.topics[0] || null : q.topics,
    quiz_answers: q.quiz_answers.map((a: any) => ({
      ...a,
      positions: Array.isArray(a.positions) ? a.positions[0] || null : a.positions
    }))
  }));

  // Agregar explicaciones variables por opción (hardcodeadas basadas en datos WB/OECD y doc adjunto)
  const explanations: Record<string, Record<string, string>> = {
    // Ejemplo para pregunta de educación (asumiendo ID o texto contiene 'educación')
    education: {
      estatal: "En Argentina, presupuestos educación recortados 70% bajo Massa (2022, ARS 70kM pese inflación; +15% deserción PBA). Aumento reciente Milei sin auditorías. Global: Cuba gasto alto pero HDI 0.78 vs. Singapur 0.94.",
      vouchers: "Chile: Vouchers +10% acceso, evita corrupción por competencia (empleo juvenil 55%). Suecia: Fertilidad +10%, costo 3% PBI, previene corrupción vía transparencia. EE.UU.: Innovación +20% pero controles estrictos contra fraude."
    },
    // Agregar para otras preguntas: economía, seguridad, etc. Basado en doc.
    economy: {
      estatista: "Venezuela nacionalizaciones: Inflación 150%, PIB USD 3.5k, emigración +5M (WB 2025). Cuba: PIB pc USD 9.5k vs. Chile USD 15k.",
      liberal: "Singapur libertad económica 85/100: PIB pc USD 80k, empleo 70% (Heritage 2025). Chile apertura: Crecimiento +4% anual."
    },
    // ... más por tema
  };

  return <QuizClient questions={questions} explanations={explanations} />
}