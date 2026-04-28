import { z } from 'zod'
import type { CustomBudgetData, CustomSection } from '../types/customBudget.types'

// Whitelist: definís exactamente qué caracteres son válidos en un nombre de gasto.
// Letras (con tildes/ñ), números, espacios, y puntuación básica esperada en un nombre.
const SAFE_TEXT = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.,\-()\/%$]+$/

const expenseSchema = z.object({
  id: z.string(),
  nombre: z.string()
  .max(200)                    // límite de longitud explícito en el schema
  .regex(SAFE_TEXT, 'Solo se permiten letras, números y puntuación básica')
  .optional(),
  monto: z.number().positive(),  // .positive() evita montos negativos o cero
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

export const EXAMPLE_SECTIONS: CustomSection[] = [
  {
    id: 'example-simple',
    title: 'Ahorros',
    icon: '🏦',
    order: 0,
    type: 'simple',
    totalAmount: 500000,
    expenses: [
      { id: 'ex-1', nombre: 'Streaming', monto: 15000 },
      { id: 'ex-2', nombre: 'Gimnasio', monto: 25000 },
    ],
  },
  {
    id: 'example-equivalence',
    title: 'Clases de inglés',
    icon: '📚',
    order: 1,
    type: 'equivalence',
    totalAmount: 240000,
    expenses: [],
    unitLabel: 'clase',
    unitPrice: 20000,
    consumed: 3,
  },
  {
    id: 'example-conversion',
    title: 'Viaje',
    icon: '🏖️',
    order: 2,
    type: 'conversion',
    totalAmount: 0,
    expenses: [],
    useCurrency: true,
    currencyAmount: 500,
    extraAmount: 0,
    extraLabel: '',
    divisions: [3, 6],
    divisionLabel: 'partes',
  },
]

export const DEFAULT_CUSTOM_BUDGET: CustomBudgetData = {
  currencyName: 'DÓLAR',
  currencyValue: 1375,
  sections: EXAMPLE_SECTIONS,
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
