-- Delete existing answers to recreate with 4 options
DELETE FROM public.quiz_answers;

-- Update positions table to add context and repercussions
ALTER TABLE public.positions 
ADD COLUMN IF NOT EXISTS context TEXT,
ADD COLUMN IF NOT EXISTS repercussions TEXT,
ADD COLUMN IF NOT EXISTS source_url TEXT;

-- Question 1: EDUCACIÓN (4 options)
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Fortalecer la educación pública con más presupuesto',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 1 
  AND p.title = 'Fortalecer educación pública';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Implementar vouchers educativos para libre elección',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 1 
  AND p.title = 'Vouchers educativos';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Sistema mixto: pública y privada con subsidios',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 1 
  AND p.title = 'Sistema educativo mixto';

-- Add new position for 4th option
INSERT INTO public.positions (topic_id, title, description, weight, context, repercussions, source_url)
SELECT 
  id,
  'Auditoría y eficiencia del gasto educativo',
  'Priorizar la auditoría exhaustiva del presupuesto educativo actual antes de aumentarlo, identificando ineficiencias y corrupción',
  3,
  'Argentina invierte aproximadamente 6% del PBI en educación, similar a países desarrollados, pero con resultados muy inferiores en pruebas PISA. El presupuesto educativo creció significativamente en las últimas décadas sin mejoras proporcionales en calidad. La falta de auditorías detalladas impide identificar dónde se pierden los recursos.',
  'Una auditoría exhaustiva permitiría: 1) Identificar desvíos de fondos y corrupción en la cadena de distribución, 2) Detectar gastos administrativos excesivos vs. inversión en aulas, 3) Optimizar la asignación de recursos hacia áreas críticas (infraestructura, capacitación docente, tecnología), 4) Mejorar resultados educativos sin necesariamente aumentar el gasto total. Países como Estonia y Polonia mejoraron drásticamente su educación mediante reformas de eficiencia antes que aumentos presupuestarios.',
  'https://es.wikipedia.org/wiki/Educaci%C3%B3n_en_Argentina'
FROM public.topics 
WHERE name = 'Educación';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Auditar el gasto actual antes de aumentar presupuesto',
  4
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 1 
  AND p.title = 'Auditoría y eficiencia del gasto educativo';

-- Update existing education positions with context
UPDATE public.positions 
SET 
  context = 'El presupuesto educativo argentino representa aproximadamente 6% del PBI, uno de los más altos de la región. Sin embargo, los resultados en pruebas internacionales (PISA) muestran un rendimiento muy por debajo de países con inversiones similares.',
  repercussions = 'Aumentar el presupuesto sin reformas estructurales puede: 1) Perpetuar ineficiencias existentes, 2) Aumentar el déficit fiscal sin mejoras en calidad, 3) Beneficiar principalmente a estructuras burocráticas en lugar de llegar al aula. Sin auditorías, es imposible saber si los recursos llegan efectivamente a estudiantes y docentes.',
  source_url = 'https://es.wikipedia.org/wiki/Educaci%C3%B3n_en_Argentina'
WHERE title = 'Fortalecer educación pública';

UPDATE public.positions 
SET 
  context = 'Los vouchers educativos permiten a las familias elegir la escuela para sus hijos, con el Estado financiando directamente a los estudiantes en lugar de a las instituciones. Países como Suecia, Chile, Países Bajos y partes de EE.UU. han implementado sistemas de vouchers con resultados mixtos.',
  repercussions = 'Ventajas: 1) Empodera a las familias para elegir la mejor educación para sus hijos, 2) Crea competencia entre escuelas, incentivando mejoras en calidad, 3) Reduce burocracia al financiar directamente a estudiantes, 4) Dificulta la corrupción al eliminar intermediarios institucionales. Desafíos: Requiere regulación para evitar segregación y garantizar estándares mínimos de calidad. Chile y Suecia muestran mejoras en acceso y satisfacción familiar.',
  source_url = 'https://es.wikipedia.org/wiki/Cheque_escolar'
WHERE title = 'Vouchers educativos';

