import { useState } from 'react'
import { MailWarning, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth'
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors'

export function EmailVerificationBanner() {
  const { user, resendVerificationEmail } = useAuth()
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)

  if (!user || user.emailVerified) return null

  const handleResend = async () => {
    setIsSending(true)
    try {
      await resendVerificationEmail()
      setSent(true)
      toast.success('Te reenviamos el email de verificación.')
    } catch (error) {
      toast.error(getAuthErrorMessage(error))
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-amber-500/10 border-b border-amber-500/30 px-3 sm:px-6 py-2 text-xs sm:text-sm">
      <div className="flex items-center gap-2 text-amber-300">
        <MailWarning className="h-4 w-4 shrink-0" />
        <span>Tu email todavía no está verificado.</span>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleResend}
        disabled={isSending || sent}
        className="h-auto py-0.5 px-2 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 underline-offset-4 hover:underline disabled:opacity-60"
      >
        {isSending ? (
          <>
            <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
            Enviando...
          </>
        ) : sent ? (
          'Email enviado'
        ) : (
          'Reenviar email de verificación'
        )}
      </Button>
    </div>
  )
}
