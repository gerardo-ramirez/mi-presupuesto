import { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/features/auth'
import { CustomBudgetService } from '../services/CustomBudgetService'
import {
  DEFAULT_CUSTOM_BUDGET,
  TEMPLATE_SIMPLE,
  TEMPLATE_EQUIVALENCE,
  TEMPLATE_CONVERSION,
  TEMPLATE_CHECKLIST,
} from '../schemas/customBudget.schemas'
import type { CustomBudgetData, CustomSection, SectionType } from '../types/customBudget.types'
import { isSectionExample } from '../utils/exampleSection'

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
          : type === 'checklist'
            ? TEMPLATE_CHECKLIST
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

  /**
   * Aplica `updater` a la sección indicada. Si la sección es de ejemplo,
   * marca `exampleEdited` para que la UI ofrezca confirmarla como propia.
   */
  function updateSectionData(sectionId: string, updater: (section: CustomSection) => CustomSection) {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.id !== sectionId) return s
        const updated = updater(s)
        if (updated === s) return s
        return isSectionExample(updated) ? { ...updated, exampleEdited: true } : updated
      }),
    }))
  }

  function updateSection(sectionId: string, updates: Partial<CustomSection>) {
    updateSectionData(sectionId, (s) => ({ ...s, ...updates }))
  }

  function confirmExampleSection(sectionId: string) {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, isExample: false, exampleEdited: false } : s,
      ),
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
    updateSectionData(sectionId, (s) => ({
      ...s,
      expenses: [...s.expenses, { id: crypto.randomUUID(), nombre, monto, order: Date.now() }],
    }))
  }

  function toggleExpenseDone(sectionId: string, expenseId: string) {
    updateSectionData(sectionId, (s) => ({
      ...s,
      expenses: s.expenses.map((e) => (e.id === expenseId ? { ...e, done: !e.done } : e)),
    }))
  }

  function addSeparator(sectionId: string, label: string) {
    updateSectionData(sectionId, (s) => ({
      ...s,
      separators: [...s.separators, { id: crypto.randomUUID(), label, order: Date.now() }],
    }))
  }

  function removeSeparator(sectionId: string, separatorId: string) {
    updateSectionData(sectionId, (s) => ({
      ...s,
      separators: s.separators.filter((sep) => sep.id !== separatorId),
    }))
  }

  function removeExpense(sectionId: string, expenseId: string) {
    updateSectionData(sectionId, (s) => ({
      ...s,
      expenses: s.expenses.filter((e) => e.id !== expenseId),
    }))
  }

  function updateExpense(sectionId: string, expenseId: string, monto: number) {
    updateSectionData(sectionId, (s) => ({
      ...s,
      expenses: s.expenses.map((e) => (e.id === expenseId ? { ...e, monto } : e)),
    }))
  }

  function updateExpenseName(sectionId: string, expenseId: string, nombre: string) {
    updateSectionData(sectionId, (s) => ({
      ...s,
      expenses: s.expenses.map((e) => (e.id === expenseId ? { ...e, nombre } : e)),
    }))
  }

  function updateSeparator(sectionId: string, separatorId: string, label: string) {
    updateSectionData(sectionId, (s) => ({
      ...s,
      separators: s.separators.map((sep) => (sep.id === separatorId ? { ...sep, label } : sep)),
    }))
  }

  function incrementConsumed(sectionId: string) {
    updateSectionData(sectionId, (s) => ({ ...s, consumed: (s.consumed ?? 0) + 1 }))
  }

  function decrementConsumed(sectionId: string) {
    updateSectionData(sectionId, (s) => ({ ...s, consumed: Math.max(0, (s.consumed ?? 0) - 1) }))
  }

  function addDivision(sectionId: string, parts: number) {
    updateSectionData(sectionId, (s) =>
      (s.divisions ?? []).length < 3 ? { ...s, divisions: [...(s.divisions ?? []), parts] } : s,
    )
  }

  function removeDivision(sectionId: string, index: number) {
    updateSectionData(sectionId, (s) => ({
      ...s,
      divisions: (s.divisions ?? []).filter((_, i) => i !== index),
    }))
  }

  function markSectionComplete(sectionId: string) {
    updateSectionData(sectionId, (s) => ({ ...s, completed: true }))
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
    updateExpense,
    updateExpenseName,
    toggleExpenseDone,
    addSeparator,
    removeSeparator,
    updateSeparator,
    incrementConsumed,
    decrementConsumed,
    addDivision,
    removeDivision,
    markSectionComplete,
    confirmExampleSection,
    resetCustomBudget,
  }
}
