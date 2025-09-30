-- Cargar candidatos reales de las elecciones legislativas 2025
DELETE FROM candidates;

-- La Libertad Avanza (LLA)
INSERT INTO candidates (full_name, party_id, position_type, province, list_order, biography, key_proposals, voting_history) VALUES
(
  'José Luis Espert',
  (SELECT id FROM political_parties WHERE acronym = 'LLA'),
  'Diputado Nacional',
  'Buenos Aires',
  1,
  'Economista y diputado nacional desde 2021. Presidente de la Comisión de Presupuesto y Hacienda desde 2024. Reconocido por sus posiciones liberales en economía y críticas al gasto público. Fundador del partido Avanza Libertad, ahora aliado con LLA.',
  '• Reducción del gasto público del 40% al 25% del PBI
• Eliminación de aranceles de importación y apertura comercial total
• Firma de tratados de libre comercio
• Reforma laboral para eliminar privilegios sindicales
• Transformación de planes sociales en asistencia en especie
• Reforma previsional con sistema contributivo estricto
• Reducción de la carga impositiva gradual',
  'Como diputado desde 2021, ha votado consistentemente a favor de:
- Reducción del gasto público y ajuste fiscal
- Eliminación de regulaciones económicas
- Apertura de importaciones
- Reformas laborales pro-mercado
Ha votado en contra de:
- Aumentos de impuestos
- Expansión de planes sociales sin contrapartida
- Regulaciones de precios y controles cambiarios'
),
(
  'Patricia Bullrich',
  (SELECT id FROM political_parties WHERE acronym = 'LLA'),
  'Senadora Nacional',
  'Ciudad de Buenos Aires',
  1,
  'Actual Ministra de Seguridad Nacional. Ex ministra de Seguridad (2015-2019) y diputada nacional en múltiples períodos. En 2025 se afilió a La Libertad Avanza tras ser candidata presidencial por PRO en 2023. Reconocida por su línea dura en seguridad.',
  '• Construcción de cárceles de máxima seguridad para narcotraficantes
• Mano dura contra el crimen organizado y narcotráfico
• Protocolo antipiquetes y orden público
• Bimonetarismo y libre circulación del dólar
• Reforma del Estado para reducir gasto público
• Transformación de planes sociales en seguros de desempleo con capacitación
• Superávit fiscal y presupuesto sin déficit',
  'Como diputada nacional (1993-1997, 2007-2015) votó a favor de:
- Leyes de seguridad más estrictas
- Reducción del gasto público
- Reformas de mercado
- Protocolos de seguridad más duros
Como Ministra de Seguridad implementó:
- Protocolo antipiquetes
- Operativos contra narcotráfico
- Modernización de fuerzas de seguridad'
),
(
  'Luis Petri',
  (SELECT id FROM political_parties WHERE acronym = 'LLA'),
  'Diputado Nacional',
  'Mendoza',
  1,
  'Actual Ministro de Defensa. Ex diputado nacional por la UCR (2013-2023). Abogado especializado en derecho constitucional. Se sumó a La Libertad Avanza en alianza con el radicalismo mendocino.',
  '• Modernización de las Fuerzas Armadas
• Fortalecimiento de la defensa nacional
• Reducción del gasto público improductivo
• Federalismo y desarrollo regional
• Seguridad jurídica para inversiones
• Combate a la corrupción',
  'Como diputado nacional por UCR votó a favor de:
- Modernización de las FFAA
- Transparencia y anticorrupción
- Reformas institucionales
- Equilibrio fiscal
Votó en contra de:
- Reformas judiciales que afectaran independencia
- Aumentos discrecionales del gasto público'
);

