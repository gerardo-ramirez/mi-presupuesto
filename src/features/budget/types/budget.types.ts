import { z } from 'zod'
import { budgetSchema } from '../schemas/budget.schemas'

export type BudgetData = z.infer<typeof budgetSchema>

export interface BrubankGasto {
  id: string;
  monto: number;
}

export interface ElementoComprado {
  id: string;
  nombre?: string;
  monto: number;
}

export interface BudgetCalculations {
  totalBrubankGastado: number;
  brubankRestante: number;
  sesionesDisponibles: number;
  sesionesRestantes: number;
  mesesVisa: number;
  naftaRestante: number;
  tanquesTotales: number;
  tanquesRestantes: number;
  clasesTotales: number;
  clasesRestantes: number;
  clasesMontoRestante: number;
  pesosAuto: number;
  totalPresupuestoAuto: number;
  pesosSueldo: number;
  sueldo4: number;
  sueldo5: number;
  sueldo6: number;
  diasRipio: number;
  diasTranscurridos: number;
  totalRipioObjetivo: number;
  totalRipioAcumulado: number;
  totalElementosComprados: number;
  gastosDisponible: number;
}