-- Question 2: SALUD (4 options)
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Sistema público universal y gratuito',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 2 
  AND p.title = 'Sistema de salud público universal';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Sistema mixto con sector privado regulado',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 2 
  AND p.title = 'Sistema de salud mixto';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Privatización con seguros obligatorios',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 2 
  AND p.title = 'Sistema de salud privado con seguros';

-- Add 4th option for health
INSERT INTO public.positions (topic_id, title, description, weight, context, repercussions, source_url)
SELECT 
  id,
  'Desregular para aumentar competencia y oferta',
  'Flexibilizar la entrada de nuevos prestadores de salud privados manteniendo el sistema público, aumentando la oferta y reduciendo costos por competencia',
  3,
  'Argentina tiene un sistema de salud fragmentado con tres subsistemas: público, obras sociales y privado. La regulación excesiva limita la entrada de nuevos prestadores, reduciendo la competencia y manteniendo precios altos. La oferta de servicios de salud no satisface la demanda, generando largas esperas.',
  'Desregular la entrada de prestadores privados permitiría: 1) Mayor competencia reduce precios y mejora calidad de servicio, 2) Más opciones para pacientes que pueden pagar servicios privados, 3) Descongestiona el sistema público al derivar demanda al sector privado, 4) Atrae inversión en infraestructura sanitaria. Países como Suiza y Países Bajos combinan sistemas públicos con mercados privados altamente competitivos, logrando alta calidad y acceso universal.',
  source_url = 'https://es.wikipedia.org/wiki/Sistema_de_salud'
FROM public.topics 
WHERE name = 'Salud';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Desregular para aumentar competencia y oferta',
  4
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 2 
  AND p.title = 'Desregular para aumentar competencia y oferta';

-- Update existing health positions
UPDATE public.positions 
SET 
  context = 'El sistema de salud mixto combina un sector público gratuito con opciones privadas reguladas. Este modelo busca garantizar acceso universal mientras permite opciones adicionales para quienes pueden pagarlas.',
  repercussions = 'Un sistema mixto bien implementado puede: 1) Garantizar atención básica gratuita para todos, 2) Ofrecer opciones de mayor calidad para quienes pueden pagar, 3) Generar recursos adicionales que pueden reinvertirse en el sistema público. Sin embargo, requiere regulación cuidadosa para evitar que el sector privado drene recursos humanos del público. Países como Francia, Alemania y España tienen sistemas mixtos exitosos.',
  source_url = 'https://es.wikipedia.org/wiki/Sistema_de_salud'
WHERE title = 'Sistema de salud mixto';

-- Question 3: TRABAJO (4 options)
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Mantener protecciones laborales actuales',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 3 
  AND p.title = 'Mantener protecciones laborales';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Flexibilizar para facilitar contratación',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 3 
  AND p.title = 'Flexibilización laboral moderada';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Reforma profunda hacia mercado libre',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 3 
  AND p.title = 'Liberalización del mercado laboral';

-- Add 4th option for labor
INSERT INTO public.positions (topic_id, title, description, weight, context, repercussions, source_url)
SELECT 
  id,
  'Reducir poder sindical y eliminar privilegios',
  'Reformar el sistema sindical eliminando monopolios gremiales, cuotas obligatorias y privilegios que encarecen el empleo formal',
  4,
  'Argentina tiene uno de los sistemas sindicales más poderosos del mundo, con monopolio de representación por rama y cuotas obligatorias. Los sindicatos controlan obras sociales y tienen privilegios legales que encarecen significativamente el costo laboral. La informalidad laboral supera el 40%, en parte debido a los altos costos de formalización.',
  'Reducir el poder sindical podría: 1) Disminuir costos laborales, incentivando la formalización, 2) Aumentar la competitividad empresarial, 3) Reducir la corrupción en obras sociales sindicales, 4) Permitir negociaciones más flexibles entre empleadores y empleados. Nueva Zelanda y Reino Unido reformaron sus sistemas sindicales en los 80-90, reduciendo desempleo y aumentando formalización. Sin embargo, requiere protecciones alternativas para trabajadores vulnerables.',
  source_url = 'https://es.wikipedia.org/wiki/Derecho_laboral'
