import { budgetSchema, DEFAULT_BUDGET } from '../schemas/budget.schemas'
import type { BudgetData } from '../types/budget.types'

export const BudgetAdapter = {
  toFirestore(budget: BudgetData): Record<string, unknown> {
    return { ...budget }
  },

  fromFirestore(doc: Record<string, unknown>): BudgetData {
    const merged = { ...DEFAULT_BUDGET, ...doc }
    const result = budgetSchema.safeParse(merged)
    if (!result.success) {
      console.error('[BudgetAdapter] schema parse error:', result.error)
      return DEFAULT_BUDGET
    }
    return result.data
  },
}
