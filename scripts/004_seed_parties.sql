-- Insert main political parties in Argentina
INSERT INTO public.political_parties (name, acronym, description, ideology) VALUES
  ('La Libertad Avanza', 'LLA', 'Partido libertario liderado por Javier Milei', 'Libertarismo'),
  ('Juntos por el Cambio', 'JxC', 'Coalición de centro-derecha', 'Centro-derecha'),
  ('Unión por la Patria', 'UP', 'Coalición peronista de centro-izquierda', 'Peronismo'),
  ('Frente de Izquierda y de Trabajadores', 'FIT', 'Coalición de partidos de izquierda', 'Izquierda'),
  ('Hacemos por Nuestro País', 'HNP', 'Partido de centro', 'Centro')
ON CONFLICT (name) DO NOTHING;
