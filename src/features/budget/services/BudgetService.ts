import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { BudgetAdapter } from '../adapters/BudgetAdapter'
import { DEFAULT_BUDGET } from '../schemas/budget.schemas'
import type { BudgetData } from '../types/budget.types'

export const BudgetService = {
  async getBudget(userId: string): Promise<BudgetData> {
    const ref = doc(db, 'budgets', userId)
    const snap = await getDoc(ref)
    if (!snap.exists()) return DEFAULT_BUDGET
    return BudgetAdapter.fromFirestore(snap.data() as Record<string, unknown>)
  },

  async saveBudget(userId: string, data: BudgetData): Promise<void> {
    const ref = doc(db, 'budgets', userId)
    await setDoc(ref, BudgetAdapter.toFirestore(data), { merge: true })
  },
}
