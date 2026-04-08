import { customBudgetSchema, DEFAULT_CUSTOM_BUDGET } from '../schemas/customBudget.schemas'
import type { CustomBudgetData } from '../types/customBudget.types'

export const CustomBudgetAdapter = {
  toFirestore(data: CustomBudgetData): Record<string, unknown> {
    return data as unknown as Record<string, unknown>
  },

  fromFirestore(doc: Record<string, unknown>): CustomBudgetData {
    const result = customBudgetSchema.safeParse(doc)
    if (!result.success) return DEFAULT_CUSTOM_BUDGET
    return result.data as CustomBudgetData
  },
}
