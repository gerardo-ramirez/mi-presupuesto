import { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/features/auth'
import { CustomBudgetService } from '../services/CustomBudgetService'
import {
  DEFAULT_CUSTOM_BUDGET,
  TEMPLATE_SIMPLE,
  TEMPLATE_EQUIVALENCE,
  TEMPLATE_CONVERSION,
} from '../schemas/customBudget.schemas'
import type { CustomBudgetData, CustomSection, SectionType } from '../types/customBudget.types'

export function useCustomBudget() {
  const { user } = useAuth()
  const [data, setData] = useState<CustomBudgetData>(DEFAULT_CUSTOM_BUDGET)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const isLoaded = useRef(false)

  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      isLoaded.current = false
      return
    }

    isLoaded.current = false
    setIsLoading(true)

    CustomBudgetService.getCustomBudget(user.uid)
      .then((fetched) => {
        setData(fetched)
        isLoaded.current = true
      })
      .catch(() => {
        setData(DEFAULT_CUSTOM_BUDGET)
        isLoaded.current = true
      })
      .finally(() => setIsLoading(false))
  }, [user])

  useEffect(() => {
    if (!isLoaded.current || !user) return

    setIsSaving(true)
    const timer = setTimeout(() => {
      CustomBudgetService.saveCustomBudget(user.uid, data).finally(() => setIsSaving(false))
    }, 1000)

    return () => clearTimeout(timer)
  }, [data, user])

  function updateCurrency(name: string, value: number) {
    setData((prev) => ({ ...prev, currencyName: name, currencyValue: value }))
  }

  function addSection(type: SectionType) {
    const template =
      type === 'simple'
        ? TEMPLATE_SIMPLE
        : type === 'equivalence'
          ? TEMPLATE_EQUIVALENCE
          : TEMPLATE_CONVERSION

    const newSection: CustomSection = {
      ...template,
      id: crypto.randomUUID(),
      order: data.sections.length,
    }
    setData((prev) => ({ ...prev, sections: [...prev.sections, newSection] }))
  }

  function removeSection(sectionId: string) {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
    }))
  }

  function updateSection(sectionId: string, updates: Partial<CustomSection>) {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s)),
    }))
  }

  function reorderSections(sectionIds: string[]) {
    setData((prev) => {
      const map = new Map(prev.sections.map((s) => [s.id, s]))
      const reordered = sectionIds
        .map((id, index) => {
          const s = map.get(id)
          return s ? { ...s, order: index } : null
        })
        .filter(Boolean) as CustomSection[]
      return { ...prev, sections: reordered }
    })
  }

  function addExpense(sectionId: string, monto: number, nombre?: string) {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              expenses: [...s.expenses, { id: crypto.randomUUID(), nombre, monto }],
            }
          : s,
      ),
    }))
  }

  function removeExpense(sectionId: string, expenseId: string) {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? { ...s, expenses: s.expenses.filter((e) => e.id !== expenseId) }
          : s,
      ),
    }))
  }

  function incrementConsumed(sectionId: string) {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, consumed: (s.consumed ?? 0) + 1 } : s,
      ),
    }))
  }

  function decrementConsumed(sectionId: string) {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, consumed: Math.max(0, (s.consumed ?? 0) - 1) } : s,
      ),
    }))
  }

  function addDivision(sectionId: string, parts: number) {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId && (s.divisions ?? []).length < 3
          ? { ...s, divisions: [...(s.divisions ?? []), parts] }
          : s,
      ),
    }))
  }

  function removeDivision(sectionId: string, index: number) {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? { ...s, divisions: (s.divisions ?? []).filter((_, i) => i !== index) }
          : s,
      ),
    }))
  }

  function resetCustomBudget() {
    setData(DEFAULT_CUSTOM_BUDGET)
  }

  return {
    data,
    isLoading,
    isSaving,
    updateCurrency,
    addSection,
    removeSection,
    updateSection,
    reorderSections,
    addExpense,
    removeExpense,
    incrementConsumed,
    decrementConsumed,
    addDivision,
    removeDivision,
    resetCustomBudget,
  }
}
