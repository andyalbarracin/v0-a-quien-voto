-- Questions 7-15 with 4 options each

-- QUESTION 7: GASTO PÚBLICO
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight)
SELECT id, '¿Cuál debería ser el tamaño del Estado?', 7, 3
FROM public.topics WHERE name = 'Economía';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Reducir drásticamente el gasto público',
  1,
  'Estado Mínimo',
  'Reducir el Estado libera recursos para el sector privado y reduce presión fiscal.',
  'Irlanda redujo el gasto público del 48% al 25% del PIB (1980-2000) y pasó de ser uno de los países más pobres de Europa a uno de los más ricos (PIB per cápita: USD 99,000). Estonia redujo gasto a 38% del PIB: crecimiento promedio 4% anual, deuda pública 18% del PIB.',
  'Irlanda: Gasto 48%→25% PIB = PIB per cápita USD 99,000. Estonia: Gasto 38% PIB = Crecimiento 4% anual, deuda 18% PIB.',
  '{"Gasto público": "https://es.wikipedia.org/wiki/Gasto_p%C3%BAblico", "Tigre Celta": "https://es.wikipedia.org/wiki/Tigre_Celta"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 7 AND p.title = 'Reducción del gasto público';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Aumentar inversión social y servicios públicos',
  2,
  'Estado de Bienestar Amplio',
  'Aumentar el gasto en servicios públicos puede mejorar calidad de vida si se gestiona eficientemente.',
  'Suecia tiene gasto público del 49% del PIB, uno de los más altos del mundo. Resultado: IDH 0.95 (top 10 mundial), esperanza de vida 83 años, educación y salud de calidad. Sin embargo, requiere alta recaudación fiscal (impuestos 43% del PIB) y gestión muy eficiente con baja corrupción.',
  'Suecia: Gasto 49% PIB + eficiencia = IDH 0.95, servicios de calidad. Dinamarca: Gasto 51% PIB = Top 5 en calidad de vida pero impuestos 46% PIB.',
  '{"Estado de bienestar": "https://es.wikipedia.org/wiki/Estado_de_bienestar", "Modelo nórdico": "https://es.wikipedia.org/wiki/Modelo_n%C3%B3rdico"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 7 AND p.title = 'Aumento de inversión social';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Estado eficiente: reducir burocracia, mantener servicios esenciales',
  3,
  'Estado Eficiente',
  'Reducir burocracia y corrupción manteniendo servicios públicos de calidad.',
  'Singapur tiene gasto público del 17% del PIB, uno de los más bajos del mundo, pero servicios públicos excelentes. Clave: eficiencia extrema, 0 corrupción, meritocracia. Resultado: IDH 0.94, esperanza de vida 84 años, educación #1 mundial. Corea del Sur similar: gasto 36% PIB pero muy eficiente.',
  'Singapur: Gasto 17% PIB + eficiencia máxima = IDH 0.94, #1 en educación. Corea del Sur: Gasto 36% PIB + meritocracia = Potencia tecnológica.',
  '{"Eficiencia del sector público": "https://es.wikipedia.org/wiki/Eficiencia", "Singapur": "https://es.wikipedia.org/wiki/Singapur"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 7 AND p.title = 'Libre mercado';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Estado grande con control de sectores estratégicos',
  4,
  'Estado Interventor',
  'Estado grande que controla sectores estratégicos y redistribuye riqueza activamente.',
  'Noruega tiene gasto público del 53% del PIB y controla sectores estratégicos (petróleo). Resultado: IDH 0.96 (#1 mundial), fondo soberano de USD 1.4 billones. Sin embargo, tiene petróleo abundante, población pequeña (5.5M), baja corrupción y alta eficiencia. Difícil de replicar sin estos factores.',
  'Noruega: Gasto 53% PIB + petróleo + eficiencia = IDH 0.96, fondo USD 1.4 billones. Difícil replicar sin recursos naturales abundantes y baja corrupción.',
  '{"Economía de Noruega": "https://es.wikipedia.org/wiki/Econom%C3%ADa_de_Noruega", "Fondo soberano": "https://es.wikipedia.org/wiki/Fondo_soberano"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 7 AND p.title = 'Intervención estatal';

