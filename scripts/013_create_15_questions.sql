-- Create 15 comprehensive quiz questions with educational content

-- Question 1: EDUCACIÓN
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cuál debería ser el rol del Estado en la educación?',
  1,
  3,
  'La educación es fundamental para el desarrollo económico y social. Los países con mejores sistemas educativos (Finlandia, Singapur, Corea del Sur) combinan inversión pública con rendición de cuentas y evaluación constante.'
FROM public.topics WHERE name = 'Educación';

-- Question 2: SALUD
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Qué modelo de salud debería tener Argentina?',
  2,
  3,
  'Los sistemas de salud más eficientes del mundo combinan elementos públicos y privados. Suiza, Países Bajos y Alemania tienen sistemas mixtos con excelentes resultados. El gasto en salud debe ser eficiente, no solo alto.'
FROM public.topics WHERE name = 'Salud';

-- Question 3: TRABAJO Y EMPLEO
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cuál es tu postura sobre las leyes laborales y la flexibilización del mercado de trabajo?',
  3,
  3,
  'La flexibilidad laboral bien implementada puede reducir el desempleo. Nueva Zelanda, Australia y Dinamarca tienen mercados laborales flexibles con bajas tasas de desempleo (4-5%) y altos salarios. Argentina tiene 40% de empleo informal, el más alto de la región.'
FROM public.topics WHERE name = 'Trabajo';

-- Question 4: SEGURIDAD - NARCOTRÁFICO
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cómo debería combatirse el narcotráfico?',
  4,
  2,
  'El Salvadorpasó de 103 homicidios por 100,000 habitantes (2015) a 2.4 (2023) con políticas de mano dura. Portugal despenalizó drogas en 2001 y redujo muertes por sobredosis en 80%. Ambos enfoques tienen resultados en contextos diferentes.'
FROM public.topics WHERE name = 'Seguridad';

-- Question 5: SEGURIDAD - IMPUTABILIDAD
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cuál debería ser la edad de imputabilidad penal?',
  5,
  2,
  'Alemania tiene imputabilidad a los 14 años con enfoque en rehabilitación y tiene baja reincidencia (30%). EE.UU. imputa desde los 12 en algunos estados pero tiene alta reincidencia (70%). La edad no es el único factor determinante.'
FROM public.topics WHERE name = 'Seguridad';

-- Question 6: ECONOMÍA - INFLACIÓN
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cuál es la mejor forma de combatir la inflación?',
  6,
  3,
  'La inflación es siempre un fenómeno monetario (Milton Friedman, Premio Nobel). Argentina tiene la inflación más alta del mundo (211% en 2023) por emisión monetaria para financiar déficit fiscal. Ningún país desarrollado tiene inflación alta sostenida.'
FROM public.topics WHERE name = 'Economía';

-- Question 7: ECONOMÍA - GASTO PÚBLICO
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cuál debería ser el tamaño del Estado?',
  7,
  3,
  'Irlanda redujo el gasto público del 48% al 25% del PIB (1980-2000) y pasó de ser uno de los países más pobres de Europa a uno de los más ricos (PIB per cápita: USD 99,000). Suecia tiene gasto del 49% del PIB pero con alta eficiencia y transparencia.'
FROM public.topics WHERE name = 'Economía';

-- Question 8: ECONOMÍA - COMERCIO EXTERIOR
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Qué política comercial debería adoptar Argentina?',
  8,
  2,
  'Chile abrió su economía en los 80 y es el país más rico de Sudamérica (PIB per cápita: USD 27,000 vs USD 13,000 de Argentina). Australia eliminó aranceles en los 90 y multiplicó su PIB por 4. El proteccionismo argentino no ha generado desarrollo industrial sostenible.'
FROM public.topics WHERE name = 'Economía';

-- Question 9: ECONOMÍA - IMPUESTOS
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cuál debería ser la política impositiva?',
  9,
  2,
  'Argentina tiene la presión fiscal más alta de América Latina (30% del PIB) pero servicios públicos deficientes. Singapur tiene impuestos bajos (14% del PIB) y excelentes servicios. La clave es eficiencia del gasto, no solo recaudación.'
FROM public.topics WHERE name = 'Economía';

-- Question 10: JUSTICIA - CORRUPCIÓN
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Qué prioridad debería tener la lucha contra la corrupción?',
  10,
  3,
  'La corrupción le cuesta a Argentina USD 60,000 millones anuales (5% del PIB). Singapur pasó de ser corrupto en los 60 a ser el país menos corrupto de Asia mediante reformas judiciales, transparencia y penas severas.'
FROM public.topics WHERE name = 'Justicia';

-- Question 11: DERECHOS SOCIALES
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cómo deberían gestionarse los programas sociales?',
  11,
  2,
  'Los programas sociales efectivos son temporales y condicionados. Chile redujo la pobreza del 45% (1990) al 8% (2020) con programas focalizados y auditorías estrictas. Argentina tiene 40% de la población con planes sociales pero la pobreza no baja.'
FROM public.topics WHERE name = 'Derechos Sociales';

-- Question 12: MEDIO AMBIENTE
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cómo debería abordarse la política ambiental?',
  12,
  1,
  'Noruega genera 98% de su electricidad con renovables mediante inversión privada incentivada. Alemania subsidió renovables masivamente y tiene la electricidad más cara de Europa. La clave es equilibrio entre ambiente y economía.'
FROM public.topics WHERE name = 'Medio Ambiente';

-- Question 13: ENERGÍA
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Qué política energética debería adoptar Argentina?',
  13,
  2,
  'Argentina tiene Vaca Muerta, la segunda reserva de gas no convencional del mundo, pero importa energía. Texas (EE.UU.) desarrolló shale gas con inversión privada y genera USD 200,000 millones anuales. La clave es marco regulatorio estable.'
FROM public.topics WHERE name = 'Economía';

-- Question 14: RELACIONES INTERNACIONALES
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Qué política exterior debería tener Argentina?',
  14,
  1,
  'Los países más prósperos tienen relaciones comerciales diversificadas. Corea del Sur comercia con 200 países y es potencia tecnológica. Venezuela se aisló y colapsó. El pragmatismo comercial genera desarrollo.'
FROM public.topics WHERE name = 'Política Exterior';

-- Question 15: BANCO CENTRAL Y MONEDA
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cuál debería ser el rol del Banco Central?',
  15,
  3,
  'Los bancos centrales independientes generan estabilidad. El BCE (Europa), la Fed (EE.UU.) y el Banco de Inglaterra son independientes y sus países tienen inflación baja (2-3%). Argentina tiene el Banco Central menos independiente del mundo y la inflación más alta.'
FROM public.topics WHERE name = 'Economía';
