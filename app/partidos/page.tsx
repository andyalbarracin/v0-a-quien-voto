import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default async function PartidosPage() {
  const supabase = await createClient()

  const { data: parties, error } = await supabase
    .from("political_parties")
    .select(
      `
      *,
      candidates (count)
    `,
    )
    .order("name", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching parties:", error)
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">Partidos Políticos</h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Explorá los principales partidos políticos de Argentina, sus ideologías y posiciones sobre temas clave.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {parties?.map((party) => (
            <Link key={party.id} href={`/partidos/${party.id}`}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{party.name}</CardTitle>
                      <CardDescription className="mt-2">
                        <Badge variant="secondary">{party.acronym}</Badge>
                        {party.ideology && (
                          <Badge variant="outline" className="ml-2">
                            {party.ideology}
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{party.description || "Sin descripción disponible"}</p>
                  {party.founded_year && (
                    <p className="mt-4 text-sm text-muted-foreground">Fundado en {party.founded_year}</p>
                  )}
                  {party.website_url && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-primary">
                      <ExternalLink className="h-4 w-4" />
                      <span>Sitio web oficial</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {(!parties || parties.length === 0) && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No hay partidos políticos disponibles en este momento.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
