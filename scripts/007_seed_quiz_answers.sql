-- Answers for Question 1: EDUCACIÓN
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Fortalecer la educación pública con mayor inversión estatal y mejores salarios docentes',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 1 
AND p.title = 'Educación pública de calidad';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Implementar vouchers educativos y promover la competencia entre escuelas públicas y privadas',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 1 
AND p.title = 'Libertad de elección educativa';

-- Answers for Question 2: SALUD
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Sistema de salud pública universal, gratuito y de calidad para todos',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 2 
AND p.title = 'Sistema público universal';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Sistema mixto con mayor participación del sector privado y seguros de salud',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 2 
AND p.title = 'Sistema mixto con privados';

-- Answers for Question 3: TRABAJO
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Mantener y fortalecer las protecciones laborales actuales y el poder sindical',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 3 
AND p.title = 'Protección de derechos laborales';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Flexibilizar las leyes laborales para facilitar la contratación y generar más empleo',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 3 
AND p.title = 'Flexibilización laboral';

-- Answers for Question 4: JUSTICIA
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Debe ser la máxima prioridad con reformas profundas y juicios ejemplares',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 4 
AND p.title = 'Lucha prioritaria contra corrupción';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Importante pero debe implementarse gradualmente con consenso político',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 4 
AND p.title = 'Reformas graduales';

-- Answers for Question 5: NARCOTRÁFICO
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Mano dura: despliegue de fuerzas federales, penas más severas y tolerancia cero',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 5 
AND p.title = 'Mano dura contra el crimen';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Enfoque integral: prevención, tratamiento de adicciones y desarrollo social en zonas vulnerables',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 5 
AND p.title = 'Enfoque en prevención';

-- Answers for Question 6: EDAD DE IMPUTABILIDAD
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Bajar la edad de imputabilidad a 14 años o menos para delitos graves',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 6 
AND p.title = 'Bajar edad de imputabilidad';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Mantener en 16 años con enfoque en rehabilitación y reinserción juvenil',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 6 
AND p.title = 'Mantener edad actual';

-- Answers for Question 7: INSEGURIDAD
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Endurecer penas, aumentar presencia policial y facilitar el uso de la fuerza',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 7 
AND p.title = 'Mano dura contra el crimen';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Prevención mediante políticas sociales, educación y oportunidades laborales',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 7 
AND p.title = 'Enfoque en prevención';

-- Answers for Question 8: INFLACIÓN
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Reducción drástica del gasto público y déficit fiscal, independencia total del Banco Central',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 8 
AND p.title = 'Reducción del gasto público';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Control de precios, acuerdos salariales y coordinación entre gobierno y Banco Central',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 8 
AND p.title = 'Banco Central coordinado';

-- Answers for Question 9: POBREZA
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Reducir el Estado, bajar impuestos y generar condiciones para que el sector privado cree empleo',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 9 
AND p.title = 'Reducción del gasto público';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Aumentar programas sociales, salario universal y mayor inversión estatal en sectores vulnerables',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 9 
AND p.title = 'Aumento de inversión social';

-- Answers for Question 10: COMERCIO EXTERIOR
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Apertura comercial total, eliminar retenciones y firmar tratados de libre comercio',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 10 
AND p.title = 'Reducción del gasto público';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Proteger la industria nacional con aranceles y promover el mercado interno',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 10 
AND p.title = 'Aumento de inversión social';