FROM public.topics 
WHERE name = 'Trabajo';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Reducir poder sindical y eliminar privilegios',
  4
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 3 
  AND p.title = 'Reducir poder sindical y eliminar privilegios';

-- Update labor positions with context
UPDATE public.positions 
SET 
  context = 'La flexibilización laboral busca reducir costos y trámites para contratar empleados, facilitando la creación de empleo formal. Países de la región como Chile, Perú y Colombia tienen mercados laborales más flexibles que Argentina.',
  repercussions = 'Flexibilizar el mercado laboral puede: 1) Reducir la informalidad al disminuir costos de contratación (actualmente ~40% de trabajadores informales en Argentina), 2) Aumentar la creación de empleo, especialmente para jóvenes y grupos vulnerables, 3) Mejorar la competitividad empresarial, 4) Aumentar la recaudación fiscal al formalizar empleo. Chile redujo su desempleo del 20% al 7% tras reformas laborales en los 80. Sin embargo, debe balancearse con protecciones básicas para evitar precarización excesiva.',
  source_url = 'https://es.wikipedia.org/wiki/Flexibilidad_laboral'
WHERE title = 'Flexibilización laboral moderada';

-- Continue with remaining questions (4-10) with 4 options each...
-- Question 4: JUSTICIA (4 options)
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Máxima prioridad con reformas profundas',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 4 
  AND p.title = 'Lucha anticorrupción prioritaria';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Importante pero sin reformas drásticas',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 4 
  AND p.title = 'Reformas judiciales moderadas';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Priorizar otras áreas primero',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 4 
  AND p.title = 'Justicia no prioritaria';

-- Add 4th option
INSERT INTO public.positions (topic_id, title, description, weight, context, repercussions, source_url)
SELECT 
  id,
  'Juicio por jurados y transparencia total',
  'Implementar juicio por jurados populares y publicación obligatoria de todas las sentencias y patrimonios de funcionarios',
  4,
  'Argentina tiene uno de los sistemas judiciales con menor confianza ciudadana de la región. La corrupción judicial permite la impunidad de políticos y empresarios. Solo 8 provincias tienen juicio por jurados, limitando la participación ciudadana en la justicia.',
  'Implementar juicio por jurados y transparencia total: 1) Aumenta la legitimidad del sistema judicial al involucrar ciudadanos, 2) Reduce la corrupción al exponer decisiones judiciales al escrutinio público, 3) Dificulta la manipulación política de sentencias, 4) Permite detectar enriquecimiento ilícito de funcionarios. EE.UU., Reino Unido y España usan jurados con éxito. La transparencia patrimonial ha sido clave en países como Estonia y Georgia para combatir la corrupción.',
  source_url = 'https://es.wikipedia.org/wiki/Corrupci%C3%B3n_pol%C3%ADtica'
FROM public.topics 
WHERE name = 'Justicia';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Juicio por jurados y transparencia total',
  4
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 4 
  AND p.title = 'Juicio por jurados y transparencia total';

-- Update corruption position
UPDATE public.positions 
SET 
  context = 'La corrupción en Argentina cuesta miles de millones de dólares anuales según Transparencia Internacional. Casos como los "cuadernos de la corrupción" revelaron esquemas sistemáticos de sobornos. La impunidad es alta: pocos casos terminan en condenas firmes.',
  repercussions = 'Combatir la corrupción efectivamente: 1) Libera recursos para educación, salud e infraestructura, 2) Atrae inversión extranjera al mejorar el clima de negocios, 3) Restaura la confianza en instituciones democráticas, 4) Reduce la desigualdad al evitar que élites se enriquezcan ilegalmente. Países como Georgia y Ruanda redujeron drásticamente la corrupción con reformas profundas, logrando crecimiento económico acelerado.',
  source_url = 'https://es.wikipedia.org/wiki/Corrupci%C3%B3n_pol%C3%ADtica'
