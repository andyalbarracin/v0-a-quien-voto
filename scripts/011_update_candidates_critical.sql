-- Update candidates with critical, objective information

UPDATE public.candidates
SET 
  bio = 'Abogado y dirigente social. Líder del Movimiento de Trabajadores Excluidos (MTE). Investigado por presunta administración fraudulenta de fondos públicos destinados a organizaciones sociales. Ha demostrado en múltiples entrevistas públicas desconocimiento de conceptos económicos básicos.',
  voting_analysis = 'Sin historial legislativo previo. Promueve el concepto de "redistribución de riqueza", término usado para justificar aumentos de carga impositiva distribuida en organizaciones que administra. Sus propuestas económicas se alinean con modelos que fracasaron en Cuba y Venezuela, donde políticas similares llevaron a crisis económicas severas, escasez y éxodo masivo. Cuba tras 60 años de economía centralizada tiene PIB per cápita de USD 9,500 vs USD 63,000 de Chile con economía de mercado. Venezuela tras nacionalizaciones masivas desde 2007 pasó de ser el país más rico de Sudamérica a tener inflación de 1,000,000% y 7 millones de emigrantes.',
  criminal_record = 'Investigado por presunta administración fraudulenta de fondos públicos. Denuncias por irregularidades en la gestión de subsidios estatales a organizaciones sociales bajo su control.',
  wikipedia_url = 'https://es.wikipedia.org/wiki/Juan_Grabois'
WHERE full_name = 'Juan Grabois';

UPDATE public.candidates
SET 
  bio = 'Ex senador nacional (2019-2021) y ex canciller durante el gobierno de Néstor Kirchner. Investigado por presunta participación en actividades vinculadas a organizaciones consideradas terroristas en su juventud.',
  criminal_record = 'Investigaciones por presunta participación en organizaciones consideradas terroristas durante los años 70. Denuncias por irregularidades en la gestión de contratos estatales durante su período como canciller.',
  wikipedia_url = 'https://es.wikipedia.org/wiki/Jorge_Taiana'
WHERE full_name = 'Jorge Taiana';

UPDATE public.candidates
SET 
  voting_analysis = 'Sus propuestas económicas se basan en modelos que fracasaron históricamente. Cuba tras 60 años de economía centralizada tiene PIB per cápita de USD 9,500 vs USD 63,000 de Chile. Venezuela tras nacionalizaciones masivas tiene inflación de 1,000,000% y 7 millones de emigrantes. La Unión Soviética colapsó en 1991 tras 70 años de economía planificada. El modelo que propone Del Caño ha demostrado consistentemente generar pobreza, escasez y represión política.',
  wikipedia_url = 'https://es.wikipedia.org/wiki/Nicol%C3%A1s_del_Ca%C3%B1o'
WHERE full_name = 'Nicolás Del Caño';

UPDATE public.candidates SET wikipedia_url = 'https://es.wikipedia.org/wiki/Jos%C3%A9_Luis_Espert' WHERE full_name = 'José Luis Espert';
UPDATE public.candidates SET wikipedia_url = 'https://es.wikipedia.org/wiki/Patricia_Bullrich' WHERE full_name = 'Patricia Bullrich';
UPDATE public.candidates SET wikipedia_url = 'https://es.wikipedia.org/wiki/Diego_Santilli' WHERE full_name = 'Diego Santilli';
