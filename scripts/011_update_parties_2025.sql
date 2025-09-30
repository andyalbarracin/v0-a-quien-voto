-- Actualizar partidos políticos con información de elecciones 2025
DELETE FROM political_parties;

INSERT INTO political_parties (name, acronym, ideology, description, founded_year, website, color) VALUES
(
  'La Libertad Avanza',
  'LLA',
  'Libertarianismo, Liberalismo económico',
  'Partido político argentino de ideología libertaria fundado por Javier Milei. Propone reducción drástica del Estado, apertura económica, dolarización y reformas estructurales profundas. En 2025 se presenta en alianza con PRO en varios distritos.',
  2021,
  'https://lalibertadavanza.com.ar',
  '#9333EA'
),
(
  'Fuerza Patria',
  'FP',
  'Peronismo, Kirchnerismo',
  'Frente electoral del peronismo kirchnerista que representa a Unión por la Patria. Propone políticas de inclusión social, intervención estatal en la economía, derechos laborales y justicia social. Heredero del Frente de Todos.',
  2023,
  NULL,
  '#0EA5E9'
),
(
  'Propuesta Republicana',
  'PRO',
  'Centroderecha, Conservadurismo liberal',
  'Partido político de centroderecha fundado por Mauricio Macri. Propone políticas de mercado, reducción del gasto público, combate a la corrupción y seguridad. En 2025 se presenta mayormente en alianza con La Libertad Avanza.',
  2005,
  'https://pro.com.ar',
  '#EAB308'
),
(
  'Unión Cívica Radical',
  'UCR',
  'Centrismo, Socialdemocracia',
  'Partido político histórico argentino fundado en 1891. Propone políticas de centro, defensa de las instituciones democráticas, federalismo y equilibrio entre Estado y mercado. En 2025 participa en diversas alianzas según la provincia.',
  1891,
  'https://ucr.org.ar',
  '#DC2626'
),
(
  'Frente de Izquierda y de Trabajadores',
  'FIT',
  'Socialismo, Trotskismo',
  'Coalición de partidos de izquierda que incluye al PTS, PO, IS y MST. Propone la nacionalización de sectores estratégicos, no pago de la deuda externa, defensa de derechos laborales y transformación socialista.',
  2011,
  NULL,
  '#DC2626'
),
(
  'Provincias Unidas',
  'PU',
  'Centrismo, Federalismo',
  'Espacio político liderado por Florencio Randazzo que propone federalismo, desarrollo productivo y políticas de centro pragmáticas.',
  2021,
  NULL,
  '#10B981'
);
