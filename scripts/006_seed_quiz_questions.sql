-- Delete existing questions to start fresh
DELETE FROM public.quiz_answers;
DELETE FROM public.quiz_questions;

-- Question 1: EDUCACIÓN (Generic - Low weight)
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id, 
  '¿Cuál debería ser la prioridad en el sistema educativo argentino?',
  1,
  2,
  'La educación es la base del desarrollo de una nación. Un sistema educativo de calidad forma ciudadanos críticos, profesionales capacitados y promueve la movilidad social. La inversión en educación genera retornos económicos a largo plazo, reduce la desigualdad y fortalece la democracia al crear una ciudadanía informada y participativa.'
FROM public.topics WHERE name = 'Educación';

-- Question 2: SALUD (Generic - Low weight)
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Qué modelo de sistema de salud consideras más adecuado para Argentina?',
  2,
  2,
  'Un sistema de salud eficiente es fundamental para el bienestar de la población. La pandemia de COVID-19 demostró la importancia de contar con infraestructura sanitaria robusta, personal capacitado y acceso equitativo a servicios médicos. La salud pública no solo salva vidas, sino que también reduce costos a largo plazo al prevenir enfermedades y mejorar la productividad laboral.'
FROM public.topics WHERE name = 'Salud';

-- Question 3: TRABAJO (Medium weight)
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cuál es tu postura sobre las leyes laborales y la flexibilización del mercado de trabajo?',
  3,
  3,
  'Las leyes laborales buscan equilibrar la protección de los trabajadores con la competitividad empresarial. Un mercado laboral dinámico puede generar más empleo, pero debe garantizar derechos básicos. La informalidad laboral en Argentina supera el 40%, lo que implica millones de trabajadores sin protección social, jubilación ni obra social, perpetuando la pobreza y la desigualdad.'
FROM public.topics WHERE name = 'Trabajo';

-- Question 4: JUSTICIA Y CORRUPCIÓN (Medium-High weight)
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Qué tan prioritaria debería ser la lucha contra la corrupción en Argentina?',
  4,
  4,
  'La corrupción desvía recursos públicos que deberían destinarse a educación, salud e infraestructura. Según Transparencia Internacional, la corrupción en Argentina cuesta miles de millones de dólares anuales. Además, erosiona la confianza en las instituciones democráticas, desalienta la inversión extranjera y perpetúa la desigualdad al beneficiar a élites políticas y empresariales en detrimento del bien común.'
FROM public.topics WHERE name = 'Justicia';

-- Question 5: NARCOTRÁFICO (High weight)
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cómo debería Argentina abordar el problema del narcotráfico?',
  5,
  4,
  'El narcotráfico afecta a la sociedad al generar corrupción en instituciones, aumentar la violencia y la inseguridad, y promover la drogadicción y el lavado de activos. Además, puede desestabilizar estados, controlar medios de comunicación y perpetuar el terrorismo, afectando gravemente la salud pública y el desarrollo socioeconómico. El narcotráfico ha convertido barrios enteros en zonas de guerra, destruyendo el tejido social.'
FROM public.topics WHERE name = 'Seguridad';

-- Question 6: EDAD DE IMPUTABILIDAD (High weight - Controversial)
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cuál debería ser la edad de imputabilidad penal en Argentina?',
  6,
  4,
  'La edad de imputabilidad es un tema complejo que equilibra la protección de menores con la seguridad pública. En Argentina, menores son utilizados por organizaciones criminales para cometer delitos graves sabiendo que no serán penalizados. Sin embargo, la evidencia internacional muestra que el sistema de justicia juvenil debe enfocarse en rehabilitación más que en castigo, ya que los cerebros adolescentes aún están en desarrollo.'
FROM public.topics WHERE name = 'Seguridad';

-- Question 7: INSEGURIDAD Y DELINCUENCIA (Very High weight - Controversial)
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cómo se debería combatir la inseguridad y la delincuencia en Argentina?',
  7,
  5,
  'Combatir la delincuencia es vital para la seguridad, el bienestar y el desarrollo socioeconómico de una sociedad, ya que la violencia y la criminalidad afectan la salud física y mental, destruyen la infraestructura social, obstaculizan el crecimiento económico, violan derechos humanos y minan la confianza en el Estado. Argentina ha visto un aumento sostenido en delitos violentos, robos y homicidios en las últimas décadas, convirtiendo la inseguridad en la principal preocupación ciudadana.'
FROM public.topics WHERE name = 'Seguridad';

-- Question 8: INFLACIÓN Y POLÍTICA MONETARIA (Very High weight - Controversial)
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Qué medidas son prioritarias para controlar la inflación en Argentina?',
  8,
  5,
  'Es importante bajar la inflación porque protege el poder adquisitivo, fomenta el uso eficiente de los recursos y promueve la estabilidad económica y social. La inflación alta erosiona los ingresos, devalúa los ahorros y genera incertidumbre, lo que dificulta la planificación y el crecimiento económico. Argentina ha sufrido inflación crónica por décadas, llegando a niveles de tres dígitos, destruyendo el ahorro de millones de familias y empujando a la mitad de la población a la pobreza.'
FROM public.topics WHERE name = 'Economía';

-- Question 9: POBREZA Y GASTO PÚBLICO (Very High weight - Controversial)
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Cuál es la mejor estrategia para reducir la pobreza en Argentina?',
  9,
  5,
  'La pobreza en Argentina alcanzó el 52% en 2024, afectando a más de 24 millones de personas. La reducción sostenible de la pobreza requiere crecimiento económico genuino, no solo asistencialismo. La experiencia internacional muestra que países que redujeron la pobreza lo hicieron mediante reformas estructurales que generaron empleo privado de calidad, estabilidad macroeconómica y mejora en la productividad. El gasto público mal focalizado puede perpetuar la dependencia sin resolver las causas estructurales.'
FROM public.topics WHERE name = 'Economía';

-- Question 10: COMERCIO EXTERIOR (Very High weight)
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight, educational_content)
SELECT 
  id,
  '¿Qué política comercial debería adoptar Argentina?',
  10,
  5,
  'La apertura comercial puede aumentar la competitividad y reducir precios para consumidores, pero también puede afectar industrias locales. Argentina tiene una de las economías más cerradas del mundo, con altas barreras arancelarias. La experiencia internacional muestra que países que se abrieron al comercio (Chile, Vietnam, Polonia) experimentaron crecimiento acelerado, mientras que el proteccionismo prolongado puede generar ineficiencias y productos más caros para la población.'
FROM public.topics WHERE name = 'Economía';
