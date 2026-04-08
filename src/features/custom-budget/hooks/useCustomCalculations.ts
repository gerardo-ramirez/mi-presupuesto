import { useMemo } from 'react'
import type { CustomSection, SectionCalculations } from '../types/customBudget.types'

export function useCustomCalculations(
  section: CustomSection,
  currencyValue: number,
): SectionCalculations {
  return useMemo(() => {
    if (section.type === 'simple') {
      const totalGastado = section.expenses.reduce((acc, e) => acc + e.monto, 0)
      const disponible = section.totalAmount - totalGastado
      return { totalGastado, disponible }
    }

    if (section.type === 'equivalence') {
      const unitPrice = section.unitPrice ?? 0
      const consumed = section.consumed ?? 0
      const totalUnidades = unitPrice > 0 ? Math.floor(section.totalAmount / unitPrice) : 0
      const unidadesRestantes = totalUnidades - consumed
      const montoRestante = section.totalAmount - consumed * unitPrice
      return { totalUnidades, unidadesRestantes, montoRestante }
    }

    // conversion
    const equivalenciaPesos = section.useCurrency
      ? (section.currencyAmount ?? 0) * currencyValue
      : section.totalAmount
    const totalConExtra = equivalenciaPesos + (section.extraAmount ?? 0)
    const divisionResults = (section.divisions ?? []).map((parts) => ({
      parts,
      amount: Math.round(equivalenciaPesos / parts),
    }))
    return { equivalenciaPesos, totalConExtra, divisionResults }
  }, [section, currencyValue])
}