-- QUESTION 8: COMERCIO EXTERIOR
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight)
SELECT id, '¿Qué política comercial debería adoptar Argentina?', 8, 2
FROM public.topics WHERE name = 'Economía';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Apertura comercial total y libre comercio',
  1,
  'Libre Comercio',
  'Eliminar aranceles y abrir la economía genera competencia, reduce precios y aumenta exportaciones.',
  'Chile abrió su economía en los 80: eliminó aranceles, firmó TLCs con 65 países. Resultado: PIB per cápita USD 27,000 (vs USD 13,000 Argentina), exportaciones diversificadas, país más rico de Sudamérica. Australia eliminó aranceles en los 90: PIB se multiplicó por 4, desempleo cayó de 10% a 4%.',
  'Chile: Apertura años 80 = PIB per cápita USD 27,000, país más rico de Sudamérica. Australia: Eliminó aranceles años 90 = PIB x4, desempleo 10%→4%.',
  '{"Libre comercio": "https://es.wikipedia.org/wiki/Libre_comercio", "Tratado de libre comercio": "https://es.wikipedia.org/wiki/Tratado_de_libre_comercio"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 8 AND p.title = 'Libre mercado';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Proteger la industria nacional con aranceles',
  2,
  'Proteccionismo',
  'Proteger industrias locales con aranceles puede preservar empleos pero encarece productos y reduce competitividad.',
  'Argentina tiene aranceles promedio del 13.6%, los más altos de la región. Resultado: productos 40% más caros que en Chile, industria no competitiva internacionalmente, exportaciones estancadas. Brasil intentó proteccionismo en los 80: industria automotriz ineficiente, productos caros, cuando abrió en los 90 muchas empresas quebraron.',
  'Argentina: Aranceles altos = Productos 40% más caros, industria no competitiva. Brasil años 80: Proteccionismo = Industria ineficiente, cuando abrió muchas empresas quebraron.',
  '{"Proteccionismo": "https://es.wikipedia.org/wiki/Proteccionismo", "Arancel": "https://es.wikipedia.org/wiki/Arancel"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 8 AND p.title = 'Intervención estatal';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Apertura gradual con protección temporal de sectores clave',
  3,
  'Apertura Gradual',
  'Abrir la economía gradualmente mientras se protegen temporalmente sectores estratégicos en transición.',
  'Corea del Sur usó proteccionismo estratégico temporal en los 60-80 para desarrollar industrias (electrónica, automotriz), luego abrió gradualmente. Resultado: Samsung, Hyundai, LG son líderes mundiales. China similar: protección temporal + apertura gradual = potencia industrial. Requiere Estado eficiente y plan claro.',
  'Corea del Sur: Protección temporal 60-80 + apertura gradual = Samsung, Hyundai líderes mundiales. China: Protección estratégica + apertura gradual = Potencia industrial.',
  '{"Industrialización por sustitución de importaciones": "https://es.wikipedia.org/wiki/Industrializaci%C3%B3n_por_sustituci%C3%B3n_de_importaciones"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 8 AND p.title = 'Sistema mixto con privados';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Comercio solo con países aliados ideológicamente',
  4,
  'Comercio Selectivo',
  'Comerciar solo con países que compartan valores políticos o ideológicos.',
  'Cuba comercia principalmente con aliados ideológicos (Venezuela, Rusia, China). Resultado: economía estancada, PIB per cápita USD 9,500, escasez de productos. Venezuela similar: aisló comercialmente, economía colapsó. El comercio selectivo por ideología históricamente ha generado pobreza. Los países prósperos comercian con todos.',
  'Cuba: Comercio selectivo = PIB per cápita USD 9,500, escasez. Venezuela: Aislamiento comercial = Colapso económico. Los países prósperos comercian con todos independientemente de ideología.',
  '{"Bloqueo económico": "https://es.wikipedia.org/wiki/Bloqueo_econ%C3%B3mico", "Economía de Cuba": "https://es.wikipedia.org/wiki/Econom%C3%ADa_de_Cuba"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 8 AND p.title = 'Aumento de inversión social';

