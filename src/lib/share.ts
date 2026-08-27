/**
 * Comparte texto usando la Web Share API nativa (abre el selector de apps
 * del sistema, incluye WhatsApp si está instalado). Si el navegador no la
 * soporta, cae a un link de wa.me con el texto precargado.
 */
export async function shareText(text: string, title?: string) {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ text, title })
      return
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
    }
  }

  const url = `https://wa.me/?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
