"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { CompassPosition } from "@/lib/calculate-compass-position"

type Party = {
  id: string
  name: string
  acronym: string
  color: string
  economic_axis: number
  social_axis: number
}

type PoliticalCompassProps = {
  userPosition: CompassPosition
  parties: Party[]
  highlightedPartyId?: string
}

export function PoliticalCompass({ userPosition, parties, highlightedPartyId }: PoliticalCompassProps) {
  // Convert -10 to +10 scale to 0-100% for positioning
  const toPercent = (value: number) => ((value + 10) / 20) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Brújula Política</CardTitle>
        <CardDescription>Tu posición ideológica comparada con los partidos políticos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square w-full max-w-2xl mx-auto">
          {/* Grid background */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 border-2 border-border">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border border-border/30" />
            ))}
          </div>

          {/* Axis lines */}
          <div className="absolute inset-0">
            {/* Vertical center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border" />
            {/* Horizontal center line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border" />
          </div>

          {/* Axis labels */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground">
              Liberal / Progresista
            </div>
            {/* Bottom */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground">
              Autoritario / Conservador
            </div>
            {/* Left */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-muted-foreground whitespace-nowrap">
              Socialista / Estatista
            </div>
            {/* Right */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-xs font-medium text-muted-foreground whitespace-nowrap">
              Libertario / Capitalista
            </div>
          </div>

          {/* Parties */}
          {parties.map((party) => {
            const isHighlighted = highlightedPartyId === party.id
            return (
              <div
                key={party.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all"
                style={{
                  left: `${toPercent(party.economic_axis)}%`,
                  top: `${toPercent(-party.social_axis)}%`, // Invert Y axis
                }}
              >
                <div
                  className={`flex items-center justify-center rounded-full border-2 transition-all ${
                    isHighlighted
                      ? "w-12 h-12 border-primary shadow-lg scale-110"
                      : "w-10 h-10 border-border hover:scale-110"
                  }`}
                  style={{
                    backgroundColor: party.color || "#6B7280",
                  }}
                >
                  <span className="text-xs font-bold text-white">{party.acronym}</span>
                </div>
                {isHighlighted && (
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-background px-2 py-1 rounded border border-border shadow-sm">
                    {party.name}
                  </div>
                )}
              </div>
            )
          })}

          {/* User position */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${toPercent(userPosition.economic)}%`,
              top: `${toPercent(-userPosition.social)}%`, // Invert Y axis
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-primary border-4 border-background shadow-lg animate-pulse" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded">
                Vos
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {parties.map((party) => (
            <div key={party.id} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: party.color || "#6B7280" }}
              />
              <span className="text-sm text-muted-foreground">
                {party.acronym} - {party.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
