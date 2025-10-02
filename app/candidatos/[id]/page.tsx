import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"
import { ExternalLink, Building2 } from "lucide-react"
import Link from "next/link"

export default async function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch candidate details
  const { data: candidate, error: candidateError } = await supabase
    .from("candidates")
    .select(
      `
      *,
      political_parties (
        id,
        name,
        acronym,
        ideology
      )
    `,
    )
    .eq("id", id)
    .single()

  if (candidateError || !candidate) {
    notFound()
  }

  // Fetch voting records
  const { data: votingRecords } = await supabase
    .from("voting_records")
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
    .eq("candidate_id", id)
    .order("vote_date", { ascending: false })

  // Fetch public statements
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
    .eq("candidate_id", id)
    .order("statement_date", { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Candidate Header */}
        <div className="mb-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={candidate.photo_url || undefined} alt={candidate.full_name} />
              <AvatarFallback className="text-2xl">
                {candidate.full_name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">{candidate.full_name}</h1>
              {candidate.position && candidate.province && (
                <p className="mt-2 text-lg text-muted-foreground">
                  Candidato a {candidate.position} por {candidate.province}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-4">
                {candidate.political_parties && (
                  <Link href={`/partidos/${candidate.political_parties.id}`}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                      <Building2 className="mr-1 h-3 w-3" />
                      {candidate.political_parties.name}
                    </Badge>
                  </Link>
                )}
                {candidate.political_parties?.ideology && (
                  <Badge variant="outline">{candidate.political_parties.ideology}</Badge>
                )}
                {candidate.list_position && (
                  <Badge variant="outline">Posición #{candidate.list_position} en la lista</Badge>
                )}
                {candidate.wikipedia_url && (
                  <a
                    href={candidate.wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Wikipedia</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {candidate.criminal_record && candidate.political_parties?.acronym === "UP" && (
            <div className="mt-6 rounded-lg border-2 border-red-600 bg-red-50 p-4 dark:bg-red-950">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-red-900 dark:text-red-100">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Antecedentes Cuestionables
              </h3>
              <p className="whitespace-pre-line text-sm text-red-900 dark:text-red-100">{candidate.criminal_record}</p>
            </div>
          )}

          {candidate.bio && (
            <div className="mt-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground">Biografía</h3>
              <p className="text-pretty text-muted-foreground">{candidate.bio}</p>
            </div>
          )}
        </div>

        <Separator className="my-8" />

        {/* Key Proposals Section */}
        {candidate.key_proposals && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Propuestas Clave</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="whitespace-pre-line text-muted-foreground">{candidate.key_proposals}</div>
              </CardContent>
            </Card>
          </section>
        )}

        {candidate.voting_analysis && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Análisis de Historial de Votaciones</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="whitespace-pre-line text-muted-foreground">{candidate.voting_analysis}</div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Voting Records Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Historial de Votaciones Detallado</h2>
          {votingRecords && votingRecords.length > 0 ? (
            <div className="space-y-4">
              {votingRecords.map((record) => (
                <Card key={record.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {record.positions && (
                          <Badge variant="outline" className="mb-2">
                            {record.positions.topics?.name}
                          </Badge>
                        )}
                        <CardTitle className="text-lg">{record.bill_name || "Votación legislativa"}</CardTitle>
                        {record.positions && (
                          <CardDescription className="mt-2">{record.positions.title}</CardDescription>
                        )}
                      </div>
                      <Badge
                        variant={
                          record.vote_type === "favor"
                            ? "default"
                            : record.vote_type === "contra"
                              ? "destructive"
                              : "secondary"
                        }
                        className="shrink-0"
                      >
                        {record.vote_type === "favor"
                          ? "A favor"
                          : record.vote_type === "contra"
                            ? "En contra"
                            : "Abstención"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {record.vote_date && <span>{new Date(record.vote_date).toLocaleDateString("es-AR")}</span>}
                      {record.legislative_session && <span>Sesión: {record.legislative_session}</span>}
                      {record.source_url && (
                        <a
                          href={record.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Ver fuente oficial</span>
                        </a>
                      )}
                    </div>
                    {record.notes && <p className="mt-3 text-sm text-muted-foreground">{record.notes}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Los registros detallados de votación se agregarán próximamente. Consulta el análisis de historial arriba
                para un resumen de las posiciones del candidato.
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
                          "{statement.statement_text}"
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
                Las declaraciones públicas detalladas se agregarán próximamente. Consulta las propuestas clave arriba
                para conocer las posiciones del candidato.
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}
