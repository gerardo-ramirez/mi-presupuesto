import { useMemo } from 'react'
import type { BudgetData, BudgetCalculations } from '../types/budget.types'

const START_DATE = new Date('2026-03-25T00:00:00')
const END_DATE = new Date('2026-12-01T00:00:00')
const MS_PER_DAY = 1000 * 60 * 60 * 24

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY)
}

export function useBudgetCalculations(data: BudgetData): BudgetCalculations {
  return useMemo(() => {
    const totalBrubankGastado = data.brubankGastos.reduce((sum, g) => sum + g.monto, 0)
    const brubankRestante = data.brubank - totalBrubankGastado

    const sesionesDisponibles = Math.floor(data.naranjaPesos / data.costoSesion)
    const sesionesRestantes = sesionesDisponibles - data.sesionesCursadas

    const mesesVisa = data.dolaresNaranja / data.costoVisa

    const naftaRestante = data.montoNafta - data.tanquesCargados * data.precioTanque
    const tanquesTotales = Math.floor(data.montoNafta / data.precioTanque)
    const tanquesRestantes = tanquesTotales - data.tanquesCargados

    const clasesTotales = Math.floor(data.paraClasesJony / data.precioClase)
    const clasesRestantes = clasesTotales - data.clasesCursadas
    const clasesMontoRestante = data.paraClasesJony - data.clasesCursadas * data.precioClase

    const pesosAuto = data.dolarAuto * data.precioDolar
    const totalPresupuestoAuto = pesosAuto + data.autoViejoVendido

    const pesosSueldo = data.dolarSueldo * data.precioDolar
    const sueldo4 = pesosSueldo / 4
    const sueldo5 = pesosSueldo / 5
    const sueldo6 = pesosSueldo / 6

    const diasRipio = daysBetween(START_DATE, END_DATE)
    const rawDiasTranscurridos = daysBetween(START_DATE, new Date())
    const diasTranscurridos = Math.min(Math.max(rawDiasTranscurridos, 0), diasRipio)

    const totalRipioObjetivo = diasRipio * data.ripioPorDia
    const totalRipioAcumulado = diasTranscurridos * data.ripioPorDia

    const totalElementosComprados = data.elementosComprados.reduce((sum, e) => sum + e.monto, 0)
    const gastosDisponible = data.gastosGenerales - totalElementosComprados

    return {
      totalBrubankGastado,
      brubankRestante,
      sesionesDisponibles,
      sesionesRestantes,
      mesesVisa,
      naftaRestante,
      tanquesTotales,
      tanquesRestantes,
      clasesTotales,
      clasesRestantes,
      clasesMontoRestante,
      pesosAuto,
      totalPresupuestoAuto,
      pesosSueldo,
      sueldo4,
      sueldo5,
      sueldo6,
      diasRipio,
      diasTranscurridos,
      totalRipioObjetivo,
      totalRipioAcumulado,
      totalElementosComprados,
      gastosDisponible,
    }
  }, [data])
}
