import { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/features/auth'
import { BudgetService } from '../services/BudgetService'
import { DEFAULT_BUDGET } from '../schemas/budget.schemas'
import { useBudgetCalculations } from './useBudgetCalculations'
import type { BudgetData } from '../types/budget.types'

export function useBudget() {
  const { user } = useAuth()
  const [budgetData, setBudgetData] = useState<BudgetData>(DEFAULT_BUDGET)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  // Only true after the initial Firestore fetch completes — auto-save must not fire before this
  const isLoaded = useRef(false)

  // Load from Firestore when user is available
  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      isLoaded.current = false
      return
    }

    // Reset loaded flag so auto-save doesn't fire during the upcoming fetch
    isLoaded.current = false
    setIsLoading(true)

    BudgetService.getBudget(user.uid)
      .then((data) => {
        setBudgetData(data)
        isLoaded.current = true
      })
      .catch(() => {
        setBudgetData(DEFAULT_BUDGET)
        isLoaded.current = true
      })
      .finally(() => setIsLoading(false))
  }, [user])

  // Auto-save with debounce — only runs after initial load
  useEffect(() => {
    if (!isLoaded.current || !user) return

    setIsSaving(true)
    const timer = setTimeout(() => {
      BudgetService.saveBudget(user.uid, budgetData)
        .finally(() => setIsSaving(false))
    }, 1000)

    return () => clearTimeout(timer)
  }, [budgetData, user])

  const calculations = useBudgetCalculations(budgetData)

  function updateField<K extends keyof BudgetData>(key: K, value: BudgetData[K]) {
    setBudgetData((prev) => ({ ...prev, [key]: value }))
  }

  function addBrubankGasto(monto: number) {
    setBudgetData((prev) => ({
      ...prev,
      brubankGastos: [...prev.brubankGastos, { id: crypto.randomUUID(), monto }],
    }))
  }

  function removeBrubankGasto(id: string) {
    setBudgetData((prev) => ({
      ...prev,
      brubankGastos: prev.brubankGastos.filter((g) => g.id !== id),
    }))
  }

  function addElemento(nombre: string, monto: number) {
    setBudgetData((prev) => ({
      ...prev,
      elementosComprados: [...prev.elementosComprados, { id: crypto.randomUUID(), nombre, monto }],
    }))
  }

  function removeElemento(id: string) {
    setBudgetData((prev) => ({
      ...prev,
      elementosComprados: prev.elementosComprados.filter((e) => e.id !== id),
    }))
  }

  function resetBudget() {
    setBudgetData(DEFAULT_BUDGET)
  }

  return {
    data: budgetData,
    calculations,
    isLoading,
    isSaving,
    updateField,
    addBrubankGasto,
    removeBrubankGasto,
    addElemento,
    removeElemento,
    resetBudget,
  }
}