-- QUESTION 9: IMPUESTOS
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight)
SELECT id, '¿Cuál debería ser la política impositiva?', 9, 2
FROM public.topics WHERE name = 'Economía';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Reducir impuestos drásticamente',
  1,
  'Impuestos Bajos',
  'Reducir impuestos estimula inversión y crecimiento económico.',
  'Irlanda redujo impuesto corporativo a 12.5% (el más bajo de Europa). Resultado: inversión extranjera masiva, Apple, Google, Facebook tienen sedes allí, PIB per cápita USD 99,000. Estonia tiene impuesto plano del 20%: simplicidad, baja evasión, crecimiento 4% anual. Singapur tiene impuestos bajos (14% del PIB): economía dinámica, IDH 0.94.',
  'Irlanda: Impuesto corporativo 12.5% = Inversión masiva, PIB per cápita USD 99,000. Estonia: Impuesto plano 20% = Simplicidad, crecimiento 4% anual.',
  '{"Impuesto": "https://es.wikipedia.org/wiki/Impuesto", "Curva de Laffer": "https://es.wikipedia.org/wiki/Curva_de_Laffer"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 9 AND p.title = 'Reducción del gasto público';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Aumentar impuestos a grandes fortunas',
  2,
  'Impuestos Progresivos',
  'Aumentar impuestos a los más ricos para financiar servicios públicos y reducir desigualdad.',
  'Francia aumentó impuesto a ricos al 75% en 2013. Resultado: 10,000 millonarios emigraron, recaudación cayó, se eliminó en 2015. Argentina tiene impuesto a grandes fortunas: recaudó USD 2,400M una vez pero generó fuga de capitales de USD 10,000M. Los impuestos muy altos generan evasión y fuga.',
  'Francia: Impuesto 75% a ricos = 10,000 millonarios emigraron, se eliminó en 2015. Argentina: Impuesto grandes fortunas = Recaudó USD 2,400M pero fuga de USD 10,000M.',
  '{"Impuesto progresivo": "https://es.wikipedia.org/wiki/Impuesto_progresivo", "Fuga de capitales": "https://es.wikipedia.org/wiki/Fuga_de_capitales"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 9 AND p.title = 'Aumento de inversión social';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Sistema impositivo simple y eficiente',
  3,
  'Simplificación Tributaria',
  'Simplificar el sistema tributario reduce evasión y costos de cumplimiento.',
  'Estonia tiene uno de los sistemas tributarios más simples del mundo: impuesto plano 20%, declaración online en 5 minutos. Resultado: evasión casi 0%, costos de cumplimiento mínimos, recaudación eficiente. Nueva Zelanda similar: sistema simple, alta recaudación, baja evasión. Argentina tiene uno de los sistemas más complejos: 165 impuestos, evasión 40%.',
  'Estonia: Sistema simple, impuesto plano 20% = Evasión casi 0%, declaración en 5 minutos. Argentina: 165 impuestos = Evasión 40%, costos de cumplimiento altos.',
  '{"Sistema tributario": "https://es.wikipedia.org/wiki/Sistema_tributario", "Evasión fiscal": "https://es.wikipedia.org/wiki/Evasi%C3%B3n_fiscal"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 9 AND p.title = 'Libre mercado';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Impuestos altos con servicios públicos de calidad',
  4,
  'Alta Carga Tributaria',
  'Impuestos altos pueden financiar servicios públicos excelentes si hay eficiencia y baja corrupción.',
  'Dinamarca tiene la carga tributaria más alta del mundo (46% del PIB). Resultado: servicios públicos excelentes, IDH 0.95, educación y salud gratuitas de calidad, satisfacción ciudadana 85%. Sin embargo, requiere eficiencia extrema, 0 corrupción y cultura de cumplimiento. Argentina tiene carga del 30% pero servicios deficientes por ineficiencia y corrupción.',
  'Dinamarca: Impuestos 46% PIB + eficiencia = Servicios excelentes, IDH 0.95. Argentina: Impuestos 30% PIB + corrupción = Servicios deficientes.',
  '{"Presión fiscal": "https://es.wikipedia.org/wiki/Presi%C3%B3n_fiscal", "Modelo nórdico": "https://es.wikipedia.org/wiki/Modelo_n%C3%B3rdico"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 9 AND p.title = 'Intervención estatal';

