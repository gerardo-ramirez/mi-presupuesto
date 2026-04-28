import { FirebaseError } from 'firebase/app'

// Mensaje genérico que no revela nada del sistema
const DEFAULT_ERROR = 'Email o contraseña incorrectos. Intentá de nuevo.'

// Mapeamos códigos de Firebase a mensajes seguros.
// CRÍTICO: user-not-found y wrong-password tienen EL MISMO mensaje.
// Si fueran distintos, un atacante sabría cuáles emails están registrados.
const ERROR_MAP: Record<string, string> = {
  'auth/user-not-found':        DEFAULT_ERROR,          // mismo mensaje ↑
  'auth/wrong-password':        DEFAULT_ERROR,          // mismo mensaje ↑
  'auth/invalid-credential':    DEFAULT_ERROR,          // mismo mensaje ↑ (SDK nuevo)
  'auth/invalid-email':         'El formato del email no es válido.',
  'auth/email-already-in-use':  'Ya existe una cuenta con ese email.',
  'auth/weak-password':         'La contraseña debe tener al menos 6 caracteres.',
  'auth/too-many-requests':     'Demasiados intentos. Esperá unos minutos.',
  'auth/network-request-failed':'Error de conexión. Verificá tu internet.',
}

export function getAuthErrorMessage(error: unknown): string {
  // FirebaseError tiene .code nativo — más confiable que parsear .message
  if (error instanceof FirebaseError) {
    return ERROR_MAP[error.code] ?? DEFAULT_ERROR
  }
  // Error desconocido → mensaje genérico, nunca el error crudo
  return DEFAULT_ERROR
}
