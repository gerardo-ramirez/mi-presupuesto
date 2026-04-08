import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { CustomBudgetAdapter } from '../adapters/CustomBudgetAdapter'
import { DEFAULT_CUSTOM_BUDGET } from '../schemas/customBudget.schemas'
import type { CustomBudgetData } from '../types/customBudget.types'

export const CustomBudgetService = {
  async getCustomBudget(userId: string): Promise<CustomBudgetData> {
    const ref = doc(db, 'custom-budgets', userId)
    const snap = await getDoc(ref)
    if (!snap.exists()) return DEFAULT_CUSTOM_BUDGET
    return CustomBudgetAdapter.fromFirestore(snap.data() as Record<string, unknown>)
  },

  async saveCustomBudget(userId: string, data: CustomBudgetData): Promise<void> {
    const ref = doc(db, 'custom-budgets', userId)
    await setDoc(ref, CustomBudgetAdapter.toFirestore(data), { merge: true })
  },
}