-- Fuerza Patria (Peronismo/Kirchnerismo)
INSERT INTO candidates (full_name, party_id, position_type, province, list_order, biography, key_proposals, voting_history) VALUES
(
  'Jorge Taiana',
  (SELECT id FROM political_parties WHERE acronym = 'FP'),
  'Diputado Nacional',
  'Buenos Aires',
  1,
  'Ex Ministro de Defensa (2021-2023) y ex Canciller (2005-2010). Senador nacional (2019-2021) y legislador porteño (2013-2015). Figura histórica del peronismo kirchnerista con amplia experiencia en política exterior y defensa.',
  '• Renegociación de la deuda externa con el FMI
• Control estatal de recursos estratégicos (Hidrovía)
• Políticas de inclusión social y derechos laborales
• Fortalecimiento del mercado interno
• Industrialización y sustitución de importaciones
• Defensa de la soberanía nacional
• Rechazo a políticas de ajuste del FMI',
  'Como senador (2019-2021) votó a favor de:
- Renegociación de deuda con FMI
- Legalización del aborto
- Impuesto a la riqueza
- Regulaciones laborales proteccionistas
- Control de precios y cambios
Votó en contra de:
- Reformas laborales de flexibilización
- Acuerdos con organismos internacionales sin condiciones
- Reducción del gasto social'
),
(
  'Juan Grabois',
  (SELECT id FROM political_parties WHERE acronym = 'FP'),
  'Diputado Nacional',
  'Buenos Aires',
  3,
  'Abogado y dirigente social. Líder del Movimiento de Trabajadores Excluidos (MTE) y referente de la Unión de Trabajadores de la Economía Popular (UTEP). Reconocido activista por los derechos de los sectores populares.',
  '• Salario básico universal
• Reforma agraria y acceso a la tierra
• Regularización de asentamientos informales
• Fortalecimiento de la economía popular
• Nacionalización de servicios públicos
• Impuesto a las grandes fortunas
• Rechazo total al ajuste y al FMI',
  'Como dirigente social ha impulsado:
- Leyes de emergencia alimentaria
- Programas de economía popular
- Regularización de tierras
- Aumento de planes sociales
Ha sido crítico de:
- Políticas de ajuste fiscal
- Desregulación laboral
- Reducción del gasto social'
),
(
  'Mariano Recalde',
  (SELECT id FROM political_parties WHERE acronym = 'FP'),
  'Senador Nacional',
  'Ciudad de Buenos Aires',
  1,
  'Senador nacional desde 2019. Abogado laboralista. Ex presidente de Aerolíneas Argentinas (2009-2015). Especialista en derecho del trabajo y políticas de transporte.',
  '• Defensa de Aerolíneas Argentinas como empresa estatal
• Fortalecimiento de derechos laborales
• Rechazo a reformas laborales de flexibilización
• Políticas de transporte público accesible
• Regulación de servicios públicos
• Protección de la industria nacional',
  'Como senador desde 2019 ha votado a favor de:
- Legalización del aborto
- Impuesto a la riqueza
- Regulaciones laborales proteccionistas
- Subsidios al transporte público
- Control de tarifas de servicios
Ha votado en contra de:
- Acuerdo con FMI sin condiciones
- Reformas laborales de flexibilización
- Privatizaciones de empresas públicas'
);

-- PRO (en alianza con LLA en varios distritos)
INSERT INTO candidates (full_name, party_id, position_type, province, list_order, biography, key_proposals, voting_history) VALUES
(
  'Diego Santilli',
  (SELECT id FROM political_parties WHERE acronym = 'PRO'),
  'Diputado Nacional',
  'Buenos Aires',
  3,
  'Ex vicejefe de Gobierno de la Ciudad de Buenos Aires (2015-2021). Contador público. Figura clave del PRO en provincia de Buenos Aires. En 2025 se presenta en alianza con La Libertad Avanza.',
  '• Reducción del gasto público y equilibrio fiscal
• Combate a la inseguridad con más policías
• Modernización del Estado
• Atracción de inversiones
• Infraestructura y obra pública
• Educación de calidad',
  'Como vicejefe de Gobierno implementó:
- Políticas de seguridad más estrictas
- Modernización administrativa
- Reducción de subsidios
- Infraestructura urbana
Ha apoyado consistentemente:
- Reformas de mercado
- Reducción del déficit fiscal
- Políticas de seguridad duras'
);

-- Frente de Izquierda
INSERT INTO candidates (full_name, party_id, position_type, province, list_order, biography, key_proposals, voting_history) VALUES
(
  'Nicolás Del Caño',
  (SELECT id FROM political_parties WHERE acronym = 'FIT'),
  'Diputado Nacional',
  'Buenos Aires',
  1,
  'Diputado nacional (2013-2017, 2021-2025). Dirigente del Partido de los Trabajadores Socialistas (PTS). Referente de la izquierda trotskista argentina. Candidato presidencial en 2015 y 2019.',
  '• No pago de la deuda externa
• Nacionalización de bancos y comercio exterior
• Salario mínimo igual a la canasta familiar
• Reparto de las horas de trabajo sin reducción salarial
• Estatización bajo control obrero de empresas estratégicas
• Reforma agraria
• Rechazo total al FMI y organismos internacionales',
  'Como diputado ha votado a favor de:
- Legalización del aborto
- Impuesto a las grandes fortunas
- Derechos laborales
- Aumentos salariales
Ha votado en contra de:
- Todos los acuerdos con el FMI
- Reformas laborales y previsionales
- Tarifazos de servicios públicos
- Represión a protestas sociales
- Leyes de seguridad restrictivas'
);
