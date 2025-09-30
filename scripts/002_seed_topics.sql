-- Insert main topics
INSERT INTO public.topics (name, description, icon) VALUES
  ('Economía', 'Políticas económicas, impuestos, gasto público, inflación', 'TrendingUp'),
  ('Seguridad', 'Políticas de seguridad ciudadana, fuerzas de seguridad, sistema penal', 'Shield'),
  ('Salud', 'Sistema de salud pública, cobertura médica, políticas sanitarias', 'Heart'),
  ('Educación', 'Sistema educativo, universidades, presupuesto educativo', 'GraduationCap'),
  ('Justicia', 'Sistema judicial, derechos humanos, reformas legales', 'Scale'),
  ('Trabajo', 'Políticas laborales, sindicatos, empleo', 'Briefcase')
ON CONFLICT (name) DO NOTHING;
