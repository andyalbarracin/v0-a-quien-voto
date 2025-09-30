-- QUESTION 1: EDUCACIÓN
-- Answer 1.1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Aumentar el presupuesto educativo y garantizar educación universitaria gratuita para todos',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 1 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Educación')
  AND p.title = 'Educación pública universal';

-- Answer 1.2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Mejorar la calidad educativa con evaluaciones y capacitación docente, optimizando recursos existentes',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 1 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Educación')
  AND p.title = 'Reforma educativa con meritocracia';

-- Answer 1.3
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Permitir mayor participación privada y vouchers educativos para que las familias elijan',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 1 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Educación')
  AND p.title = 'Libertad educativa y competencia';

-- QUESTION 2: SALUD
-- Answer 2.1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Sistema público universal y gratuito financiado por el Estado',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 2 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Salud')
  AND p.title = 'Salud pública universal';

-- Answer 2.2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Sistema mixto con sector público fortalecido y privado regulado',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 2 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Salud')
  AND p.title = 'Reforma del sistema de salud';

-- Answer 2.3
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Priorizar el sector privado con seguros de salud y competencia de mercado',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 2 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Salud')
  AND p.title = 'Desregulación del sistema de salud';

-- QUESTION 3: TRABAJO
-- Answer 3.1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Mantener y fortalecer las protecciones laborales actuales, aumentar el rol de los sindicatos',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 3 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Trabajo')
  AND p.title = 'Protección laboral fuerte';

-- Answer 3.2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Modernizar las leyes laborales equilibrando protección con flexibilidad para generar empleo',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 3 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Trabajo')
  AND p.title = 'Reforma laboral moderada';

-- Answer 3.3
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Flexibilizar completamente el mercado laboral, reducir cargas patronales y limitar poder sindical',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 3 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Trabajo')
  AND p.title = 'Desregulación laboral';

-- QUESTION 4: JUSTICIA Y CORRUPCIÓN
-- Answer 4.1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Máxima prioridad: crear fiscalías especializadas, endurecer penas y eliminar fueros',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 4 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Justicia')
  AND p.title = 'Lucha activa contra la corrupción';

-- Answer 4.2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Importante pero debe equilibrarse con otras prioridades sociales y económicas',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 4 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Justicia')
  AND p.title = 'Reforma judicial moderada';

-- QUESTION 5: NARCOTRÁFICO
-- Answer 5.1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Mano dura: militarizar la lucha, penas severas y tolerancia cero',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 5 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Seguridad')
  AND p.title = 'Mano dura contra el crimen';

-- Answer 5.2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Enfoque integral: combatir el narcotráfico pero también prevención y tratamiento de adicciones',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 5 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Seguridad')
  AND p.title = 'Seguridad con prevención';

-- Answer 5.3
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Despenalizar el consumo, legalizar y regular para quitarle poder a las mafias',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 5 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Seguridad')
  AND p.title = 'Enfoque progresista en seguridad';

-- QUESTION 6: DELITOS SEXUALES
-- Answer 6.1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Prisión efectiva obligatoria, registro público de ofensores sexuales y penas más duras',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 6 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Seguridad')
  AND p.title = 'Mano dura contra el crimen';

-- Answer 6.2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Penas proporcionales con posibilidad de rehabilitación y seguimiento post-carcelario',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 6 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Seguridad')
  AND p.title = 'Seguridad con prevención';

-- Answer 6.3
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Enfoque en rehabilitación, penas alternativas y reintegración social',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 6 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Seguridad')
  AND p.title = 'Enfoque progresista en seguridad';

-- QUESTION 7: EDAD DE IMPUTABILIDAD
-- Answer 7.1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Bajar la edad de imputabilidad a 14 años para delitos graves',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 7 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Seguridad')
  AND p.title = 'Mano dura contra el crimen';

-- Answer 7.2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Mantener en 16 años pero mejorar el sistema de justicia juvenil',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 7 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Seguridad')
  AND p.title = 'Seguridad con prevención';

-- Answer 7.3
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Mantener o aumentar la edad, priorizar programas de prevención y contención social',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 7 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Seguridad')
  AND p.title = 'Enfoque progresista en seguridad';

-- QUESTION 8: INSEGURIDAD Y DELINCUENCIA
-- Answer 8.1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Aumentar penas, construir más cárceles, facilitar el uso de armas para defensa personal',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 8 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Seguridad')
  AND p.title = 'Mano dura contra el crimen';

-- Answer 8.2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Fortalecer policías y justicia, pero también invertir en prevención y oportunidades',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 8 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Seguridad')
  AND p.title = 'Seguridad con prevención';

-- Answer 8.3
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Abordar las causas sociales: pobreza, desigualdad y falta de oportunidades',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 8 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Seguridad')
  AND p.title = 'Enfoque progresista en seguridad';

-- QUESTION 9: INFLACIÓN Y POLÍTICA MONETARIA
-- Answer 9.1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Ajuste fiscal drástico, eliminar el Banco Central, dolarizar la economía',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 9 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Economía')
  AND p.title = 'Economía de libre mercado';

-- Answer 9.2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Equilibrio fiscal gradual, independencia del Banco Central, reformas estructurales',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 9 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Economía')
  AND p.title = 'Economía mixta con reformas';

-- Answer 9.3
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Controles de precios, aumentar salarios y jubilaciones, mayor gasto social',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 9 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Economía')
  AND p.title = 'Estado presente en economía';

-- QUESTION 10: POBREZA Y GASTO PÚBLICO
-- Answer 10.1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Reducir el gasto público, eliminar subsidios, bajar impuestos para que crezca el sector privado',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 10 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Economía')
  AND p.title = 'Economía de libre mercado';

-- Answer 10.2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Focalizar el gasto social en los más vulnerables, promover empleo privado con incentivos',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 10 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Economía')
  AND p.title = 'Economía mixta con reformas';

-- Answer 10.3
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Aumentar planes sociales, salario universal, mayor redistribución de la riqueza',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 10 
  AND q.topic_id = (SELECT id FROM public.topics WHERE name = 'Economía')
  AND p.title = 'Estado presente en economía';
