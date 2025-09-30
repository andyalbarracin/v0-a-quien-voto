"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  CheckCircle2,
  XCircle,
  Share2,
  RotateCcw,
  ExternalLink,
  Globe,
  TrendingUp,
  GraduationCap,
  Heart,
  Compass,
} from "lucide-react"
import { useState } from "react"
import { PoliticalCompass } from "@/components/political-compass"
import { getIdeologyLabel, type CompassPosition } from "@/lib/calculate-compass-position"

type InternationalExample = {
  country: string
  period: string
  policies: string
  results: {
    economy: string
    education: string
    quality_of_life: string
  }
}

type PartyResult = {
  party: {
    id: string
    name: string
    acronym: string
    description: string
    ideology: string
    color?: string
    economic_axis?: number
    social_axis?: number
    international_examples?: InternationalExample[]
  }
  percentage: number
  matches: Array<{ position: string; topic: string }>
  conflicts: Array<{ position: string; topic: string }>
  compassDistance?: number
}

export function ResultsClient({
  results,
  userAnswers,
  userCompassPosition,
}: {
  results: PartyResult[]
  userAnswers: unknown
  userCompassPosition?: CompassPosition
}) {
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({})

  const toggleDetails = (partyId: string) => {
    setShowDetails((prev) => ({
      ...prev,
      [partyId]: !prev[partyId],
    }))
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mis resultados - ¿A quién voto?",
          text: `Descubrí qué partidos se alinean con mis valores en "¿A quién voto?"`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("[v0] Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Enlace copiado al portapapeles")
    }
  }

  const topMatch = results[0]

  const partiesForCompass = results
    .filter((r) => r.party.economic_axis !== undefined && r.party.social_axis !== undefined)
    .map((r) => ({
      id: r.party.id,
      name: r.party.name,
      acronym: r.party.acronym,
      color: r.party.color || "#6B7280",
      economic_axis: r.party.economic_axis!,
      social_axis: r.party.social_axis!,
    }))

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">Tus Resultados</h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Basado en tus respuestas, estos son los partidos que mejor se alinean con tus valores
          </p>
          {userCompassPosition && (
            <Badge variant="outline" className="mt-4 text-base">
              <Compass className="mr-2 h-4 w-4" />
              Tu perfil ideológico: {getIdeologyLabel(userCompassPosition)}
            </Badge>
          )}
        </div>

        {userCompassPosition && partiesForCompass.length > 0 && (
          <div className="mb-8">
            <PoliticalCompass
              userPosition={userCompassPosition}
              parties={partiesForCompass}
              highlightedPartyId={topMatch?.party.id}
            />
          </div>
        )}

        {/* Top Match Highlight */}
        {topMatch && (
          <Card className="mb-8 border-2 border-primary bg-primary/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Badge variant="default" className="mb-2">
                    Mayor afinidad
                  </Badge>
                  <CardTitle className="text-3xl">{topMatch.party.name}</CardTitle>
                  <CardDescription className="mt-2 text-base">
                    <Badge variant="secondary" className="mr-2">
                      {topMatch.party.acronym}
                    </Badge>
                    {topMatch.party.ideology && <Badge variant="outline">{topMatch.party.ideology}</Badge>}
                  </CardDescription>
                  {topMatch.compassDistance !== undefined && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Distancia ideológica: {topMatch.compassDistance.toFixed(1)} puntos
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-primary">{topMatch.percentage}%</div>
                  <div className="text-sm text-muted-foreground">de afinidad</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-pretty text-muted-foreground">{topMatch.party.description}</p>

              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Resumen</TabsTrigger>
                  <TabsTrigger value="international">
                    <Globe className="mr-2 h-4 w-4" />
                    Ejemplos Internacionales
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link href={`/partidos/${topMatch.party.id}`}>
                        Ver perfil completo
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={() => toggleDetails(topMatch.party.id)}>
                      {showDetails[topMatch.party.id] ? "Ocultar detalles" : "Ver detalles"}
                    </Button>
                  </div>

                  {showDetails[topMatch.party.id] && (
                    <div className="space-y-4">
                      <Separator />
                      {topMatch.matches.length > 0 && (
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            Coincidencias ({topMatch.matches.length})
                          </h4>
                          <div className="space-y-2">
                            {topMatch.matches.slice(0, 5).map((match, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <Badge variant="outline" className="shrink-0">
                                  {match.topic}
                                </Badge>
                                <span className="text-muted-foreground">{match.position}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {topMatch.conflicts.length > 0 && (
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <XCircle className="h-5 w-5 text-destructive" />
                            Diferencias ({topMatch.conflicts.length})
                          </h4>
                          <div className="space-y-2">
                            {topMatch.conflicts.slice(0, 5).map((conflict, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <Badge variant="outline" className="shrink-0">
                                  {conflict.topic}
                                </Badge>
                                <span className="text-muted-foreground">{conflict.position}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="international" className="space-y-6">
                  {topMatch.party.international_examples && topMatch.party.international_examples.length > 0 ? (
                    <>
                      <p className="text-pretty text-sm text-muted-foreground">
                        Países que implementaron políticas similares a las propuestas por {topMatch.party.name}:
                      </p>
                      {topMatch.party.international_examples.map((example, idx) => (
                        <Card key={idx} className="border-muted">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                              <Globe className="h-5 w-5 text-primary" />
                              {example.country}
                            </CardTitle>
                            <CardDescription>Período: {example.period}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h5 className="mb-2 font-semibold text-foreground">Políticas Implementadas</h5>
                              <p className="text-pretty text-sm text-muted-foreground">{example.policies}</p>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                              <h5 className="font-semibold text-foreground">Resultados</h5>

                              <div className="flex items-start gap-3">
                                <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                <div>
                                  <p className="font-medium text-foreground">Economía</p>
                                  <p className="text-pretty text-sm text-muted-foreground">{example.results.economy}</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" />
                                <div>
                                  <p className="font-medium text-foreground">Educación</p>
                                  <p className="text-pretty text-sm text-muted-foreground">
                                    {example.results.education}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <Heart className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                                <div>
                                  <p className="font-medium text-foreground">Calidad de Vida</p>
                                  <p className="text-pretty text-sm text-muted-foreground">
                                    {example.results.quality_of_life}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
                        <p className="text-pretty text-sm text-amber-900 dark:text-amber-100">
                          <strong>Nota:</strong> Los contextos históricos, culturales y económicos de cada país son
                          únicos. Estos ejemplos son orientativos y no garantizan resultados idénticos en Argentina.
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      No hay ejemplos internacionales disponibles para este partido.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* All Results */}
        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Todos los resultados</h2>
          <div className="space-y-4">
            {results.slice(1).map((result) => (
              <Card key={result.party.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{result.party.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <Badge variant="secondary" className="mr-2">
                          {result.party.acronym}
                        </Badge>
                        {result.party.ideology && <Badge variant="outline">{result.party.ideology}</Badge>}
                      </CardDescription>
                      {result.compassDistance !== undefined && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Distancia ideológica: {result.compassDistance.toFixed(1)} puntos
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-foreground">{result.percentage}%</div>
                      <div className="text-xs text-muted-foreground">afinidad</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={result.percentage} className="mb-4 h-3" />
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/partidos/${result.party.id}`}>Ver perfil</Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => toggleDetails(result.party.id)}>
                      {showDetails[result.party.id] ? "Ocultar" : "Ver"} detalles
                    </Button>
                  </div>

                  {showDetails[result.party.id] && (
                    <div className="mt-6 space-y-4">
                      <Separator />
                      {result.matches.length > 0 && (
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            Coincidencias ({result.matches.length})
                          </h4>
                          <div className="space-y-2">
                            {result.matches.slice(0, 3).map((match, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <Badge variant="outline" className="shrink-0 text-xs">
                                  {match.topic}
                                </Badge>
                                <span className="text-muted-foreground">{match.position}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {result.conflicts.length > 0 && (
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                            <XCircle className="h-4 w-4 text-destructive" />
                            Diferencias ({result.conflicts.length})
                          </h4>
                          <div className="space-y-2">
                            {result.conflicts.slice(0, 3).map((conflict, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <Badge variant="outline" className="shrink-0 text-xs">
                                  {conflict.topic}
                                </Badge>
                                <span className="text-muted-foreground">{conflict.position}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions */}
        <Card>
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
              <Button asChild size="lg">
                <Link href="/quiz">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Hacer el test nuevamente
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartir resultados
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-8 border-muted bg-muted/30">
          <CardContent className="py-6">
            <p className="text-pretty text-center text-sm text-muted-foreground">
              Estos resultados son orientativos y se basan en votaciones y declaraciones públicas verificables. Te
              recomendamos investigar más sobre cada partido y candidato antes de tomar tu decisión final. Los ejemplos
              internacionales son referenciales y no garantizan resultados idénticos en Argentina.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
