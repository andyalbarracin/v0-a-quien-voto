// app/layout.tsx
// Última modificación: October 02, 2025
// Descripción: Layout raíz de la aplicación que establece metadata, fonts, analytics y navegación global. Incluye Suspense para loading y corrige import de globals.css a path relativo correcto.

import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { Suspense } from "react"
import "@/app/globals.css" // Corregido: Import path relativo con @ alias para resolver Module not found

export const metadata: Metadata = {
  title: "¿A quién voto? - Descubrí tu partido político ideal",
  description:
    "Respondé preguntas sobre temas que te importan y descubrí qué candidatos y partidos políticos se alinean con tus valores. Basado en datos reales y verificables.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}