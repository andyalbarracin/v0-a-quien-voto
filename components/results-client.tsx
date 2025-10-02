import React from 'react';

interface Candidate {
  name: string;
  party: string;
  ideology: { libertarian: number; socialist: number; liberal: number; statist: number }; // Pesos base (-10 a +10)
  // ... otros fields del doc adjunto
}

const candidates: Candidate[] = [
  {
    name: 'Juan Grabois',
    party: 'Fuerza Patria',
    ideology: { libertarian: -8, socialist: 9, liberal: -5, statist: 8 }, // Alto estatista/socialista
  },
  {
    name: 'Nicolás del Caño',
    party: 'FIT',
    ideology: { libertarian: -10, socialist: 10, liberal: -9, statist: 10 }, // Máx socialista/estatista
  },
  {
    name: 'José Luis Espert',
    party: 'LLA',
    ideology: { libertarian: 10, socialist: -10, liberal: 9, statist: -9 }, // Máx libertario/liberal
  },
  // Agregá más del doc: Taiana (estatista moderado: socialist 6, statist 7), Bregman (socialist 9), etc.
];

interface UserAnswers {
  [questionId: string]: string; // ej. { 'econ1': 'opcionEstatista' }
}

const Results: React.FC<{ answers: UserAnswers }> = ({ answers }) => {
  const calculateScore = (candidate: Candidate, answers: UserAnswers): number => {
    let totalScore = 0;
    let maxScore = 0;
    Object.keys(answers).forEach(qId => {
      const userChoice = answers[qId];
      // Mapeo de opciones a pesos (custom por pregunta; expandí según tus preguntas)
      const weights = {
        // Ej. Pregunta economía: 'Fortalecer estatal' = +2 socialist/statist, 'Vouchers' = +2 libertarian/liberal
        econ1: { 'estatista': { socialist: 2, statist: 2 }, 'libertario': { libertarian: 2, liberal: 2 } },
        // Agregá más preguntas del doc: seguridad, género, etc.
      };
      const qWeights = weights[qId as keyof typeof weights];
      if (qWeights) {
        const choiceWeights = Object.values(qWeights).find(w => Object.keys(w)[0] === userChoice); // Simplificado
        if (choiceWeights) {
          totalScore += (choiceWeights as any)[userChoice === 'estatista' ? 'socialist' : 'libertarian']; // Match ideológico
          maxScore += 2; // Peso máx por pregunta
        }
      }
    });
    return (totalScore / maxScore) * 100; // % match
  };

  const sortedCandidates = candidates
    .map(c => ({ ...c, score: calculateScore(c, answers) }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Tus Resultados</h2>
      {sortedCandidates.map((c, i) => (
        <div key={i} className="bg-white p-4 mb-4 rounded shadow">
          <h3>{c.name} ({c.party}) - {c.score.toFixed(1)}% Match</h3>
          <p>Ideología: Libertario {c.ideology.libertarian} | Socialista {c.ideology.socialist} | etc.</p>
        </div>
      ))}
    </div>
  );
};

export default Results;