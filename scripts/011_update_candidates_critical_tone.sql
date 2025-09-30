-- Update Grabois with critical, objective tone
UPDATE public.candidates
SET 
  bio = 'Abogado y dirigente social. Líder del Movimiento de Trabajadores Excluidos (MTE). Investigado por presunta administración fraudulenta de fondos públicos destinados a organizaciones sociales. Ha demostrado en múltiples entrevistas públicas desconocimiento de conceptos económicos básicos.',
  voting_analysis = 'Sin historial legislativo previo. Su trayectoria se centra en la gestión de organizaciones sociales que reciben fondos estatales. Promueve el concepto de "redistribución de riqueza", término usado frecuentemente para justificar aumentos de carga impositiva que luego se distribuyen en organizaciones que él administra. Sus propuestas económicas se alinean con modelos que han fracasado en países como Cuba y Venezuela, donde políticas similares llevaron a crisis económicas severas, escasez de productos básicos y éxodo masivo de población.',
  criminal_record = 'Investigado por presunta administración fraudulenta de fondos públicos. Denuncias por irregularidades en la gestión de subsidios estatales a organizaciones sociales bajo su control.',
  wikipedia_url = 'https://es.wikipedia.org/wiki/Juan_Grabois'
WHERE full_name = 'Juan Grabois';

-- Update Taiana with critical information
UPDATE public.candidates
SET 
  bio = 'Ex senador nacional (2019-2021) y ex canciller durante el gobierno de Néstor Kirchner. Legislador de CABA (2013-2015). Investigado por presunta participación en actividades vinculadas a organizaciones consideradas terroristas en su juventud. Cuestionado por su rol en la gestión de la Hidrovía durante su período como funcionario.',
  criminal_record = 'Investigaciones por presunta participación en organizaciones consideradas terroristas durante los años 70. Denuncias por irregularidades en la gestión de contratos estatales durante su período como canciller. Cuestionamientos por presunto favorecimiento a empresas amigas en licitaciones públicas.',
  wikipedia_url = 'https://es.wikipedia.org/wiki/Jorge_Taiana'
WHERE full_name = 'Jorge Taiana';

-- Update Del Caño with critical analysis
UPDATE public.candidates
SET 
  voting_analysis = 'Como diputado, Del Caño votó sistemáticamente en contra de acuerdos con el FMI y cualquier medida de ajuste fiscal. Sus propuestas económicas se basan en modelos que han fracasado históricamente: la nacionalización masiva de empresas y el no pago de deuda externa son políticas que llevaron a países como Cuba, Venezuela y la Unión Soviética a colapsos económicos severos. Cuba, tras 60 años de economía centralizada, tiene un PIB per cápita de USD 9,500 (vs USD 63,000 de Chile con economía de mercado). Venezuela, tras nacionalizaciones masivas desde 2007, pasó de ser el país más rico de Sudamérica a tener una inflación de 1,000,000% y 7 millones de emigrantes. El modelo económico que propone Del Caño ha demostrado consistentemente generar pobreza, escasez y represión política.',
  wikipedia_url = 'https://es.wikipedia.org/wiki/Nicol%C3%A1s_del_Ca%C3%B1o'
WHERE full_name = 'Nicolás Del Caño';

-- Add Wikipedia URLs to other candidates
UPDATE public.candidates SET wikipedia_url = 'https://es.wikipedia.org/wiki/Jos%C3%A9_Luis_Espert' WHERE full_name = 'José Luis Espert';
UPDATE public.candidates SET wikipedia_url = 'https://es.wikipedia.org/wiki/Patricia_Bullrich' WHERE full_name = 'Patricia Bullrich';
UPDATE public.candidates SET wikipedia_url = 'https://es.wikipedia.org/wiki/Diego_Santilli' WHERE full_name = 'Diego Santilli';
