/**
 * sanitize.ts — utilidades de validación y sanitización para este proyecto.
 *
 * REGLA GENERAL:
 *   - Texto plano en JSX  → whitelist regex con Zod (este archivo)
 *   - HTML renderizado con dangerouslySetInnerHTML → DOMPurify (ver abajo)
 *   - Nunca usar blacklist (prohibir <>, script, etc.) — siempre whitelist
 */

import { z } from 'zod'

// ─── Whitelists por tipo de campo ────────────────────────────────────────────

/**
 * Texto general: nombres de gastos, etiquetas, notas cortas.
 * Permite letras (con tildes/ñ), números, espacios y puntuación básica.
 */
export const SAFE_TEXT_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.,\-()\/%$]+$/

/**
 * Nombre de divisa o etiqueta corta: solo letras y espacios.
 * Ejemplo: "DÓLAR", "EURO", "clase", "partes"
 */
export const LABEL_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/

/**
 * Nombre de usuario: solo letras y números, sin espacios ni símbolos.
 * Debe coincidir con el schema de registro.
 */
export const DISPLAY_NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]+$/

/**
 * Email: whitelist basada en el patrón HTML5 (WHATWG). Rechaza espacios y
 * los caracteres típicamente usados para inyección (<, >, ", (, ), ,, ;, :, \)
 * sin bloquear caracteres legítimos de RFC 5321 como el apóstrofe.
 * Requiere un dominio con al menos un punto (ej: "aaa" sin TLD queda afuera).
 */
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

// ─── Helpers de Zod reutilizables ────────────────────────────────────────────

/**
 * Campo de texto seguro para nombres de gastos y títulos de secciones.
 */
export function safeTextField(maxLength = 200) {
  return z
    .string()
    .min(1, 'El campo no puede estar vacío')
    .max(maxLength, `Máximo ${maxLength} caracteres`)
    .regex(SAFE_TEXT_REGEX, 'Solo se permiten letras, números y puntuación básica')
}

/**
 * Campo de etiqueta corta (divisa, unidad, label).
 */
export function safeLabelField(maxLength = 20) {
  return z
    .string()
    .min(1)
    .max(maxLength)
    .regex(LABEL_REGEX, 'Solo se permiten letras y espacios')
}

/**
 * Campo de email: recorta espacios, normaliza a minúsculas y valida contra
 * una whitelist (no contra la validación laxa por defecto de Zod), evitando
 * que caracteres de inyección (<, >, ", etc.) lleguen a Firebase Auth.
 * Longitud máxima 254 según RFC 5321.
 */
export function safeEmailField() {
  return z
    .string()
    .trim()
    .toLowerCase()
    .max(254, 'El email es demasiado largo')
    .regex(EMAIL_REGEX, 'Ingresá un email válido')
}

// ─── Para el futuro: si algún día usás dangerouslySetInnerHTML ───────────────

/**
 * NUNCA uses dangerouslySetInnerHTML sin pasar el string por esta función.
 *
 * Requiere instalar DOMPurify:
 *   npm install dompurify
 *   npm install -D @types/dompurify
 *
 * Descomentá cuando lo necesites:
 */

// import DOMPurify from 'dompurify'
//
// export function sanitizeHtml(dirty: string): string {
//   return DOMPurify.sanitize(dirty, {
//     ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
//     ALLOWED_ATTR: [],  // sin atributos — elimina href, onclick, onerror, etc.
//   })
// }
//
// Uso:
// <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(contenidoDeFirebase) }} />
