// components/share-result-card.tsx
// Componente para generar imagen compartible de resultados

"use client"

import { useRef, useState } from "react"
import { toPng } from "html-to-image"
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  WhatsappShareButton,
  FacebookIcon,
  XIcon,
  WhatsappIcon
} from "react-share"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Share2, Download, Link2, Check } from "lucide-react"

interface ShareResultCardProps {
  partyName: string
  partyAcronym: string
  percentage: number
  partyColor: string
  ideologicalProfile: string
  economicPosition: number
  socialPosition: number
}

export function ShareResultCard({
  partyName,
  partyAcronym,
  percentage,
  partyColor,
  ideologicalProfile,
  economicPosition,
  socialPosition
}: ShareResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Colores por partido con versión moderna/flat
  const getPartyGradient = (color: string) => {
    const gradients: Record<string, string> = {
      '#9333EA': 'linear-gradient(135deg, #1a1a1a 0%, #9333EA 100%)', // LLA - Violeta
      '#EF4444': 'linear-gradient(135deg, #1a1a1a 0%, #EF4444 100%)', // UCR - Rojo
      '#3B82F6': 'linear-gradient(135deg, #1a1a1a 0%, #3B82F6 100%)', // UP - Azul
      '#EAB308': 'linear-gradient(135deg, #1a1a1a 0%, #EAB308 100%)', // PRO - Amarillo
      '#22C55E': 'linear-gradient(135deg, #1a1a1a 0%, #22C55E 100%)', // Izquierda - Verde
    }
    return gradients[color] || `linear-gradient(135deg, #1a1a1a 0%, ${color} 100%)`
  }

  // Generar descripción de posición política
  const getPoliticalDescription = () => {
    let economic = ""
    let social = ""

    if (economicPosition < -5) economic = "fuertemente estatista"
    else if (economicPosition < -2) economic = "centroizquierda económica"
    else if (economicPosition > 5) economic = "fuertemente liberal"
    else if (economicPosition > 2) economic = "centroderecha económica"
    else economic = "centrista económica"

    if (socialPosition > 5) social = "progresista"
    else if (socialPosition > 2) social = "liberal social"
    else if (socialPosition < -5) social = "conservador"
    else if (socialPosition < -2) social = "centro-conservador"
    else social = "centrista social"

    return `Mi posición es ${economic} y ${social}.`
  }

  // Generar texto para compartir
  const getShareText = () => {
    return `Según este test político, debería votar a ${partyName} (${partyAcronym}). Tengo ${percentage}% de afinidad con este partido.

Mi perfil ideológico: ${ideologicalProfile}
${getPoliticalDescription()}

¿Y vos? Hacé el test y descubrí tu afinidad política: `
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const generateImage = async () => {
    if (!cardRef.current) return

    setIsGenerating(true)
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#000000'
      })
      setImageUrl(dataUrl)
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadImage = () => {
    if (!imageUrl) return
    const link = document.createElement('a')
    link.download = `mi-resultado-politico-${partyAcronym}.png`
    link.href = imageUrl
    link.click()
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying link:', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={generateImage}
        >
          <Share2 className="h-4 w-4" />
          Compartir mis resultados
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Compartir tus resultados</DialogTitle>
          <DialogDescription>
            Compartí tu resultado en redes sociales o descargá la imagen
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Vista previa de la tarjeta */}
          <div className="relative overflow-hidden rounded-lg border">
            <div
              ref={cardRef}
              className="w-full p-8"
              style={{
                background: getPartyGradient(partyColor),
                minHeight: '400px'
              }}
            >
              {/* Patrón de fondo abstracto */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl"
                  style={{ backgroundColor: partyColor }}
                />
                <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full blur-3xl bg-white"
                />
              </div>

              {/* Contenido */}
              <div className="relative z-10 text-white space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium opacity-90">
                    Según este test político, yo debería votar a
                  </p>
                  <h1 className="text-4xl font-bold tracking-tight">
                    {partyName}
                  </h1>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-semibold">{partyAcronym}</span>
                    <span className="text-sm opacity-75">•</span>
                    <span className="text-2xl font-bold">{percentage}%</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-2 border border-white/20">
                  <p className="text-sm font-semibold">Mi perfil ideológico:</p>
                  <p className="text-base">{ideologicalProfile}</p>
                  <p className="text-sm opacity-90">{getPoliticalDescription()}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="text-xs opacity-75">
                    Test de Afinidad Política
                  </div>
                  <div className="text-xs opacity-75">
                    {new Date().toLocaleDateString('es-AR')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de compartir */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <FacebookShareButton url={shareUrl} hashtag="#TestPolitico">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1877F2] hover:bg-[#166FE5] text-white transition-colors">
                  <FacebookIcon size={20} round />
                  <span className="text-sm font-medium">Facebook</span>
                </div>
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl} title={getShareText()}>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1DA1F2] hover:bg-[#1A91DA] text-white transition-colors">
                  <XIcon size={20} round />
                  <span className="text-sm font-medium">Twitter</span>
                </div>
              </TwitterShareButton>

              <WhatsappShareButton url={shareUrl} title={getShareText()}>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#22C55E] text-white transition-colors">
                  <WhatsappIcon size={20} round />
                  <span className="text-sm font-medium">WhatsApp</span>
                </div>
              </WhatsappShareButton>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 gap-2" 
                onClick={downloadImage}
                disabled={!imageUrl || isGenerating}
              >
                <Download className="h-4 w-4" />
                Descargar imagen
              </Button>

              <Button 
                variant="outline" 
                className="flex-1 gap-2" 
                onClick={copyLink}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4" />
                    Copiar link
                  </>
                )}
              </Button>
            </div>
          </div>

          {isGenerating && (
            <div className="text-center text-sm text-muted-foreground">
              Generando imagen...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}