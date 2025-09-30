-- Create quiz questions for each topic
-- ECONOMÍA
INSERT INTO public.quiz_questions (topic_id, question_text, question_order)
SELECT id, '¿Qué opinas sobre el rol del Estado en la economía?', 1
FROM public.topics WHERE name = 'Economía';

INSERT INTO public.quiz_questions (topic_id, question_text, question_order)
SELECT id, '¿Cuál debería ser la prioridad del gasto público?', 2
FROM public.topics WHERE name = 'Economía';

-- SEGURIDAD
INSERT INTO public.quiz_questions (topic_id, question_text, question_order)
SELECT id, '¿Qué piensas del tratamiento a acusados de delitos sexuales?', 1
FROM public.topics WHERE name = 'Seguridad';

INSERT INTO public.quiz_questions (topic_id, question_text, question_order)
SELECT id, '¿Cuál es tu postura sobre la edad de imputabilidad?', 2
FROM public.topics WHERE name = 'Seguridad';

INSERT INTO public.quiz_questions (topic_id, question_text, question_order)
SELECT id, '¿Cómo se debería abordar la inseguridad?', 3
FROM public.topics WHERE name = 'Seguridad';

-- SALUD
INSERT INTO public.quiz_questions (topic_id, question_text, question_order)
SELECT id, '¿Cuál es tu postura sobre el sistema de salud?', 1
FROM public.topics WHERE name = 'Salud';

INSERT INTO public.quiz_questions (topic_id, question_text, question_order)
SELECT id, '¿Cuál es tu posición sobre el aborto?', 2
FROM public.topics WHERE name = 'Salud';

-- EDUCACIÓN
INSERT INTO public.quiz_questions (topic_id, question_text, question_order)
SELECT id, '¿Qué opinas sobre la educación universitaria pública?', 1
FROM public.topics WHERE name = 'Educación';

INSERT INTO public.quiz_questions (topic_id, question_text, question_order)
SELECT id, '¿Cuál debería ser la prioridad en educación?', 2
FROM public.topics WHERE name = 'Educación';

-- JUSTICIA
INSERT INTO public.quiz_questions (topic_id, question_text, question_order)
SELECT id, '¿Qué tan importante es la lucha contra la corrupción?', 1
FROM public.topics WHERE name = 'Justicia';

-- TRABAJO
INSERT INTO public.quiz_questions (topic_id, question_text, question_order)
SELECT id, '¿Cuál es tu postura sobre las leyes laborales?', 1
FROM public.topics WHERE name = 'Trabajo';
