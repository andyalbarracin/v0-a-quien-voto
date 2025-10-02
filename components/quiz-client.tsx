// components/quiz-client.tsx
// Última modificación: October 02, 2025
// Descripción: Cliente del quiz que maneja respuestas, muestra boxes variables por opción, y envía a resultados. Integra explanations prop.

import React, { useState } from 'react';
// Asumir imports necesarios de UI (buttons, radios, etc.)

const QuizClient = ({ questions, explanations }) => {
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({}); // Para variabilidad por pregunta

  const handleOptionChange = (questionId, optionValue, topic) => {
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
                value={a.position_id} // Asumir 'estatal', 'vouchers', etc.
                onChange={() => handleOptionChange(q.id, a.position_id, q.topics.name)}
              />
              {a.answer_text}
              {selectedOptions[q.id] === a.position_id && (
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