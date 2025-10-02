// components/results-client.tsx
// Última modificación: October 02, 2025
// Descripción: Cliente de resultados que renderiza partyResults con secciones declarations, votes, antecedentes, analysis (con mundiales), contradicciones, y toggle para detalles.

import React, { useState } from 'react';
// Asumir imports UI (cards, buttons, etc.)

const ResultsClient = ({ results, userAnswers, userCompassPosition }) => {
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (partyId) => {
    setShowDetails({ ...showDetails, [partyId]: !showDetails[partyId] });
  };

  return (
    <div className="p-6">
      <h2>Tus Resultados</h2>
      {results.map(r => (
        <div key={r.party.id} className="card">
          <h3>{r.party.name} - {r.percentage}% Match</h3>
          <p>Compass Distance: {r.compassDistance.toFixed(2)}</p>
          <h4>Declaraciones Públicas</h4>
          <ul>{r.declarations.map(d => <li key={d.date}>{d.text} ({d.date})</li>)}</ul>
          <h4>Historial Votaciones</h4>
          <ul>{r.votes.map(v => <li key={v.date}>{v.desc} {v.contradiction && <span className="text-red-500">⚠️ {v.contradiction}</span>}</li>)}</ul>
          <h4>Antecedentes</h4>
          <ul>{r.antecedentes.map(a => <li key={a}>{a}</li>)}</ul>
          <h4>Análisis con Benchmarks</h4>
          <p>{r.analysis}</p>
          <button className="details-toggle" onClick={() => toggleDetails(r.party.id)}>Mostrar/Ocultar Detalles</button>
          {showDetails[r.party.id] && (
            <div className="details-content">
              Resumen: Tus respuestas alinean con {r.party.name} por {r.matches.length} matches. Conflicto en {r.conflicts.length}. Mundial: Políticas abiertas elevan HDI (Chile 0.86 vs. Cuba 0.78).
            </div>
          )}
          <button className="international-btn">Ejemplos Internacionales</button>
        </div>
      ))}
    </div>
  );
};

export { ResultsClient };