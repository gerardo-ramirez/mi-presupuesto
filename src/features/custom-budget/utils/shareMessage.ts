import type { CustomSection, SectionCalculations } from '../types/customBudget.types'

function formatMoney(amount: number) {
  return `$ ${amount.toLocaleString('es-AR')}`
}

export function buildSimpleShareMessage(section: CustomSection, calculations: SectionCalculations) {
  const disponible = calculations.disponible ?? 0
  const totalGastado = calculations.totalGastado ?? 0
  const excedido = disponible < 0

  const merged = [
    ...section.expenses.map((e, i) => ({ kind: 'expense' as const, order: e.order ?? i, data: e })),
    ...section.separators.map((s) => ({ kind: 'separator' as const, order: s.order, data: s })),
  ].sort((a, b) => a.order - b.order)

  const lines = [`📊 *${section.title}*`, `Monto total: ${formatMoney(section.totalAmount)}`, '']

  for (const item of merged) {
    lines.push(
      item.kind === 'separator'
        ? `*${item.data.label}*`
        : `- ${item.data.nombre ?? 'Gasto'}: ${formatMoney(item.data.monto)}`,
    )
  }

  lines.push('', `Gastado: ${formatMoney(totalGastado)}`, `Disponible: ${formatMoney(disponible)}`)
  if (excedido) {
    lines.push(`⚠️ Te pasaste por: ${formatMoney(Math.abs(disponible))}`)
  }

  return lines.join('\n')
}

export function buildChecklistShareMessage(section: CustomSection, calculations: SectionCalculations) {
  const totalGastado = calculations.totalGastado ?? 0
  const disponible = calculations.disponible ?? 0
  const totalExpenses = section.expenses.reduce((acc, e) => acc + e.monto, 0)
  const excedido = totalExpenses > section.totalAmount
  const exceso = totalExpenses - section.totalAmount

  const lines = [`📊 *${section.title}*`, `Monto total: ${formatMoney(section.totalAmount)}`, '']

  for (const e of section.expenses) {
    lines.push(`${e.done ? '✅' : '⬜'} ${e.nombre ?? 'Gasto'}: ${formatMoney(e.monto)}`)
  }

  lines.push('', `Hecho: ${formatMoney(totalGastado)}`, `Pendiente: ${formatMoney(disponible)}`)
  if (excedido) {
    lines.push(`⚠️ Te pasaste del monto total por: ${formatMoney(exceso)}`)
  }

  return lines.join('\n')
}

export function buildEquivalenceShareMessage(section: CustomSection, calculations: SectionCalculations) {
  const unitLabel = section.unitLabel ?? 'unidad'

  const lines = [
    `📊 *${section.title}*`,
    `Monto total: ${formatMoney(section.totalAmount)}`,
    `Precio por ${unitLabel}: ${formatMoney(section.unitPrice ?? 0)}`,
    `Total ${unitLabel}s: ${calculations.totalUnidades ?? 0}`,
    `${unitLabel}s consumidos: ${section.consumed ?? 0}`,
    `${unitLabel}s restantes: ${calculations.unidadesRestantes ?? 0}`,
    `Monto restante: ${formatMoney(calculations.montoRestante ?? 0)}`,
  ]

  return lines.join('\n')
}

export function buildConversionShareMessage(
  section: CustomSection,
  calculations: SectionCalculations,
  currencyName: string,
) {
  const equivalencia = calculations.equivalenciaPesos ?? 0
  const lines = [`📊 *${section.title}*`]

  if (section.useCurrency) {
    lines.push(`Monto en ${currencyName}: USD ${(section.currencyAmount ?? 0).toLocaleString('es-AR')}`)
    lines.push(`Equivale en pesos: ${formatMoney(equivalencia)}`)
  } else {
    lines.push(`Monto en pesos: ${formatMoney(section.totalAmount)}`)
  }

  if ((section.extraAmount ?? 0) > 0) {
    lines.push(`${section.extraLabel || 'Extra'}: ${formatMoney(section.extraAmount ?? 0)}`)
    lines.push(`Total: ${formatMoney(calculations.totalConExtra ?? equivalencia)}`)
  }

  const divisionLabel = section.divisionLabel ?? 'partes'
  for (const result of calculations.divisionResults ?? []) {
    lines.push(`Dividido en ${result.parts} ${divisionLabel}: ${formatMoney(result.amount)} c/u`)
  }

  return lines.join('\n')
}
