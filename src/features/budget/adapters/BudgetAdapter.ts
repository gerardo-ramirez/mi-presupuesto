import { budgetSchema, DEFAULT_BUDGET } from '../schemas/budget.schemas'
import type { BudgetData } from '../types/budget.types'

export const BudgetAdapter = {
  toFirestore(budget: BudgetData): Record<string, unknown> {
    return budget as unknown as Record<string, unknown>
  },

  fromFirestore(doc: Record<string, unknown>): BudgetData {
    const merged = { ...DEFAULT_BUDGET, ...doc }
    const result = budgetSchema.safeParse(merged)
    return result.success ? result.data : DEFAULT_BUDGET
  },
}
