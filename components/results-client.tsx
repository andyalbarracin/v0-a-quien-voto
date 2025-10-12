// components/results-client.tsx
// Versión completa con sistema de compartir en redes sociales

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Globe, TrendingUp, Users } from "lucide-react"
import { ShareResultCard } from "@/components/share-result-card"

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
    votes: Array<{ date: string; text: string }>
    antecedentes: any[]
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
  const [hoveredParty, setHoveredParty] = useState<string | null>(null)
  const [expandedMatches, setExpandedMatches] = useState<Set<string>>(new Set())
  const [expandedConflicts, setExpandedConflicts] = useState<Set<string>>(new Set())

  const toggleDetails = (partyId: string) => {
    setExpandedParty(expandedParty === partyId ? null : partyId)
  }

  const toggleInternational = (partyId: string) => {
    setShowInternational(showInternational === partyId ? null : partyId)
  }

  const toggleMatches = (partyId: string) => {
    setExpandedMatches(prev => {
      const newSet = new Set(prev)
      if (newSet.has(partyId)) {
        newSet.delete(partyId)
      } else {
        newSet.add(partyId)
      }
      return newSet
    })
  }

  const toggleConflicts = (partyId: string) => {
    setExpandedConflicts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(partyId)) {
        newSet.delete(partyId)
      } else {
        newSet.add(partyId)
      }
      return newSet
    })
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

  const getIdeologicalProfile = () => {
    const { economic, social } = userCompassPosition
    
    let economicLabel = ""
    if (economic < -7) economicLabel = "Estatismo Fuerte"
    else if (economic < -4) economicLabel = "Centroizquierda Económica"
    else if (economic < -1) economicLabel = "Socialdemocracia"
    else if (economic > 7) economicLabel = "Liberalismo Económico"
    else if (economic > 4) economicLabel = "Centroderecha Económica"
    else if (economic > 1) economicLabel = "Liberal Moderado"
    else economicLabel = "Centro Económico"

    let socialLabel = ""
    if (social > 7) socialLabel = "Progresismo"
    else if (social > 4) socialLabel = "Liberal Social"
    else if (social > 1) socialLabel = "Centro-Liberal"
    else if (social < -7) socialLabel = "Conservadurismo"
    else if (social < -4) socialLabel = "Conservador Moderado"
    else if (social < -1) socialLabel = "Centro-Conservador"
    else socialLabel = "Centro Social"

    if (Math.abs(economic) < 1.5 && Math.abs(social) < 1.5) {
      return "Centrista"
    }

    return `${economicLabel} / ${socialLabel}`
  }

  // Componente reutilizable para mostrar matches/conflicts con expansión
  const MatchConflictList = ({ 
    items, 
    type, 
    partyId, 
    isTopMatch 
  }: { 
    items: Array<{ position: string; topic: string }>
    type: 'match' | 'conflict'
    partyId: string
    isTopMatch: boolean
  }) => {
    const isExpanded = type === 'match' 
      ? expandedMatches.has(partyId) 
      : expandedConflicts.has(partyId)
    
    const initialLimit = isTopMatch ? 5 : 3
    const displayedItems = isExpanded ? items : items.slice(0, initialLimit)
    const remainingCount = items.length - initialLimit

    const icon = type === 'match' ? CheckCircle2 : XCircle
    const colorClass = type === 'match' 
      ? "text-green-600 dark:text-green-400" 
      : "text-red-600 dark:text-red-400"
    const title = type === 'match' ? 'Coincidencias' : 'Conflictos'
    const Icon = icon

    return (
      <div>
        <h4 className={`mb-2 flex items-center gap-2 font-semibold ${colorClass}`}>
          <Icon className="h-5 w-5" />
          {title} ({items.length})
        </h4>
        {items.length > 0 ? (
          <>
            <ul className="space-y-1 text-sm">
              {displayedItems.map((item, idx) => (
                <li key={idx} className="text-muted-foreground">
                  • {item.position}
                </li>
              ))}
            </ul>
            {remainingCount > 0 && (
              <button
                onClick={() => type === 'match' ? toggleMatches(partyId) : toggleConflicts(partyId)}
                className="mt-2 text-sm text-primary hover:underline font-medium flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    Ver menos <ChevronUp className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    ... y {remainingCount} más <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </button>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">No hay {title.toLowerCase()} registradas</p>
        )}
      </div>
    )
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
          
          {/* Badge de perfil y botón de compartir */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <Badge variant="secondary" className="text-base px-4 py-2">
              Tu perfil ideológico: {getIdeologicalProfile()}
            </Badge>
            
            {topMatch && (
              <ShareResultCard
                partyName={topMatch.party.name}
                partyAcronym={topMatch.party.acronym || ''}
                percentage={topMatch.percentage}
                partyColor={topMatch.party.color || '#6b7280'}
                ideologicalProfile={getIdeologicalProfile()}
                economicPosition={userCompassPosition.economic}
                socialPosition={userCompassPosition.social}
              />
            )}
          </div>
        </div>

        {/* Brújula Política */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Brújula Política</CardTitle>
            <CardDescription>
              Eje X: Estatismo (izq.) → Liberalismo económico (der.) | 
              Eje Y: Liberalismo social (arriba) → Conservadurismo (abajo)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 w-full border-2 border-border rounded-lg bg-gradient-to-br from-muted/20 to-background">
              {/* Ejes */}
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border" />
              
              {/* Labels */}
              <div className="absolute left-1/2 top-2 -translate-x-1/2 text-xs font-semibold text-foreground bg-background px-2 rounded">
                Liberal Social / Progresista
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-semibold text-foreground bg-background px-2 rounded">
                Conservador
              </div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-foreground bg-background px-2 rounded">
                Estatismo
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-foreground bg-background px-2 rounded">
                Liberalismo
              </div>

              {/* Tu posición */}
              <div
                className="absolute z-10 flex items-center justify-center h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/30 font-bold text-xs text-primary-foreground"
                style={{
                  left: `${((userCompassPosition.economic + 10) / 20) * 100}%`,
                  top: `${((10 - userCompassPosition.social) / 20) * 100}%`,
                }}
                title="Tu posición"
              >
                T
              </div>

              {/* Partidos */}
              {results.map((result) => {
                const economicAxis = Number(result.party.economic_axis) || 0
                const socialAxis = Number(result.party.social_axis) || 0
                const isHovered = hoveredParty === result.party.id
                
                return (
                  <div key={result.party.id} className="absolute -translate-x-1/2 -translate-y-1/2 z-5"
                    style={{
                      left: `${((economicAxis + 10) / 20) * 100}%`,
                      top: `${((10 - socialAxis) / 20) * 100}%`,
                    }}
                  >
                    <div
                      className={`rounded-full transition-all cursor-pointer border-2 border-white ${
                        isHovered ? 'h-5 w-5 ring-4 ring-primary/50' : 'h-3.5 w-3.5'
                      }`}
                      style={{ 
                        backgroundColor: result.party.color || '#6b7280'
                      }}
                      onMouseEnter={() => setHoveredParty(result.party.id)}
                      onMouseLeave={() => setHoveredParty(null)}
                    />
                    {isHovered && (
                      <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-lg bg-popover px-4 py-2 text-sm text-popover-foreground shadow-lg z-20 border-2 border-primary">
                        <div className="font-bold text-base">{result.party.name}</div>
                        <div className="text-muted-foreground">{result.party.acronym}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {result.percentage}% afinidad
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* PARTIDO GANADOR */}
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

              {/* Coincidencias y Conflictos del ganador */}
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <MatchConflictList 
                  items={topMatch.matches} 
                  type="match" 
                  partyId={topMatch.party.id}
                  isTopMatch={true}
                />
                <MatchConflictList 
                  items={topMatch.conflicts} 
                  type="conflict" 
                  partyId={topMatch.party.id}
                  isTopMatch={true}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={() => toggleDetails(topMatch.party.id)}>
                  {expandedParty === topMatch.party.id ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Ocultar análisis
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" />
                      Ver análisis detallado
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
                <div className="mt-6 space-y-4 rounded-lg bg-muted/50 p-6 border">
                  <div>
                    <h5 className="mb-3 flex items-center gap-2 font-bold text-lg">
                      <TrendingUp className="h-5 w-5" />
                      Análisis con Contexto Histórico
                    </h5>
                    <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">
                      {topMatch.analysis}
                    </p>
                  </div>

                  {topMatch.declarations.length > 0 && (
                    <div className="pt-4 border-t">
                      <h5 className="mb-3 flex items-center gap-2 font-semibold">
                        <Users className="h-4 w-4" />
                        Declaraciones Públicas Verificadas
                      </h5>
                      <ul className="space-y-2">
                        {topMatch.declarations.map((d, idx) => (
                          <li key={idx} className="text-sm pl-4 border-l-2 border-primary/30">
                            <span className="font-medium">{d.date}:</span> {d.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {topMatch.votes.length > 0 && (
                    <div className="pt-4 border-t">
                      <h5 className="mb-3 font-semibold">Historial de Votaciones</h5>
                      <ul className="space-y-2">
                        {topMatch.votes.map((v, idx) => (
                          <li key={idx} className="text-sm pl-4 border-l-2 border-muted-foreground/30">
                            <span className="font-medium">{v.date}:</span> {v.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {showInternational === topMatch.party.id && topMatch.party.international_examples && (
                <div className="mt-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 p-6 border-2 border-blue-200 dark:border-blue-800">
                  <h5 className="mb-4 flex items-center gap-2 text-lg font-bold">
                    <Globe className="h-5 w-5" />
                    Ejemplos Internacionales de Políticas Similares
                  </h5>
                  {parseInternationalExamples(topMatch.party.international_examples).map((example: any, idx: number) => (
                    <div key={idx} className="mb-6 border-l-4 border-blue-500 bg-white/70 dark:bg-black/30 p-5 last:mb-0 rounded-r-lg shadow-sm">
                      <h6 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-3">
                        {example.country} ({example.period})
                      </h6>
                      
                      <div className="space-y-3">
                        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-md">
                          <strong className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">
                            Economía
                          </strong>
                          <p className="text-sm text-foreground">{example.results.economy}</p>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-md">
                          <strong className="text-sm font-semibold text-purple-700 dark:text-purple-400 block mb-1">
                            Educación
                          </strong>
                          <p className="text-sm text-foreground">{example.results.education}</p>
                        </div>

                        <div className="bg-rose-50 dark:bg-rose-950/30 p-3 rounded-md">
                          <strong className="text-sm font-semibold text-rose-700 dark:text-rose-400 block mb-1">
                            Calidad de vida
                          </strong>
                          <p className="text-sm text-foreground">{example.results.quality_of_life}</p>
                        </div>

                        <div className="bg-blue-100/50 dark:bg-blue-900/30 p-3 rounded-md border border-blue-300 dark:border-blue-700">
                          <strong className="text-sm font-semibold text-blue-800 dark:text-blue-300 block mb-1">
                            Políticas implementadas
                          </strong>
                          <p className="text-sm italic text-foreground">{example.policies}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* RESTO DE PARTIDOS */}
        <h2 className="mb-6 text-2xl font-bold">Todos los resultados</h2>
        <div className="space-y-4">
          {results.slice(1).map((result) => (
            <Card key={result.party.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{result.party.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{result.party.acronym}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{result.percentage}%</div>
                    <p className="text-xs text-muted-foreground">afinidad</p>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  Distancia ideológica: {result.compassDistance.toFixed(2)} puntos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={result.percentage} className="mb-4 h-2" />
                
                {/* Coincidencias y Conflictos para partidos NO ganadores */}
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                  <MatchConflictList 
                    items={result.matches} 
                    type="match" 
                    partyId={result.party.id}
                    isTopMatch={false}
                  />
                  <MatchConflictList 
                    items={result.conflicts} 
                    type="conflict" 
                    partyId={result.party.id}
                    isTopMatch={false}
                  />
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toggleDetails(result.party.id)}>
                    {expandedParty === result.party.id ? 'Ocultar análisis' : 'Ver análisis'}
                  </Button>
                  {result.party.international_examples && (
                    <Button size="sm" variant="outline" onClick={() => toggleInternational(result.party.id)}>
                      <Globe className="mr-2 h-4 w-4" />
                      Ejemplos
                    </Button>
                  )}
                </div>

                {expandedParty === result.party.id && (
                  <div className="mt-4 space-y-3 rounded-lg bg-muted/50 p-4 border text-sm">
                    <div>
                      <h6 className="font-semibold mb-2">Análisis Contextual</h6>
                      <p className="text-foreground leading-relaxed whitespace-pre-line">{result.analysis}</p>
                    </div>
                    {result.declarations.length > 0 && (
                      <div className="pt-3 border-t">
                        <strong className="block mb-2">Declaraciones:</strong>
                        <ul className="space-y-1.5">
                          {result.declarations.slice(0, 2).map((d, idx) => (
                            <li key={idx} className="pl-3 border-l-2 border-primary/30">
                              {d.date}: {d.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {showInternational === result.party.id && result.party.international_examples && (
                  <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/50 p-4 border border-blue-200 dark:border-blue-800">
                    <h6 className="font-semibold mb-3">Ejemplos Internacionales</h6>
                    {parseInternationalExamples(result.party.international_examples).map((example: any, idx: number) => (
                      <div key={idx} className="mb-4 last:mb-0 p-3 bg-white/60 dark:bg-black/20 rounded border-l-4 border-blue-500">
                        <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                          {example.country} ({example.period})
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong className="text-emerald-700 dark:text-emerald-400">Economía:</strong>
                            <p className="text-foreground">{example.results.economy}</p>
                          </div>
                          <div>
                            <strong className="text-purple-700 dark:text-purple-400">Educación:</strong>
                            <p className="text-foreground">{example.results.education}</p>
                          </div>
                          <div>
                            <strong className="text-rose-700 dark:text-rose-400">Calidad de vida:</strong>
                            <p className="text-foreground">{example.results.quality_of_life}</p>
                          </div>
                          <div className="italic text-muted-foreground mt-2 pt-2 border-t">
                            {example.policies}
                          </div>
                        </div>
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