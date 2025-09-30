import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default async function CandidatosPage() {
  const supabase = await createClient()

  const { data: candidates, error } = await supabase
    .from("candidates")
    .select(
      `
      *,
      political_parties (
        name,
        acronym
      )
    `,
    )
    .order("full_name", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching candidates:", error)
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">Candidatos</h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Conocé a los candidatos, sus trayectorias políticas y sus posiciones sobre temas importantes.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {candidates?.map((candidate) => (
            <Link key={candidate.id} href={`/candidatos/${candidate.id}`}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={candidate.photo_url || undefined} alt={candidate.full_name} />
                      <AvatarFallback className="text-lg">
                        {candidate.full_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{candidate.full_name}</CardTitle>
                      <CardDescription className="mt-1">
                        {candidate.position && <div>{candidate.position}</div>}
                        {candidate.political_parties && (
                          <Badge variant="secondary" className="mt-2">
                            {candidate.political_parties.acronym}
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {candidate.bio && (
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{candidate.bio}</p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>

        {(!candidates || candidates.length === 0) && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No hay candidatos disponibles en este momento.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
