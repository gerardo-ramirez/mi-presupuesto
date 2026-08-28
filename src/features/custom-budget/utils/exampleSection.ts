import type { CustomSection } from '../types/customBudget.types'

/**
 * Antes de agregar el campo `isExample`, las secciones de ejemplo se
 * identificaban por el prefijo del id. El fallback mantiene el
 * comportamiento correcto para presupuestos guardados antes de este cambio.
 */
export function isSectionExample(section: CustomSection): boolean {
  return section.isExample ?? section.id.startsWith('example-')
}
