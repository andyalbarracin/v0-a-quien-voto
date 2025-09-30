import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"
import { ExternalLink, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default async function PartyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch party details
  const { data: party, error: partyError } = await supabase.from("political_parties").select("*").eq("id", id).single()

  if (partyError || !party) {
    notFound()
  }

  const { data: candidates } = await supabase
    .from("candidates")
    .select("*")
    .eq("party_id", id)
    .order("list_position", { ascending: true })

  // Fetch public statements from this party
  const { data: statements } = await supabase
    .from("public_statements")
    .select(
      `
      *,
      positions (
        title,
        description,
        topics (name)
      )
    `,
    )
    .eq("party_id", id)
    .order("statement_date", { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Party Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <Badge
              variant="secondary"
              className="text-base"
              style={{
                backgroundColor: party.color ? `${party.color}20` : undefined,
                borderColor: party.color || undefined,
              }}
            >
              {party.acronym}
            </Badge>
            {party.ideology && <Badge variant="outline">{party.ideology}</Badge>}
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">{party.name}</h1>
          {party.description && <p className="mt-4 text-pretty text-lg text-muted-foreground">{party.description}</p>}

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
            {party.founded_year && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Fundado en {party.founded_year}</span>
              </div>
            )}
            {candidates && candidates.length > 0 && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {candidates.length} {candidates.length === 1 ? "candidato" : "candidatos"}
                </span>
              </div>
            )}
            {party.website && (
              <a
                href={party.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Sitio web oficial</span>
              </a>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Candidates Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Candidatos 2025</h2>
          {candidates && candidates.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {candidates.map((candidate) => (
                <Link key={candidate.id} href={`/candidatos/${candidate.id}`}>
                  <Card className="transition-colors hover:border-primary">
                    <CardHeader>
                      {candidate.list_position && (
                        <Badge variant="outline" className="mb-2 w-fit">
                          #{candidate.list_position}
                        </Badge>
                      )}
                      <CardTitle>{candidate.full_name}</CardTitle>
                      {candidate.position && candidate.province && (
                        <CardDescription>
                          {candidate.position} - {candidate.province}
                        </CardDescription>
                      )}
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No hay candidatos registrados para este partido.
              </CardContent>
            </Card>
          )}
        </section>

        {/* Public Statements Section */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">Declaraciones Públicas</h2>
          {statements && statements.length > 0 ? (
            <div className="space-y-4">
              {statements.map((statement) => (
                <Card key={statement.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {statement.positions && (
                          <Badge variant="outline" className="mb-2">
                            {statement.positions.topics?.name}
                          </Badge>
                        )}
                        <CardDescription className="text-base text-foreground">
                          {statement.statement_text}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {statement.statement_date && (
                        <span>{new Date(statement.statement_date).toLocaleDateString("es-AR")}</span>
                      )}
                      {statement.source_type && <Badge variant="secondary">{statement.source_type}</Badge>}
                      {statement.verified && (
                        <Badge variant="default" className="bg-green-600">
                          Verificado
                        </Badge>
                      )}
                      {statement.source_url && (
                        <a
                          href={statement.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Fuente</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No hay declaraciones públicas registradas para este partido.
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}
