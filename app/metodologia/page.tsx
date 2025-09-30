import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Database, Scale, Shield } from "lucide-react"

export default function MetodologiaPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">Nuestra Metodología</h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Cómo calculamos tus resultados y de dónde proviene nuestra información
          </p>
        </div>

        {/* How it Works */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">¿Cómo funciona el algoritmo?</h2>
          <Card>
            <CardContent className="pt-6">
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Recopilación de respuestas</h3>
                    <p className="mt-1 text-muted-foreground">
                      Cada respuesta que seleccionás está vinculada a una posición política específica sobre un tema
                      (economía, seguridad, salud, etc.).
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Ponderación por importancia</h3>
                    <p className="mt-1 text-muted-foreground">
                      Cada posición tiene un peso según su relevancia histórica y impacto social. Por ejemplo, temas
                      como seguridad y economía tienen mayor peso debido a su importancia en el contexto argentino.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Comparación con votaciones reales</h3>
                    <p className="mt-1 text-muted-foreground">
                      Comparamos tus posiciones con el historial de votaciones de candidatos y las declaraciones
                      públicas verificadas de cada partido político.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Cálculo de afinidad</h3>
                    <p className="mt-1 text-muted-foreground">
                      Calculamos un porcentaje de afinidad basado en cuántas de tus posiciones coinciden con las
                      acciones y declaraciones de cada partido, ponderado por la importancia de cada tema.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Data Sources */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Fuentes de Información</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <Database className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Registros Oficiales</CardTitle>
                <CardDescription>Datos verificables de fuentes gubernamentales</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>Honorable Cámara de Diputados - Votaciones nominales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>Honorable Senado de la Nación - Registros legislativos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>Boletín Oficial - Leyes y decretos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>Dirección Nacional Electoral</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Verificación de Datos</CardTitle>
                <CardDescription>Fact-checking y medios confiables</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>Chequeado.com - Verificación de declaraciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>Agencia Télam - Declaraciones oficiales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>Medios nacionales - Entrevistas y debates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>Plataformas de seguimiento legislativo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Transparency */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Transparencia y Objetividad</h2>
          <Card>
            <CardHeader>
              <Scale className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Nuestro Compromiso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Neutralidad Política</h3>
                <p className="text-muted-foreground">
                  No estamos afiliados a ningún partido político. Nuestro objetivo es proporcionar información objetiva
                  basada en hechos verificables.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Fuentes Citadas</h3>
                <p className="text-muted-foreground">
                  Cada votación y declaración incluye un enlace a la fuente original para que puedas verificar la
                  información por tu cuenta.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Actualización Continua</h3>
                <p className="text-muted-foreground">
                  Actualizamos nuestra base de datos regularmente con nuevas votaciones y declaraciones públicas para
                  mantener la información relevante.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Privacidad</h3>
                <p className="text-muted-foreground">
                  Tus respuestas son anónimas. No recopilamos información personal y no compartimos tus resultados con
                  terceros.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">Limitaciones</h2>
          <Card className="border-muted bg-muted/30">
            <CardContent className="pt-6">
              <p className="mb-4 text-muted-foreground">
                Es importante entender que este test es una herramienta orientativa y tiene limitaciones:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  <span>
                    No puede capturar toda la complejidad de las posiciones políticas en un cuestionario breve
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  <span>Las posiciones políticas pueden cambiar con el tiempo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  <span>Algunos candidatos pueden tener historial limitado de votaciones o declaraciones públicas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  <span>Te recomendamos usar estos resultados como punto de partida para tu propia investigación</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