WHERE title = 'Lucha anticorrupción prioritaria';

-- Question 5: NARCOTRÁFICO (4 options)
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Mano dura: militarización y penas severas',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 5 
  AND p.title = 'Mano dura contra narcotráfico';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Enfoque mixto: represión y prevención',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 5 
  AND p.title = 'Enfoque integral narcotráfico';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Despenalización y tratamiento de adicciones',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 5 
  AND p.title = 'Despenalización drogas';

-- Add 4th option
INSERT INTO public.positions (topic_id, title, description, weight, context, repercussions, source_url)
SELECT 
  id,
  'Extradición y cooperación internacional',
  'Facilitar extradición de narcotraficantes y cooperación con agencias internacionales como DEA y FBI',
  4,
  'El narcotráfico es un problema transnacional que requiere cooperación internacional. Argentina se ha convertido en un hub de tráfico hacia Europa. Organizaciones criminales mexicanas y colombianas operan en el país. La falta de tratados de extradición limita la persecución de grandes capos.',
  'Facilitar extradición y cooperación internacional: 1) Permite juzgar a narcotraficantes en países con sistemas judiciales más efectivos, 2) Accede a inteligencia y recursos de agencias internacionales, 3) Desmantela redes transnacionales que operan desde múltiples países, 4) Genera presión sobre líderes criminales que actualmente operan con impunidad. Colombia y México han usado extradición exitosamente contra carteles. Sin embargo, requiere protección de soberanía nacional.',
  source_url = 'https://es.wikipedia.org/wiki/Narcotr%C3%A1fico'
FROM public.topics 
WHERE name = 'Seguridad';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Extradición y cooperación internacional',
  4
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 5 
  AND p.title = 'Extradición y cooperación internacional';

-- Question 6: EDAD DE IMPUTABILIDAD (4 options)
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Bajar a 14 años',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 6 
  AND p.title = 'Bajar edad de imputabilidad a 14';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Mantener en 16 años (actual)',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 6 
  AND p.title = 'Mantener edad actual';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Subir a 18 años',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 6 
  AND p.title = 'Subir edad de imputabilidad';

-- Add 4th option
INSERT INTO public.positions (topic_id, title, description, weight, context, repercussions, source_url)
SELECT 
  id,
  'Sistema diferenciado con rehabilitación',
  'Mantener edad actual pero crear sistema de justicia juvenil especializado enfocado en rehabilitación, no castigo',
  3,
  'La edad de imputabilidad en Argentina es 16 años, pero el sistema de justicia juvenil es deficiente. Menores son utilizados por organizaciones criminales para cometer delitos graves. Sin embargo, la evidencia científica muestra que los cerebros adolescentes aún están en desarrollo, afectando el juicio y control de impulsos.',
  'Un sistema diferenciado de justicia juvenil: 1) Responsabiliza a menores por delitos graves sin tratarlos como adultos, 2) Enfoca en rehabilitación y reinserción social, 3) Protege a la sociedad mientras da oportunidades de cambio, 4) Reduce reincidencia a largo plazo. Países como Alemania, Noruega y Nueva Zelanda tienen sistemas juveniles exitosos con tasas de reincidencia muy bajas (20-30% vs. 70-80% en sistemas punitivos).',
  source_url = 'https://es.wikipedia.org/wiki/Edad_de_imputabilidad'
FROM public.topics 
WHERE name = 'Seguridad';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Sistema diferenciado con rehabilitación',
  4
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 6 
  AND p.title = 'Sistema diferenciado con rehabilitación';

-- Question 7: INSEGURIDAD (4 options)
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Más policías y penas más duras',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 7 
  AND p.title = 'Mano dura contra delincuencia';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Prevención social y oportunidades',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 7 
  AND p.title = 'Prevención social del delito';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Enfoque mixto: represión y prevención',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 7 
  AND p.title = 'Enfoque integral seguridad';

