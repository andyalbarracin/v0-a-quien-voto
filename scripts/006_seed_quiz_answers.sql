-- Link quiz answers to positions
-- ECONOMÍA - Pregunta 1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'El Estado debe reducir su tamaño y dejar que el mercado regule la economía', 1
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Qué opinas sobre el rol del Estado en la economía?'
AND p.title = 'Libre mercado';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'El Estado debe regular activamente la economía y proteger a los sectores vulnerables', 2
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Qué opinas sobre el rol del Estado en la economía?'
AND p.title = 'Intervención estatal';

-- ECONOMÍA - Pregunta 2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Reducir el gasto público y eliminar subsidios', 1
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Cuál debería ser la prioridad del gasto público?'
AND p.title = 'Reducción del gasto público';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Aumentar el gasto en programas sociales y subsidios', 2
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Cuál debería ser la prioridad del gasto público?'
AND p.title = 'Aumento del gasto social';

-- SEGURIDAD - Pregunta 1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Penas más duras, prisión efectiva y registro público de acusados', 1
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Qué piensas del tratamiento a acusados de delitos sexuales?'
AND p.title = 'Registro de delincuentes sexuales';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Enfoque en rehabilitación y reinserción social', 2
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Qué piensas del tratamiento a acusados de delitos sexuales?'
AND p.title = 'Enfoque en prevención';

-- SEGURIDAD - Pregunta 2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Debería bajarse para responsabilizar a menores por delitos graves', 1
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Cuál es tu postura sobre la edad de imputabilidad?'
AND p.title = 'Baja de edad de imputabilidad';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Debe mantenerse como está, priorizando la protección de menores', 2
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Cuál es tu postura sobre la edad de imputabilidad?'
AND p.title = 'Enfoque en prevención';

-- SEGURIDAD - Pregunta 3
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Con más policías en las calles y penas más severas', 1
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Cómo se debería abordar la inseguridad?'
AND p.title = 'Mano dura contra el delito';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Con programas de prevención y atención a causas sociales', 2
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Cómo se debería abordar la inseguridad?'
AND p.title = 'Enfoque en prevención';

-- SALUD - Pregunta 1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Debe fortalecerse el sistema público de salud', 1
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Cuál es tu postura sobre el sistema de salud?'
AND p.title = 'Fortalecimiento de salud pública';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Debería privatizarse para mejorar la eficiencia', 2
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Cuál es tu postura sobre el sistema de salud?'
AND p.title = 'Privatización de servicios de salud';

-- SALUD - Pregunta 2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Apoyo el derecho al aborto legal, seguro y gratuito', 1
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Cuál es tu posición sobre el aborto?'
AND p.title = 'Aborto legal';

-- EDUCACIÓN - Pregunta 1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Debe mantenerse gratuita y pública', 1
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Qué opinas sobre la educación universitaria pública?'
AND p.title = 'Universidad pública gratuita';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Debería implementarse un sistema de aranceles o vouchers', 2
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Qué opinas sobre la educación universitaria pública?'
AND p.title = 'Educación privada y vouchers';

-- EDUCACIÓN - Pregunta 2
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Aumentar el presupuesto educativo', 1
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Cuál debería ser la prioridad en educación?'
AND p.title = 'Aumento presupuesto educativo';

-- JUSTICIA - Pregunta 1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Es fundamental y debe ser prioridad absoluta', 1
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Qué tan importante es la lucha contra la corrupción?'
AND p.title = 'Lucha contra la corrupción';

-- TRABAJO - Pregunta 1
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Deben flexibilizarse para facilitar la contratación', 1
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Cuál es tu postura sobre las leyes laborales?'
AND p.title = 'Flexibilización laboral';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT q.id, p.id, 'Deben fortalecerse para proteger a los trabajadores', 2
FROM public.quiz_questions q
JOIN public.topics t ON q.topic_id = t.id
JOIN public.positions p ON p.topic_id = t.id
WHERE q.question_text = '¿Cuál es tu postura sobre las leyes laborales?'
AND p.title = 'Protección de derechos laborales';
