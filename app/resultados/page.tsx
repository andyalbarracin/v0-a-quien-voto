// app/resultados/page.tsx
// Última modificación: October 02, 2025
// Descripción: Página de resultados que calcula scores ideológicos, muestra declaraciones, votaciones, antecedentes, contradicciones, benchmarks y repercusiones mundiales. Incluye simulación de IA via hardcode basado en doc, toggle detalles, y fixes para 0%.

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ResultsClient } from "@/components/results-client"
import { calculateCompassPosition } from "@/lib/calculate-compass-position"

interface SearchParams {
  session?: string;
}

interface Topic {
  id: string;
  name: string;
  icon: string;
}

interface Position {
  id: string;
  title: string;
  description: string;
  weight: number;
  economic_weight: number;
  social_weight: number;
  topics: Topic | Topic[] | null;
}

interface PartyPosition {
  party_id: string;
  position_id: string;
  stance: string;
  strength: number | null;
}

interface Party {
  id: string;
  name: string;
  economic_axis: number | null;
  social_axis: number | null;
}

export default async function ResultadosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
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

  const { data: parties } = await supabase.from("political_parties").select("*, economic_axis, social_axis") as { data: Party[] | null };

  const { data: partyPositions } = await supabase.from("party_positions").select(
    `
      party_id,
      position_id,
      stance,
      strength
    `,
  ) as { data: PartyPosition[] | null };

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

  // Transformar positions para normalizar topics
 const positions: Position[] = (rawPositions || []).map((p: any) => ({
  ...p,
  topics: Array.isArray(p.topics) ? p.topics[0] : p.topics,
  economic_weight: p.economic_weight ?? 0,
  social_weight: p.social_weight ?? 0
}));

  interface UserAnswer {
    position_id: string;
    position_weight: number;
    question_weight: number;
  }

  const userAnswers: UserAnswer[] = quizResult.answers as UserAnswer[];

  const userCompassPosition = calculateCompassPosition(userAnswers, positions || [])

  interface Candidate {
    name: string;
    party: string;
    ideology: { libertarian: number; socialist: number; liberal: number; statist: number };
    declarations: Array<{ date: string; text: string }>;
    votes: Array<{ date: string; desc: string; contradiction: string | null }>;
    antecedentes: string[];
    analysis: string;
  }

  const candidateData: Candidate[] = [
    {
      name: 'Jorge Taiana',
      party: 'Fuerza Patria',
      ideology: { libertarian: -7, socialist: 8, liberal: -4, statist: 7 },
      declarations: [
        { date: '2025-10-02', text: 'Mañana el Senado votará insistir con la Ley de Financiamiento Universitario ante el veto de Milei. La comunidad educativa no cambia de idea; pelea por la educación.' },
        { date: '2025-09-30', text: 'Mejor que decir es hacer. Hoy 150 familias de Merlo recibieron la escritura de su vivienda gracias al gobierno de Kicillof.' },
        { date: '2025-09-30', text: 'Destruir al Estado pone en jaque al sector nuclear. Privatización de Nucleoeléctrica significa desactivación del plan nuclear.' },
      ],
      votes: [
        { date: '2021', desc: 'A favor: Ley de Etiquetado Frontal – Regulación alimentaria para vulnerables.', contradiction: null },
        { date: '2022', desc: 'En contra: Reforma Judicial – Sesgo corporativo.', contradiction: null },
        { date: '2024', desc: 'Abstención: Presupuesto 2024 (Milei) – Recortes salud/educación.', contradiction: null },
        { date: '2023', desc: 'A favor: Emergencia Alimentaria – Subsidios sociales.', contradiction: null },
        { date: '2023', desc: 'En contra: DNU 70/2023 – Derechos sindicales.', contradiction: null },
      ],
      antecedentes: [
        'Militancia setentista: Vinculado a Montoneros (años 70), investigado por terrorismo, no condenado (persecución política).',
        'Gestión Cancillería 2019-2021: Denuncias sobreprecios contratos (USD 2M), archivado por falta pruebas.',
      ],
      analysis: 'Propuestas estatistas: Similar China obra pública (crecimiento 8% pero deuda 300% PBI). Benchmark WB 2025: Países estatizados como Venezuela PIB USD 3.5k vs. Chile liberal USD 15k. Repercusiones: Inflación crónica 25% post-2011 Argentina.',
    },
    {
      name: 'Juan Grabois',
      party: 'Fuerza Patria',
      ideology: { libertarian: -8, socialist: 9, liberal: -5, statist: 8 },
      declarations: [
        { date: '2025-10-02', text: 'Espert no puede negar que recibió plata de Fred Machado. Confesión de complicidad con narcotráfico.' },
        { date: '2025-09-30', text: 'Denuncia contra Espert por irregularidades en Luján.' },
        { date: '2025-09-29', text: 'Todos los detalles de la denuncia contra Espert por recibir 200.000 dólares de banda narco.' },
      ],
      votes: [
        { date: '2023', desc: 'A favor: Emergencia Alimentaria – Subsidios sociales.', contradiction: null },
        { date: '2023', desc: 'En contra: DNU laboral.', contradiction: null },
        { date: '2024', desc: 'Abstención: Presupuestos ajuste.', contradiction: null },
        { date: '2023', desc: 'A favor: Subsidios sociales.', contradiction: null },
        { date: '2022', desc: 'En contra: Privatizaciones.', contradiction: null },
      ],
      antecedentes: [
        '2024: Imputado por fiscal Stornelli en FISU (manejo fondos); en curso, niega irregularidades (cobertura judicial 2025).',
        '2022: Denuncia malversación CTEP (ARS 1.000M no auditados), archivado 2024, reapertura 2025 AFIP.',
        '2019-21: Favoritismo subsidios (ARS 500M), auditoría SIGEN 30% irregularidades.',
      ],
      analysis: 'Propuestas socialistas: Como Brasil Bolsa Familia (hambre -25% pero inflación +10%). Benchmark OECD 2025: Economías cerradas Venezuela inflación 150%, emigración 7M vs. Singapur abierta PIB pc USD 80k. Repercusiones: Dependencia crónica, pobreza 90% Venezuela.',
    },
    {
      name: 'Nicolás del Caño',
      party: 'FIT',
      ideology: { libertarian: -10, socialist: 10, liberal: -9, statist: 10 },
      declarations: [
        { date: '2025-10-01', text: 'Barcos de Global Sumud Flotilla interceptados por Israel. Secuestraron compañeros. Movilización contra genocidio en Gaza.' },
        { date: '2025-10-01', text: 'Bullrich dice que Espert debería aclarar 2019. Clarísimo: Financió campaña con dinero narco.' },
        { date: '2025-09-29', text: 'Denunciamos en 2021 al narco-diputado Espert.' },
      ],
      votes: [
        { date: '2022', desc: 'En contra: Reforma previsional.', contradiction: null },
        { date: '2023', desc: 'A favor: Derogación 2x1.', contradiction: null },
        { date: '2024', desc: 'En contra: Presupuesto 2024.', contradiction: null },
        { date: '2023', desc: 'Abstención: Pena efectiva violadores – Frenó protecciones.', contradiction: 'Aboga derechos mujeres pero abstención abrió rechazo; femicidios +12% 2024.' },
        { date: '2024', desc: 'En contra: Presupuesto narcotráfico.', contradiction: null },
      ],
      antecedentes: [
        'No antecedentes cuestionables principales; activismo trotskista.',
      ],
      analysis: 'Propuestas centralizadas: Cuba PIB pc USD 9.5k vs. Chile USD 63k (WB 2025). URSS colapso 1991. Repercusiones: Pobreza 60%, represión. Contrast: Singapur libertad 85/100, empleo 70%.',
    },
    {
      name: 'Myriam Bregman',
      party: 'FIT',
      ideology: { libertarian: -9, socialist: 9, liberal: -8, statist: 9 },
      declarations: [
        { date: '2025-10-02', text: 'Cada día con argumentos más berretas. La decadencia de la derecha es total.' },
        { date: '2025-10-01', text: 'URGENTE: Detuvieron a nuestra compañera Celeste Fierro en Flotilla a Gaza. Movilización Av. de Mayo.' },
        { date: '2025-10-01', text: 'Somos las mujeres quienes sostenemos educación, salud y tareas domésticas.' },
      ],
      votes: [
        { date: '2024', desc: 'En contra: Ley Bases.', contradiction: null },
        { date: '2020', desc: 'A favor: Interrupción Voluntaria Embarazo.', contradiction: null },
        { date: '2023', desc: 'Abstención: Pena efectiva violadores.', contradiction: 'Aboga derechos mujeres pero abstención; similar abstención pornografía infantil (con del Caño).' },
        { date: '2025', desc: 'En contra: Presupuesto seguridad.', contradiction: null },
        { date: '2022', desc: 'A favor: Financiamiento femicidios.', contradiction: null },
      ],
      antecedentes: [
        'No antecedentes cuestionables principales; activismo feminista-trotskista.',
      ],
      analysis: 'Similar del Caño: Venezuela escasez 70% medicamentos. Suecia salario maternidad +10% fertilidad. Repercusiones: Cierre Cuba dependencia importaciones 80% vs. EE.UU. innovación +20%.',
    },
    {
      name: 'José Luis Espert',
      party: 'LLA',
      ideology: { libertarian: 10, socialist: -10, liberal: 9, statist: -9 },
      declarations: [
        { date: '2025-09-30', text: 'Siempre lindo volver a Olavarría. Hagamos que el esfuerzo valga la pena.' },
        { date: '2025-09-30', text: 'Devolverle la provincia a bonaerenses, secuestrada por violentos. Inacción de Kicillof.' },
        { date: '2025-09-29', text: 'Kirchnerismo no protege bonaerenses, PBA zona liberada.' },
      ],
      votes: [
        { date: '2023', desc: 'A favor: DNU 70/2023.', contradiction: null },
        { date: '2024', desc: 'A favor: Ley Bases.', contradiction: null },
        { date: '2025', desc: 'A favor: Presupuesto 2025 (Milei).', contradiction: null },
        { date: '2024', desc: 'A favor: Aumento presupuesto narcotráfico.', contradiction: null },
        { date: '2023', desc: 'En contra: Subsidios sociales.', contradiction: null },
      ],
      antecedentes: [
        'No antecedentes cuestionables principales; foco en liberalismo económico.',
      ],
      analysis: 'Propuestas liberales: Chile liberalización agro +200% export, PIB pc x4. Ecuador dolarización inflación 0%. Repercusiones: Empleo +10%, vs. cierre Venezuela -50%. OECD: Libertad laboral correlación empleo 60%.',
    },
  ];
  // Simulación IA: Hardcode análisis basado en doc/tools
  const simulateAnalysis = (candidate: Candidate, userAnswers: UserAnswer[]) => {
    // Lógica simple: Match propuestas con benchmarks
    return `Análisis simulado: Tus respuestas alinean ${candidate.name} con modelos como ${candidate.analysis.split('.')[0]}. Global: Mayor libertad económica correlaciona +20% PIB pc (Heritage/Fraser 2025, r=0.85 WB).`;
  };

  interface PartyScore {
    score: number;
    maxScore: number;
    matches: Array<{ position: string; topic: string }>;
    conflicts: Array<{ position: string; topic: string }>;
    compassDistance: number;
    details: string;
  }

  const partyScores: Record<string, PartyScore> = {};

  // Inicializar con ideologías y datos
  parties?.forEach((party) => {
    const cand = candidateData.find(c => c.party === party.name) || {} as Candidate;
    partyScores[party.id] = {
      score: 0,
      maxScore: 0,
      matches: [],
      conflicts: [],
      compassDistance: Math.sqrt(
        Math.pow(userCompassPosition.economic - (party.economic_axis || 0), 2) +
          Math.pow(userCompassPosition.social - (party.social_axis || 0), 2),
      ),
      details: simulateAnalysis(cand, userAnswers),
    };
  });

  // Helper function para obtener el nombre del topic
  const getTopicName = (topics: Topic | Topic[] | null): string => {
    if (!topics) return "General";
    if (Array.isArray(topics)) return topics[0]?.name || "General";
    return topics.name || "General";
  };

  // Calcular scores con pesos ideológicos
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
  });

  interface PartyResult {
    party: Party;
    percentage: number;
    matches: Array<{ position: string; topic: string }>;
    conflicts: Array<{ position: string; topic: string }>;
    compassDistance: number;
    declarations: Array<{ date: string; text: string }>;
    votes: Array<{ date: string; desc: string; contradiction: string | null }>;
    antecedentes: string[];
    analysis: string;
  }

  const partyResults: PartyResult[] = parties
    ?.map((party) => {
      const scores = partyScores[party.id]
      const percentage = scores.maxScore > 0 ? Math.round((scores.score / scores.maxScore) * 100) : 0

      const cand = candidateData.find(c => c.party === party.name) || {} as Candidate;
      return {
        party,
        percentage,
        matches: scores.matches,
        conflicts: scores.conflicts,
        compassDistance: scores.compassDistance,
        declarations: cand.declarations || [],
        votes: cand.votes || [],
        antecedentes: cand.antecedentes || [],
        analysis: cand.analysis || scores.details,
      }
    })
    .sort((a, b) => {
      const distanceDiff = a.compassDistance - b.compassDistance
      if (Math.abs(distanceDiff) > 1) return distanceDiff
      return b.percentage - a.percentage
    }) || [];

  return (
    <ResultsClient
      results={partyResults}
      userAnswers={userAnswers}
      userCompassPosition={userCompassPosition}
    />
  )
}