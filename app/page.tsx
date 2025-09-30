import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, TrendingUp, Heart, GraduationCap, Scale, Briefcase } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            ¿A quién voto?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Descubrí qué candidatos y partidos políticos se alinean con tus valores. Respondé preguntas sobre temas que
            te importan y obtené resultados basados en datos reales.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/quiz">
                Comenzar el test
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              <Link href="/partidos">Ver partidos políticos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Temas que importan
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              Evaluamos las posiciones de candidatos y partidos en los temas más relevantes para Argentina
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary" />
                <CardTitle className="mt-4">Economía</CardTitle>
                <CardDescription>Políticas económicas, gasto público, inflación y desarrollo</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary" />
                <CardTitle className="mt-4">Seguridad</CardTitle>
                <CardDescription>
                  Políticas de seguridad ciudadana, sistema penal y fuerzas de seguridad
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-8 w-8 text-primary" />
                <CardTitle className="mt-4">Salud</CardTitle>
                <CardDescription>Sistema de salud pública, cobertura médica y políticas sanitarias</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-8 w-8 text-primary" />
                <CardTitle className="mt-4">Educación</CardTitle>
                <CardDescription>Sistema educativo, universidades y presupuesto educativo</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Scale className="h-8 w-8 text-primary" />
                <CardTitle className="mt-4">Justicia</CardTitle>
                <CardDescription>Sistema judicial, derechos humanos y reformas legales</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="h-8 w-8 text-primary" />
                <CardTitle className="mt-4">Trabajo</CardTitle>
                <CardDescription>Políticas laborales, sindicatos y empleo</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="border-t bg-muted/30 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              ¿Cómo funciona?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              Un proceso simple y transparente para ayudarte a tomar decisiones informadas
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">Respondé el cuestionario</h3>
              <p className="mt-2 text-pretty text-muted-foreground">
                Contestá preguntas sobre temas de economía, seguridad, salud, educación y más
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">Analizamos tus respuestas</h3>
              <p className="mt-2 text-pretty text-muted-foreground">
                Comparamos tus posiciones con votaciones y declaraciones públicas verificables
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">Obtené tus resultados</h3>
              <p className="mt-2 text-pretty text-muted-foreground">
                Descubrí qué partidos se alinean mejor con tus valores y por qué
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/quiz">
                Comenzar ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="border-t px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Información verificable y transparente
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Todos nuestros datos provienen de fuentes oficiales: registros de votación del Congreso, declaraciones
            públicas verificadas y posiciones documentadas. Cada resultado incluye referencias a las fuentes originales
            para que puedas verificar la información.
          </p>
          <div className="mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/metodologia">Conocé nuestra metodología</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
