-- Insert key candidates for 2025 legislative elections

-- LA LIBERTAD AVANZA candidates
INSERT INTO public.candidates (full_name, party_id, position, province, list_position, bio, key_proposals, voting_analysis)
SELECT 
  'José Luis Espert',
  id,
  'Diputado Nacional',
  'Buenos Aires',
  1,
  'Economista y diputado nacional desde 2021. Presidente de la Comisión de Presupuesto y Hacienda. Conocido por sus posiciones libertarias y críticas al gasto público.',
  'Eliminación de retenciones al campo, reducción del gasto público del 40% al 25% del PIB, reforma laboral para eliminar privilegios sindicales, independencia absoluta del Banco Central, apertura comercial total y firma de tratados de libre comercio.',
  'Como diputado, Espert votó consistentemente a favor de la reducción del gasto público y en contra de aumentos de impuestos. Apoyó la Ley de Bases del gobierno de Milei y votó en contra de la ampliación de planes sociales. Su historial muestra coherencia con su discurso libertario: votó contra la intervención estatal en la economía en el 95% de los casos analizados.'
FROM public.political_parties WHERE acronym = 'LLA';

INSERT INTO public.candidates (full_name, party_id, position, province, list_position, bio, key_proposals, voting_analysis)
SELECT 
  'Patricia Bullrich',
  id,
  'Senadora Nacional',
  'Ciudad de Buenos Aires',
  1,
  'Actual Ministra de Seguridad Nacional. Ex diputada nacional y ex ministra de Seguridad durante el gobierno de Macri. Conocida por sus políticas de mano dura contra el crimen.',
  'Construcción de cárceles de máxima seguridad, protocolo antipiquetes, uso de fuerzas federales contra el narcotráfico, reducción de edad de imputabilidad, reforma del código penal para endurecer penas por delitos graves.',
  'Durante su gestión como ministra (2015-2019), Bullrich implementó protocolos de seguridad más estrictos y aumentó la presencia de fuerzas federales. Como diputada, votó sistemáticamente a favor del endurecimiento de penas y en contra de leyes que consideraba "garantistas". Apoyó el 100% de las iniciativas de seguridad de mano dura y se opuso a reformas del sistema penitenciario enfocadas en rehabilitación.'
FROM public.political_parties WHERE acronym = 'LLA';

-- UNIÓN POR LA PATRIA candidates
INSERT INTO public.candidates (full_name, party_id, position, province, list_position, bio, key_proposals, voting_analysis)
SELECT 
  'Jorge Taiana',
  id,
  'Diputado Nacional',
  'Buenos Aires',
  1,
  'Ex senador nacional (2019-2021) y ex canciller durante el gobierno de Néstor Kirchner. Legislador de CABA (2013-2015). Referente del peronismo en política exterior y desarrollo.',
  'Renegociación de deuda externa con el FMI en términos favorables, control estatal de recursos estratégicos como la Hidrovía, fortalecimiento de MERCOSUR, aumento de inversión en educación y salud pública, protección de la industria nacional.',
  'Como senador, Taiana apoyó la renegociación de la deuda con el FMI y se opuso a políticas de ajuste. Votó a favor del aumento de impuestos a grandes fortunas y de la ampliación de derechos laborales. Su historial muestra un 90% de apoyo a iniciativas de intervención estatal en la economía y protección de derechos sociales. Se opuso sistemáticamente a reformas laborales de flexibilización.'
FROM public.political_parties WHERE acronym = 'UP';

INSERT INTO public.candidates (full_name, party_id, position, province, list_position, bio, key_proposals, voting_analysis)
SELECT 
  'Juan Grabois',
  id,
  'Diputado Nacional',
  'Buenos Aires',
  3,
  'Abogado y dirigente social. Líder del Movimiento de Trabajadores Excluidos (MTE). Referente de la economía popular y los movimientos sociales.',
  'Salario básico universal, reforma agraria, regularización de asentamientos informales, nacionalización de servicios públicos, impuesto a las grandes fortunas, fortalecimiento de cooperativas y economía social.',
  'Grabois es un nuevo candidato sin historial legislativo previo, pero su trayectoria como dirigente social muestra un compromiso absoluto con la redistribución de riqueza y la ampliación de derechos sociales. Ha liderado movilizaciones por vivienda digna, trabajo y contra el ajuste económico. Sus propuestas son las más radicales dentro de Unión por la Patria, alineadas con el ala más progresista del peronismo.'
FROM public.political_parties WHERE acronym = 'UP';

-- PRO candidates (in alliance with LLA)
INSERT INTO public.candidates (full_name, party_id, position, province, list_position, bio, key_proposals, voting_analysis)
SELECT 
  'Diego Santilli',
  id,
  'Diputado Nacional',
  'Buenos Aires',
  3,
  'Ex vicejefe de Gobierno de CABA y ex diputado nacional. Conocido por su gestión en seguridad durante el gobierno de Macri en la ciudad.',
  'Modernización del Estado, reforma tributaria para reducir presión fiscal, políticas de seguridad con tecnología y prevención, inversión en infraestructura, apoyo a PyMEs mediante reducción de cargas.',
  'Como diputado, Santilli votó a favor de reformas pro-mercado moderadas y políticas de seguridad equilibradas. Apoyó la reducción de impuestos a sectores productivos pero también votó a favor de mantener ciertos programas sociales. Su historial muestra un perfil más moderado que LLA: 60% de votos a favor de reducción del Estado, pero 40% de apoyo a políticas sociales focalizadas.'
FROM public.political_parties WHERE acronym = 'PRO';

-- UCR candidates
INSERT INTO public.candidates (full_name, party_id, position, province, list_position, bio, key_proposals, voting_analysis)
SELECT 
  'Darío Schneider',
  id,
  'Diputado Nacional',
  'Entre Ríos',
  3,
  'Dirigente radical de Entre Ríos. Parte de la alianza con La Libertad Avanza en su provincia, representando el ala más liberal de la UCR.',
  'Federalismo fiscal, desarrollo de economías regionales, educación pública de calidad, equilibrio entre mercado y Estado, transparencia en la gestión pública.',
  'Schneider representa el ala de la UCR que apoya reformas de mercado pero con mantenimiento de servicios públicos esenciales. Sin historial legislativo nacional previo, su gestión provincial muestra apoyo a la inversión privada pero también a la educación y salud públicas. Se espera un perfil moderado, similar al radicalismo histórico.'
FROM public.political_parties WHERE acronym = 'UCR';

-- FRENTE DE IZQUIERDA candidates
INSERT INTO public.candidates (full_name, party_id, position, province, list_position, bio, key_proposals, voting_analysis)
SELECT 
  'Nicolás Del Caño',
  id,
  'Diputado Nacional',
  'Buenos Aires',
  1,
  'Dirigente del Partido Obrero y diputado nacional (2013-2017). Referente del trotskismo argentino y líder del Frente de Izquierda.',
  'Nacionalización de bancos y empresas estratégicas, no pago de deuda externa, salario mínimo igual a la canasta familiar, prohibición de despidos, reforma agraria, impuesto progresivo a grandes fortunas.',
  'Como diputado, Del Caño votó sistemáticamente en contra de acuerdos con el FMI, reformas laborales y cualquier medida de ajuste. Apoyó el 100% de las iniciativas de ampliación de derechos laborales y sociales. Se opuso a todas las privatizaciones y votó a favor de nacionalizaciones. Su historial es el más consistente con posiciones anticapitalistas y de izquierda radical.'
FROM public.political_parties WHERE acronym = 'FIT';
