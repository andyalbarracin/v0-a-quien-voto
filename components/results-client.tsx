// components/results-client.tsx
// Ruta: components/results-client.tsx
// Última modificación: October 03, 2025
// Descripción: Cliente de resultados con diseño en cards, brújula política, matches/conflictos, ejemplos internacionales y análisis detallado.

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Globe } from "lucide-react"

interface ResultsClientProps {
  results: Array<{
    party: {
      id: string
      name: string
      acronym?: string
      description?: string
      ideology?: string
      economic_axis?: number
      social_axis?: number
      international_examples?: string | any[]
      color?: string
    }
    percentage: number
    compassDistance: number
    declarations: Array<{ date: string; text: string }>
    votes: Array<{ date: string; desc: string; contradiction: string | null }>
    antecedentes: string[]
    analysis: string
    matches: Array<{ position: string; topic: string }>
    conflicts: Array<{ position: string; topic: string }>
  }>
  userAnswers: Array<{ position_id: string; position_weight: number; question_weight: number }>
  userCompassPosition: { economic: number; social: number }
}

export function ResultsClient({ results, userCompassPosition }: ResultsClientProps) {
  const [expandedParty, setExpandedParty] = useState<string | null>(null)
  const [showInternational, setShowInternational] = useState<string | null>(null)

  const toggleDetails = (partyId: string) => {
    setExpandedParty(expandedParty === partyId ? null : partyId)
  }

  const toggleInternational = (partyId: string) => {
    setShowInternational(showInternational === partyId ? null : partyId)
  }

  const parseInternationalExamples = (examples: string | any[] | undefined) => {
    if (!examples) return []
    if (Array.isArray(examples)) return examples
    try {
      return JSON.parse(examples)
    } catch {
      return []
    }
  }

  const topMatch = results[0]

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Tus Resultados</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Basado en tus respuestas, estos son los partidos que mejor se alinean con tus valores
          </p>
          <Badge variant="secondary" className="mt-4">
            Tu perfil ideológico: Centrista
          </Badge>
        </div>

        {/* Brújula Política */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Brújula Política</CardTitle>
            <CardDescription>Tu posición ideológica comparada con los partidos políticos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 w-full border-2 border-border">
              {/* Ejes */}
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border" />
              
              {/* Labels */}
              <div className="absolute left-1/2 top-2 -translate-x-1/2 text-xs text-muted-foreground">
                Liberal / Progresista
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                Socialista / Estatista
              </div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                Izquierda
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                Derecha
              </div>

              {/* Tu posición */}
              <div
                className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/20"
                style={{
                  left: `${((userCompassPosition.economic + 10) / 20) * 100}%`,
                  top: `${((10 - userCompassPosition.social) / 20) * 100}%`,
                }}
                title="Tu posición"
              />

              {/* Partidos */}
              {results.map((result) => {
                const economicAxis = Number(result.party.economic_axis) || 0
                const socialAxis = Number(result.party.social_axis) || 0
                return (
                  <div
                    key={result.party.id}
                    className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground hover:ring-2 hover:ring-primary"
                    style={{
                      left: `${((economicAxis + 10) / 20) * 100}%`,
                      top: `${((10 - socialAxis) / 20) * 100}%`,
                    }}
                    title={`${result.party.name} (${result.party.acronym})`}
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>

        {topMatch && (
          <Card className="mb-8 border-2 border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="mb-2">Mayor afinidad</Badge>
                  <CardTitle className="text-3xl">{topMatch.party.name}</CardTitle>
                  <CardDescription className="mt-2">
                    Distancia ideológica: {topMatch.compassDistance.toFixed(2)} puntos
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-primary">{topMatch.percentage}%</div>
                  <p className="text-sm text-muted-foreground">de afinidad</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">Nivel de coincidencia</span>
                  <span className="text-muted-foreground">{topMatch.percentage}%</span>
                </div>
                <Progress value={topMatch.percentage} className="h-3" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    Coincidencias ({topMatch.matches.length})
                  </h4>
                  {topMatch.matches.length > 0 ? (
                    <ul className="space-y-1 text-sm">
                      {topMatch.matches.slice(0, 3).map((match, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          • {match.position}
                        </li>
                      ))}
                      {topMatch.matches.length > 3 && (
                        <li className="text-muted-foreground">
                          ... y {topMatch.matches.length - 3} más
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No hay coincidencias registradas</p>
                  )}
                </div>

                <div>
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-red-600">
                    <XCircle className="h-5 w-5" />
                    Conflictos ({topMatch.conflicts.length})
                  </h4>
                  {topMatch.conflicts.length > 0 ? (
                    <ul className="space-y-1 text-sm">
                      {topMatch.conflicts.slice(0, 3).map((conflict, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          • {conflict.position}
                        </li>
                      ))}
                      {topMatch.conflicts.length > 3 && (
                        <li className="text-muted-foreground">
                          ... y {topMatch.conflicts.length - 3} más
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No hay conflictos registrados</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button onClick={() => toggleDetails(topMatch.party.id)}>
                  {expandedParty === topMatch.party.id ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Ocultar detalles
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" />
                      Mostrar detalles
                    </>
                  )}
                </Button>
                {topMatch.party.international_examples && (
                  <Button variant="outline" onClick={() => toggleInternational(topMatch.party.id)}>
                    <Globe className="mr-2 h-4 w-4" />
                    Ejemplos Internacionales
                  </Button>
                )}
              </div>

              {expandedParty === topMatch.party.id && (
                <div className="mt-6 space-y-4 rounded-lg bg-muted p-4">
                  <div>
                    <h5 className="mb-2 font-semibold">Análisis con Benchmarks</h5>
                    <p className="text-sm text-muted-foreground">
                      {topMatch.analysis || "Análisis en desarrollo. Próximamente más información sobre este partido."}
                    </p>
                  </div>

                  {topMatch.declarations.length > 0 && (
                    <div>
                      <h5 className="mb-2 font-semibold">Declaraciones Públicas</h5>
                      <ul className="space-y-2">
                        {topMatch.declarations.map((d, idx) => (
                          <li key={idx} className="text-sm">
                            <span className="font-medium">{d.date}:</span> {d.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {topMatch.votes.length > 0 && (
                    <div>
                      <h5 className="mb-2 font-semibold">Historial de Votaciones</h5>
                      <ul className="space-y-2">
                        {topMatch.votes.map((v, idx) => (
                          <li key={idx} className="text-sm">
                            <span className="font-medium">{v.date}:</span> {v.desc}
                            {v.contradiction && (
                              <span className="ml-2 text-red-600">⚠️ {v.contradiction}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {topMatch.antecedentes.length > 0 && (
                    <div>
                      <h5 className="mb-2 font-semibold">Antecedentes</h5>
                      <ul className="space-y-1">
                        {topMatch.antecedentes.map((a, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            • {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {showInternational === topMatch.party.id && topMatch.party.international_examples && (
                <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                  <h5 className="mb-3 font-semibold">Ejemplos Internacionales</h5>
                  {parseInternationalExamples(topMatch.party.international_examples).map((example: any, idx: number) => (
                    <div key={idx} className="mb-4 border-l-4 border-blue-500 pl-4 last:mb-0">
                      <h6 className="font-semibold">
                        {example.country} ({example.period})
                      </h6>
                      <div className="mt-2 space-y-1 text-sm">
                        <p>
                          <strong>Economía:</strong> {example.results.economy}
                        </p>
                        <p>
                          <strong>Educación:</strong> {example.results.education}
                        </p>
                        <p>
                          <strong>Calidad de vida:</strong> {example.results.quality_of_life}
                        </p>
                        <p className="italic text-muted-foreground">{example.policies}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <h2 className="mb-6 text-2xl font-bold">Todos los resultados</h2>
        <div className="space-y-4">
          {results.slice(1).map((result) => (
            <Card key={result.party.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{result.party.name}</CardTitle>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{result.percentage}%</div>
                    <p className="text-xs text-muted-foreground">afinidad</p>
                  </div>
                </div>
                <CardDescription>Distancia ideológica: {result.compassDistance.toFixed(2)} puntos</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={result.percentage} className="mb-4 h-2" />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toggleDetails(result.party.id)}>
                    Ver detalles
                  </Button>
                  {result.party.international_examples && (
                    <Button size="sm" variant="outline" onClick={() => toggleInternational(result.party.id)}>
                      <Globe className="mr-2 h-4 w-4" />
                      Ejemplos
                    </Button>
                  )}
                </div>

                {expandedParty === result.party.id && (
                  <div className="mt-4 space-y-3 rounded-lg bg-muted p-4 text-sm">
                    {result.analysis && (
                      <p className="text-muted-foreground">{result.analysis}</p>
                    )}
                    {result.declarations.length > 0 && (
                      <div>
                        <strong>Declaraciones:</strong>
                        <ul className="mt-1 space-y-1">
                          {result.declarations.slice(0, 2).map((d, idx) => (
                            <li key={idx}>{d.date}: {d.text}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {!result.analysis && result.declarations.length === 0 && (
                      <p className="text-muted-foreground">Información detallada próximamente.</p>
                    )}
                  </div>
                )}

                {showInternational === result.party.id && result.party.international_examples && (
                  <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                    {parseInternationalExamples(result.party.international_examples).map((example: any, idx: number) => (
                      <div key={idx} className="mb-3 text-sm last:mb-0">
                        <strong>{example.country}</strong>: {example.results.economy}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}