-- Add 4th option
INSERT INTO public.positions (topic_id, title, description, weight, context, repercussions, source_url)
SELECT 
  id,
  'Tolerancia cero y reforma judicial',
  'Aplicar tolerancia cero a delitos menores y reformar el sistema judicial para garantizar condenas rápidas y efectivas',
  5,
  'Argentina tiene altas tasas de delitos violentos y una sensación de impunidad generalizada. El sistema judicial es lento: casos tardan años en resolverse. La "puerta giratoria" permite que delincuentes reincidan múltiples veces antes de recibir condenas firmes. Nueva York redujo drásticamente el crimen en los 90 con "tolerancia cero".',
  'Tolerancia cero y reforma judicial: 1) Reduce delitos menores que deterioran la calidad de vida urbana, 2) Envía señal clara de que el delito tiene consecuencias, 3) Acelera condenas, aumentando el costo del crimen para delincuentes, 4) Libera recursos policiales al procesar casos más rápido. Nueva York redujo homicidios 80% con esta estrategia. Sin embargo, requiere cuidado para evitar criminalización excesiva de poblaciones vulnerables.',
  source_url = 'https://es.wikipedia.org/wiki/Tolerancia_cero'
FROM public.topics 
WHERE name = 'Seguridad';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Tolerancia cero y reforma judicial',
  4
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 7 
  AND p.title = 'Tolerancia cero y reforma judicial';

-- Question 8: INFLACIÓN (4 options)
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Banco Central independiente',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 8 
  AND p.title = 'Banco Central independiente';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Dolarización de la economía',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 8 
  AND p.title = 'Dolarización';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Controles de precios y salarios',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 8 
  AND p.title = 'Controles de precios';

-- Add 4th option
INSERT INTO public.positions (topic_id, title, description, weight, context, repercussions, source_url)
SELECT 
  id,
  'Ajuste fiscal y eliminación del déficit',
  'Priorizar el equilibrio fiscal eliminando el déficit presupuestario, principal causa de emisión monetaria e inflación',
  5,
  'Argentina tiene inflación crónica desde hace décadas, alcanzando niveles de tres dígitos. La causa principal es el déficit fiscal: el Estado gasta más de lo que recauda y financia la diferencia emitiendo dinero. El déficit fiscal argentino ha promediado 4-6% del PBI en las últimas décadas.',
  'Eliminar el déficit fiscal: 1) Detiene la emisión monetaria, causa directa de inflación, 2) Restaura la confianza en la moneda nacional, 3) Permite bajar tasas de interés, facilitando inversión y crecimiento, 4) Protege el poder adquisitivo de salarios y ahorros. Países como Israel (1985), Polonia (1990) y Brasil (1994) eliminaron inflaciones de tres dígitos mediante ajustes fiscales. Requiere reducción de gasto público y/o aumento de recaudación.',
  source_url = 'https://es.wikipedia.org/wiki/Inflaci%C3%B3n'
FROM public.topics 
WHERE name = 'Economía';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Ajuste fiscal y eliminación del déficit',
  4
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 8 
  AND p.title = 'Ajuste fiscal y eliminación del déficit';

-- Update inflation positions
UPDATE public.positions 
SET 
  context = 'Un Banco Central independiente del poder político puede enfocarse en controlar la inflación sin presiones para financiar gasto público. Países con bancos centrales independientes tienen inflaciones significativamente menores.',
  repercussions = 'Independencia del Banco Central: 1) Elimina la tentación política de emitir dinero para financiar gasto, 2) Genera credibilidad en la política monetaria, 3) Permite enfocar en estabilidad de precios a largo plazo, 4) Reduce expectativas inflacionarias. Chile, México y Brasil lograron controlar inflación tras dar independencia a sus bancos centrales en los 90. Sin embargo, requiere complementarse con disciplina fiscal.',
  source_url = 'https://es.wikipedia.org/wiki/Banco_central'
WHERE title = 'Banco Central independiente';

