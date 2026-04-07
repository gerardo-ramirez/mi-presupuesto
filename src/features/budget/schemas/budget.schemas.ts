import { z } from 'zod'
import type { BudgetData } from '../types/budget.types'

const brubankGastoSchema = z.object({
  id: z.string(),
  monto: z.number(),
})

const elementoCompradoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  monto: z.number(),
})

export const budgetSchema = z.object({
  precioDolar: z.number(),
  brubank: z.number(),
  brubankGastos: z.array(brubankGastoSchema),
  naranjaPesos: z.number(),
  costoSesion: z.number(),
  sesionesCursadas: z.number(),
  dolaresNaranja: z.number(),
  costoVisa: z.number(),
  fima: z.number(),
  montoNafta: z.number(),
  precioTanque: z.number(),
  tanquesCargados: z.number(),
  paraClasesJony: z.number(),
  precioClase: z.number(),
  clasesCursadas: z.number(),
  dolarAuto: z.number(),
  autoViejoVendido: z.number(),
  dolarSueldo: z.number(),
  ripioPorDia: z.number(),
  gastosGenerales: z.number(),
  elementosComprados: z.array(elementoCompradoSchema),
})

export const DEFAULT_BUDGET: BudgetData = {
  precioDolar: 1375,
  brubank: 104000,
  brubankGastos: [],
  naranjaPesos: 249000,
  costoSesion: 35000,
  sesionesCursadas: 0,
  dolaresNaranja: 126,
  costoVisa: 42,
  fima: 2160000,
  montoNafta: 1200000,
  precioTanque: 100000,
  tanquesCargados: 0,
  paraClasesJony: 960000,
  precioClase: 20000,
  clasesCursadas: 0,
  dolarAuto: 9000,
  autoViejoVendido: 7000000,
  dolarSueldo: 11000,
  ripioPorDia: 10000,
  gastosGenerales: 100000,
  elementosComprados: [],
}