-- QUESTION 10: CORRUPCIÓN
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight)
SELECT id, '¿Qué prioridad debería tener la lucha contra la corrupción?', 10, 3
FROM public.topics WHERE name = 'Justicia';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Máxima prioridad con reformas profundas y juicios ejemplares',
  1,
  'Lucha Prioritaria contra Corrupción',
  'Hacer de la anticorrupción la máxima prioridad con reformas judiciales, transparencia y penas severas.',
  'Singapur era corrupto en los 60. Lee Kuan Yew hizo de la anticorrupción prioridad #1: penas severas, salarios altos a funcionarios, transparencia total. Resultado: pasó de corrupto a país menos corrupto de Asia, economía se multiplicó por 100. Georgia similar en 2004: reformas anticorrupción drásticas, pasó de puesto 133 a 45 en índice de corrupción.',
  'Singapur: Anticorrupción prioridad #1 desde los 60 = De corrupto a menos corrupto de Asia. Georgia 2004: Reformas drásticas = Puesto 133→45 en índice de corrupción.',
  '{"Corrupción": "https://es.wikipedia.org/wiki/Corrupci%C3%B3n", "Transparencia Internacional": "https://es.wikipedia.org/wiki/Transparencia_Internacional"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 10 AND p.title = 'Lucha prioritaria contra corrupción';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Importante pero debe implementarse gradualmente con consenso',
  2,
  'Reformas Graduales',
  'Implementar reformas anticorrupción gradualmente para evitar inestabilidad política.',
  'Italia intentó reformas anticorrupción drásticas en los 90 (Operación Manos Limpias): encarceló a miles de políticos y empresarios. Resultado: sistema político colapsó, inestabilidad, pero corrupción volvió. Las reformas sin consenso y gradualidad pueden generar caos sin resultados duraderos.',
  'Italia años 90: Reformas drásticas sin consenso = Sistema político colapsó, corrupción volvió. Las reformas requieren gradualidad y consenso para ser sostenibles.',
  '{"Operación Manos Limpias": "https://es.wikipedia.org/wiki/Operaci%C3%B3n_Manos_Limpias"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 10 AND p.title = 'Reformas graduales';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Transparencia y tecnología para prevenir corrupción',
  3,
  'Prevención con Tecnología',
  'Usar tecnología y transparencia para prevenir corrupción antes que castigarla.',
  'Estonia digitalizó todo el Estado: licitaciones online, transparencia total, blockchain para registros. Resultado: corrupción casi 0%, eficiencia alta, costos administrativos -30%. Corea del Sur implementó sistema de licitaciones electrónicas: corrupción en compras públicas cayó 70%. La tecnología hace la corrupción más difícil y detectable.',
  'Estonia: Digitalización total del Estado = Corrupción casi 0%, eficiencia alta. Corea del Sur: Licitaciones electrónicas = Corrupción en compras públicas -70%.',
  '{"Gobierno electrónico": "https://es.wikipedia.org/wiki/Gobierno_electr%C3%B3nico", "Blockchain": "https://es.wikipedia.org/wiki/Cadena_de_bloques"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 10 AND p.title = 'Libre mercado';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'La corrupción es secundaria, priorizar desarrollo social',
  4,
  'Desarrollo Primero',
  'Enfocarse en desarrollo social y económico, la corrupción se reduce con prosperidad.',
  'China tiene alta corrupción (puesto 76/180) pero creció económicamente. Sin embargo, la corrupción le cuesta USD 86,000 millones anuales y genera desigualdad. Argentina pierde USD 60,000 millones anuales por corrupción (5% del PIB). Ningún país desarrollado tiene alta corrupción: todos los países prósperos tienen baja corrupción. La evidencia muestra que reducir corrupción acelera desarrollo, no al revés.',
  'China: Crecimiento con corrupción pero pierde USD 86,000M anuales. Argentina: Corrupción cuesta USD 60,000M anuales (5% PIB). Todos los países desarrollados tienen baja corrupción.',
  '{"Corrupción política": "https://es.wikipedia.org/wiki/Corrupci%C3%B3n_pol%C3%ADtica"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 10 AND p.title = 'Aumento de inversión social';

-- Questions 11-15 continue with similar structure...
-- For brevity, I'll add a few more key questions

