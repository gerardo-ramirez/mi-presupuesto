import { describe, it, expect } from 'vitest'
import { CustomBudgetAdapter } from './CustomBudgetAdapter'
import { DEFAULT_CUSTOM_BUDGET } from '../schemas/customBudget.schemas'

describe('CustomBudgetAdapter', () => {
  
  it('debe devolver los datos intactos si el esquema es válido', () => {
    // Datos crudos que simulan venir de Firestore
    const rawData = {
      currencyName: 'PESOS',
      currencyValue: 1000,
      sections: []
    }

    const result = CustomBudgetAdapter.fromFirestore(rawData)

    expect(result.currencyName).toBe('PESOS')
    expect(result.sections).toEqual([])
  })

  it('debe devolver DEFAULT_CUSTOM_BUDGET si los datos están corruptos', () => {
    // Simulamos datos inválidos (currencyValue es string en vez de number)
    const corruptedData = {
      currencyName: 'DÓLAR',
      currencyValue: 'MIL PESOS', // Error aquí
      sections: 'no soy un array' // Error aquí
    }

    const result = CustomBudgetAdapter.fromFirestore(corruptedData)

    // El adaptador debe detectar el fallo de Zod y devolver el fallback
    expect(result).toEqual(DEFAULT_CUSTOM_BUDGET)
  })

  it('debe conservar los datos reales de un documento legacy sin separators/order/done', () => {
    // Simula un documento guardado antes de agregar separadores/checklist:
    // sin el campo "separators" en la sección y sin "order"/"done" en los gastos.
    const legacyData = {
      currencyName: 'DÓLAR',
      currencyValue: 1200,
      sections: [
        {
          id: 'sec-1',
          title: 'Ahorros',
          icon: '🏦',
          order: 0,
          type: 'simple',
          totalAmount: 500000,
          expenses: [{ id: 'ex-1', nombre: 'Streaming', monto: 15000 }],
        },
      ],
    }

    const result = CustomBudgetAdapter.fromFirestore(legacyData)

    // Los datos reales del usuario deben sobrevivir (no debe caer a DEFAULT_CUSTOM_BUDGET)
    expect(result.sections).toHaveLength(1)
    expect(result.sections[0].expenses[0].monto).toBe(15000)
    expect(result.sections[0].separators).toEqual([])
  })

  it('debe rechazar (y por lo tanto nunca debería recibir) un separator con caracteres fuera del whitelist', () => {
    // Regression guard: si algún formulario llegara a mandar un label con ":" u
    // otro caracter no permitido, el documento entero se pierde a favor de los
    // defaults. Los formularios (AddSeparatorForm/AddExpenseForm) ya filtran el
    // input con sanitizeSafeText() antes de esto — este test documenta por qué
    // ese filtro es obligatorio, no opcional.
    const dataWithUnsafeSeparator = {
      currencyName: 'DÓLAR',
      currencyValue: 1200,
      sections: [
        {
          id: 'sec-1',
          title: 'Ahorros',
          icon: '🏦',
          order: 0,
          type: 'simple',
          totalAmount: 500000,
          expenses: [],
          separators: [{ id: 'sep-1', label: 'Super: verdulería', order: 1 }],
        },
      ],
    }

    const result = CustomBudgetAdapter.fromFirestore(dataWithUnsafeSeparator)

    expect(result).toEqual(DEFAULT_CUSTOM_BUDGET)
  })
})