UPDATE public.positions 
SET 
  context = 'La dolarización implica adoptar el dólar estadounidense como moneda oficial, eliminando la capacidad de emitir moneda propia. Ecuador (2000), El Salvador (2001) y Panamá usan el dólar.',
  repercussions = 'Dolarización: 1) Elimina completamente la inflación monetaria al no poder emitir, 2) Reduce tasas de interés al eliminar riesgo cambiario, 3) Facilita comercio e inversión internacional, 4) Protege ahorros de devaluaciones. Ecuador redujo inflación de 96% a 3% tras dolarizar. Desventajas: Pierde política monetaria para responder a crisis, requiere disciplina fiscal estricta, y puede generar desempleo inicial durante la transición.',
  source_url = 'https://es.wikipedia.org/wiki/Dolarizaci%C3%B3n'
WHERE title = 'Dolarización';

-- Question 9: POBREZA (4 options)
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Aumentar planes sociales y asistencia',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 9 
  AND p.title = 'Aumentar gasto social';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Generar empleo privado y crecimiento',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 9 
  AND p.title = 'Crecimiento económico';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Reformas estructurales y educación',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 9 
  AND p.title = 'Reformas estructurales';

-- Add 4th option
INSERT INTO public.positions (topic_id, title, description, weight, context, repercussions, source_url)
SELECT 
  id,
  'Transformar planes en capacitación laboral',
  'Convertir planes sociales en programas de capacitación y reinserción laboral, condicionando ayuda a formación y búsqueda activa de empleo',
  5,
  'Argentina tiene más de 40% de su población en pobreza y millones de personas recibiendo planes sociales. Sin embargo, estos planes no han reducido la pobreza estructuralmente. La dependencia de asistencia estatal se ha perpetuado por décadas sin generar movilidad social ascendente.',
  'Transformar planes en capacitación: 1) Rompe el ciclo de dependencia al dar herramientas para conseguir empleo, 2) Aumenta la empleabilidad de beneficiarios, 3) Reduce el gasto público a largo plazo al sacar personas de la asistencia, 4) Dignifica al reemplazar asistencialismo por oportunidades. Países como Dinamarca y Suecia condicionan ayuda social a capacitación y búsqueda activa de empleo, logrando bajas tasas de pobreza y alta movilidad social.',
  source_url = 'https://es.wikipedia.org/wiki/Pobreza'
FROM public.topics 
WHERE name = 'Economía';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Transformar planes en capacitación laboral',
  4
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 9 
  AND p.title = 'Transformar planes en capacitación laboral';

-- Update poverty positions
UPDATE public.positions 
SET 
  context = 'La pobreza en Argentina alcanzó 52% en 2024, afectando a más de 24 millones de personas. El gasto social representa aproximadamente 15% del PBI, uno de los más altos de la región, pero la pobreza no ha disminuido proporcionalmente.',
  repercussions = 'Aumentar gasto social sin reformas estructurales: 1) Puede aliviar síntomas inmediatos de pobreza, 2) Aumenta el déficit fiscal, generando más inflación que empobrece, 3) Perpetúa dependencia sin resolver causas estructurales, 4) No genera movilidad social ascendente. La experiencia argentina muestra que décadas de alto gasto social no redujeron la pobreza estructural. Países que redujeron pobreza sostenidamente lo hicieron mediante crecimiento económico, no solo asistencia.',
  source_url = 'https://es.wikipedia.org/wiki/Pobreza'
WHERE title = 'Aumentar gasto social';

UPDATE public.positions 
SET 
  context = 'El crecimiento económico sostenido es el único mecanismo probado para reducir la pobreza a largo plazo. China sacó 800 millones de personas de la pobreza mediante crecimiento económico. Chile redujo pobreza de 45% a 8% entre 1990-2015 con crecimiento promedio de 5% anual.',
  repercussions = 'Generar empleo privado y crecimiento: 1) Crea oportunidades genuinas de movilidad social, 2) Aumenta ingresos de manera sostenible, 3) Incrementa recaudación fiscal sin aumentar impuestos, 4) Reduce dependencia de asistencia estatal. Requiere: estabilidad macroeconómica, seguridad jurídica, infraestructura, educación de calidad y mercados laborales flexibles. Todos los países que redujeron pobreza sostenidamente lo hicieron mediante crecimiento económico.',
  source_url = 'https://es.wikipedia.org/wiki/Crecimiento_econ%C3%B3mico'