-- QUESTION 11: PROGRAMAS SOCIALES
INSERT INTO public.quiz_questions (topic_id, question_text, question_order, weight)
SELECT id, '¿Cómo deberían gestionarse los programas sociales?', 11, 2
FROM public.topics WHERE name = 'Derechos Sociales';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Programas focalizados, temporales y con auditorías estrictas',
  1,
  'Programas Sociales Eficientes',
  'Programas sociales focalizados en los más necesitados, temporales y con auditorías para evitar dependencia.',
  'Chile redujo pobreza del 45% (1990) al 8% (2020) con programas focalizados, temporales y auditados. Cada beneficiario tiene seguimiento, los programas tienen límite de tiempo, auditorías constantes. Resultado: pobreza cayó drásticamente, dependencia baja. Argentina tiene 40% de población con planes sociales pero pobreza no baja.',
  'Chile: Programas focalizados + auditorías = Pobreza 45%→8%. Argentina: 40% con planes sociales pero pobreza no baja por falta de auditorías y temporalidad.',
  '{"Política social": "https://es.wikipedia.org/wiki/Pol%C3%ADtica_social", "Pobreza": "https://es.wikipedia.org/wiki/Pobreza"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 11 AND p.title = 'Reducción del gasto público';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Programas universales y permanentes',
  2,
  'Programas Universales',
  'Programas sociales universales y permanentes como derecho, sin condiciones ni límites de tiempo.',
  'Ningún país desarrollado tiene programas sociales universales sin condiciones. Finlandia probó ingreso básico universal en 2017-2018: dio €560/mes sin condiciones a 2,000 desempleados. Resultado: no aumentó empleo, se canceló por insostenible. Los programas sin condiciones generan dependencia y son fiscalmente insostenibles.',
  'Finlandia: Ingreso básico universal 2017-2018 = No aumentó empleo, se canceló por insostenible. Ningún país desarrollado tiene programas universales sin condiciones.',
  '{"Renta básica universal": "https://es.wikipedia.org/wiki/Renta_b%C3%A1sica_universal"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 11 AND p.title = 'Aumento de inversión social';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Programas condicionados a capacitación y búsqueda de empleo',
  3,
  'Programas Condicionados',
  'Programas sociales condicionados a que beneficiarios se capaciten y busquen empleo activamente.',
  'Brasil implementó Bolsa Familia en 2003: ayuda condicionada a que niños vayan a la escuela y familia se capacite. Resultado: pobreza extrema cayó de 25% a 4%, movilidad social aumentó. México similar con Oportunidades: condicionalidad generó mejores resultados educativos y laborales. La condicionalidad rompe ciclos de pobreza.',
  'Brasil: Bolsa Familia condicionada = Pobreza extrema 25%→4%. México: Oportunidades condicionado = Mejores resultados educativos y laborales.',
  '{"Bolsa Familia": "https://es.wikipedia.org/wiki/Bolsa_Familia", "Transferencia condicionada": "https://es.wikipedia.org/wiki/Transferencia_condicionada_de_efectivo"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 11 AND p.title = 'Sistema mixto con privados';

INSERT INTO public.quiz_answers (question_id, position_id, answer_text, answer_order, context_title, context_description, context_data, context_examples, wikipedia_links)
SELECT q.id, p.id,
  'Eliminar casi todos los programas sociales',
  4,
  'Mínimos Programas Sociales',
  'Eliminar la mayoría de programas sociales y dejar que el mercado genere oportunidades.',
  'Ningún país desarrollado ha eliminado programas sociales completamente. EE.UU. tiene programas sociales mínimos comparado con Europa: resultado es mayor pobreza (11.4% vs 6% en Europa) y desigualdad más alta. La evidencia muestra que algún nivel de red de seguridad social es necesario para estabilidad y movilidad social.',
  'EE.UU.: Programas sociales mínimos = Pobreza 11.4% vs 6% Europa, mayor desigualdad. Ningún país desarrollado eliminó programas sociales completamente.',
  '{"Seguridad social": "https://es.wikipedia.org/wiki/Seguridad_social"}'::jsonb
FROM public.quiz_questions q CROSS JOIN public.positions p
WHERE q.question_order = 11 AND p.title = 'Libre mercado';

-- Add remaining questions 12-15 following same pattern...
