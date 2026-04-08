import { z } from 'zod'
import type { CustomBudgetData, CustomSection } from '../types/customBudget.types'

const expenseSchema = z.object({
  id: z.string(),
  nombre: z.string().optional(),
  monto: z.number(),
})

export const customSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  order: z.number(),
  type: z.enum(['simple', 'equivalence', 'conversion']),
  totalAmount: z.number(),
  expenses: z.array(expenseSchema).default([]),
  // Equivalence
  unitLabel: z.string().optional(),
  unitPrice: z.number().optional(),
  consumed: z.number().min(0).default(0),
  // Conversion
  useCurrency: z.boolean().optional(),
  currencyAmount: z.number().optional(),
  extraAmount: z.number().default(0),
  extraLabel: z.string().optional(),
  divisions: z.array(z.number().positive()).max(3).default([]),
  divisionLabel: z.string().default('partes'),
})

export const customBudgetSchema = z.object({
  currencyName: z.string().default('DÓLAR'),
  currencyValue: z.number(),
  sections: z.array(customSectionSchema).default([]),
})

export const DEFAULT_CUSTOM_BUDGET: CustomBudgetData = {
  currencyName: 'DÓLAR',
  currencyValue: 1375,
  sections: [],
}

export const TEMPLATE_SIMPLE: Omit<CustomSection, 'id' | 'order'> = {
  title: 'Nueva Sección',
  icon: '📁',
  type: 'simple',
  totalAmount: 0,
  expenses: [],
}

export const TEMPLATE_EQUIVALENCE: Omit<CustomSection, 'id' | 'order'> = {
  title: 'Nueva Sección',
  icon: '📁',
  type: 'equivalence',
  totalAmount: 0,
  expenses: [],
  unitLabel: 'unidad',
  unitPrice: 0,
  consumed: 0,
}

export const TEMPLATE_CONVERSION: Omit<CustomSection, 'id' | 'order'> = {
  title: 'Nueva Sección',
  icon: '📁',
  type: 'conversion',
  totalAmount: 0,
  expenses: [],
  useCurrency: true,
  currencyAmount: 0,
  extraAmount: 0,
  extraLabel: '',
  divisions: [],
  divisionLabel: 'partes',
}