WHERE title = 'Crecimiento económico';

-- Question 10: COMERCIO EXTERIOR (4 options)
INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Apertura comercial y libre comercio',
  1
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 10 
  AND p.title = 'Apertura comercial';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Proteccionismo para industria nacional',
  2
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 10 
  AND p.title = 'Proteccionismo industrial';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Apertura gradual y selectiva',
  3
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 10 
  AND p.title = 'Apertura gradual';

-- Add 4th option
INSERT INTO public.positions (topic_id, title, description, weight, context, repercussions, source_url)
SELECT 
  id,
  'Tratados de libre comercio estratégicos',
  'Firmar tratados de libre comercio con bloques económicos importantes (UE, EE.UU., Asia-Pacífico) para acceder a mercados grandes',
  5,
  'Argentina tiene una de las economías más cerradas del mundo, con altas barreras arancelarias y pocos tratados de libre comercio. El Mercosur limita la capacidad de firmar acuerdos bilaterales. Chile tiene tratados con 65 países representando 86% del PBI mundial; Argentina tiene acceso a menos del 25%.',
  'Tratados de libre comercio: 1) Acceso preferencial a mercados de miles de millones de consumidores, 2) Atrae inversión extranjera al garantizar reglas claras, 3) Fuerza modernización de industrias locales por competencia, 4) Reduce precios para consumidores. Chile creció 5% anual promedio tras firmar TLCs en los 90-2000. Vietnam pasó de país pobre a ingreso medio en 20 años tras abrirse al comercio. Requiere período de transición para industrias sensibles.',
  source_url = 'https://es.wikipedia.org/wiki/Tratado_de_libre_comercio'
FROM public.topics 
WHERE name = 'Economía';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order)
SELECT 
  q.id,
  p.id,
  'Tratados de libre comercio estratégicos',
  4
FROM public.quiz_questions q
CROSS JOIN public.positions p
WHERE q.question_order = 10 
  AND p.title = 'Tratados de libre comercio estratégicos';

-- Update trade positions
UPDATE public.positions 
SET 
  context = 'La apertura comercial implica reducir aranceles y barreras al comercio internacional. Argentina tiene aranceles promedio de 13%, mientras países desarrollados tienen 3-5%. El proteccionismo argentino data de décadas.',
  repercussions = 'Apertura comercial: 1) Reduce precios para consumidores al permitir importaciones más baratas, 2) Aumenta competitividad al forzar a empresas locales a mejorar, 3) Facilita exportaciones al negociar acceso recíproco a mercados externos, 4) Atrae inversión extranjera. Chile, Vietnam y Polonia crecieron aceleradamente tras abrirse al comercio. Desventaja: Puede afectar industrias ineficientes a corto plazo, requiriendo políticas de transición para trabajadores afectados.',
  source_url = 'https://es.wikipedia.org/wiki/Libre_comercio'
WHERE title = 'Apertura comercial';

UPDATE public.positions 
SET 
  context = 'El proteccionismo busca proteger industrias locales mediante aranceles y barreras a importaciones. Argentina ha mantenido políticas proteccionistas por décadas, especialmente desde los años 40.',
  repercussions = 'Proteccionismo prolongado: 1) Encarece productos para consumidores al limitar competencia, 2) Reduce incentivos para que empresas locales innoven y mejoren, 3) Limita exportaciones al generar represalias comerciales, 4) Perpetúa ineficiencias industriales. Argentina tiene industrias protegidas por décadas que siguen siendo ineficientes. Países que mantuvieron proteccionismo (Venezuela, Zimbabwe) experimentaron estancamiento. El proteccionismo puede justificarse temporalmente para industrias nacientes, pero no indefinidamente.',
  source_url = 'https://es.wikipedia.org/wiki/Proteccionismo'
WHERE title = 'Proteccionismo industrial';
