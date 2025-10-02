// components/quiz-client.tsx
// Última modificación: October 02, 2025
// Descripción: Cliente del quiz que maneja respuestas, muestra boxes variables por opción, y envía a resultados. Integra explanations prop.

"use client"; // Marca como Client Component para usar useState

import React, { useState } from 'react';

interface QuizClientProps {
  questions: Array<{
    id: string;
    question_text: string;
    quiz_answers: Array<{
      id: string;
      position_id: string;
      answer_text: string;
    }>;
    topics: {
      id: string;
      name: string;
      icon: string;
    } | null;
  }>;
  explanations: Record<string, Record<string, string>>;
}

const QuizClient = ({ questions, explanations }: QuizClientProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleOptionChange = (questionId: string, optionValue: string, topic: string) => {
    setAnswers({ ...answers, [questionId]: optionValue });
    setSelectedOptions({ ...selectedOptions, [questionId]: optionValue });
  };

  const submitQuiz = () => {
    // Lógica para submit a Supabase o redirigir a /resultados
    window.location.href = `/resultados?session=${Math.random()}`; // Simulado
  };

  return (
    <div className="p-6">
      <h2>Quiz Elecciones 2025</h2>
      {questions.map(q => (
        <div key={q.id}>
          <h3>{q.question_text}</h3>
          {q.quiz_answers.map(a => (
            <div key={a.id}>
              <input
                type="radio"
                value={a.position_id}
                onChange={() => handleOptionChange(q.id, a.position_id, q.topics?.name || 'general')}
              />
              {a.answer_text}
              {selectedOptions[q.id] === a.position_id && q.topics && (
                <div className="explanation-box">
                  {explanations[q.topics.name.toLowerCase()]?.[a.position_id] || 'Explicación general: Impacto histórico y global.'}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      <button onClick={submitQuiz}>Enviar</button>
    </div>
  );
};

export { QuizClient };