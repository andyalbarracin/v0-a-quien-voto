-- Insert positions for each topic
-- ECONOMÍA
INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Reducción del gasto público', 'Apoya la reducción significativa del gasto del Estado y privatización de empresas públicas', 3
FROM public.topics WHERE name = 'Economía';

INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Aumento de inversión social', 'Apoya el aumento del gasto en programas sociales y subsidios', 3
FROM public.topics WHERE name = 'Economía';

INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Libre mercado', 'Apoya la desregulación económica y libre comercio', 2
FROM public.topics WHERE name = 'Economía';

INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Intervención estatal', 'Apoya la regulación estatal de la economía y control de precios', 2
FROM public.topics WHERE name = 'Economía';

-- Added position for Central Bank coordination
INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Banco Central coordinado', 'Apoya la coordinación entre gobierno y Banco Central para controlar inflación', 2
FROM public.topics WHERE name = 'Economía';

-- SEGURIDAD
INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Mano dura contra el crimen', 'Apoya penas más severas, prisión efectiva y mayor presencia policial', 3
FROM public.topics WHERE name = 'Seguridad';

INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Enfoque en prevención', 'Prioriza programas de prevención y reinserción social', 2
FROM public.topics WHERE name = 'Seguridad';

INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Bajar edad de imputabilidad', 'Apoya bajar la edad de imputabilidad penal', 2
FROM public.topics WHERE name = 'Seguridad';

-- Updated title to match quiz answers
INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Mantener edad actual', 'Mantener la edad de imputabilidad actual con enfoque en rehabilitación', 2
FROM public.topics WHERE name = 'Seguridad';

-- SALUD
INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Sistema público universal', 'Apoya el aumento de presupuesto y mejora del sistema público de salud', 3
FROM public.topics WHERE name = 'Salud';

-- Updated title to match quiz answers
INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Sistema mixto con privados', 'Apoya la participación del sector privado y seguros de salud', 2
FROM public.topics WHERE name = 'Salud';

INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Aborto legal', 'Apoya el derecho al aborto legal, seguro y gratuito', 3
FROM public.topics WHERE name = 'Salud';

-- EDUCACIÓN
-- Updated title to match quiz answers
INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Educación pública de calidad', 'Apoya el aumento del presupuesto para educación pública', 3
FROM public.topics WHERE name = 'Educación';

INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Libertad de elección educativa', 'Apoya el sistema de vouchers educativos y mayor rol del sector privado', 2
FROM public.topics WHERE name = 'Educación';

INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Universidad pública gratuita', 'Apoya mantener la gratuidad de la universidad pública', 3
FROM public.topics WHERE name = 'Educación';

-- JUSTICIA
-- Updated title to match quiz answers
INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Lucha prioritaria contra corrupción', 'Prioriza medidas anticorrupción y transparencia como máxima prioridad', 3
FROM public.topics WHERE name = 'Justicia';

INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Reformas graduales', 'Apoya reformas del sistema judicial de manera gradual con consenso', 2
FROM public.topics WHERE name = 'Justicia';

-- TRABAJO
INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Flexibilización laboral', 'Apoya la reforma laboral para facilitar contratación y despido', 2
FROM public.topics WHERE name = 'Trabajo';

INSERT INTO public.positions (topic_id, title, description, weight) 
SELECT id, 'Protección de derechos laborales', 'Apoya el fortalecimiento de derechos laborales y sindicatos', 3
FROM public.topics WHERE name = 'Trabajo';
