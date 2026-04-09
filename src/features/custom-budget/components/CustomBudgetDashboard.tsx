import { useState } from 'react'
import { Loader2, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCustomBudget } from '../hooks/useCustomBudget'
import { useCustomCalculations } from '../hooks/useCustomCalculations'
import { CurrencyBar } from './CurrencyBar'
import { SimpleSection } from './SimpleSection'
import { EquivalenceSection } from './EquivalenceSection'
import { ConversionSection } from './ConversionSection'
import { AddSectionButton } from './AddSectionButton'
import type { CustomSection } from '../types/customBudget.types'

function SectionRenderer({
  section,
  currencyValue,
  currencyName,
  onUpdate,
  onAddExpense,
  onRemoveExpense,
  onIncrement,
  onDecrement,
  onAddDivision,
  onRemoveDivision,
  onRemove,
}: {
  section: CustomSection
  currencyValue: number
  currencyName: string
  onUpdate: (updates: Partial<CustomSection>) => void
  onAddExpense: (monto: number, nombre?: string) => void
  onRemoveExpense: (expenseId: string) => void
  onIncrement: () => void
  onDecrement: () => void
  onAddDivision: (parts: number) => void
  onRemoveDivision: (index: number) => void
  onRemove: () => void
}) {
  const calculations = useCustomCalculations(section, currencyValue)

  if (section.type === 'simple') {
    return (
      <SimpleSection
        section={section}
        calculations={calculations}
        onUpdate={onUpdate}
        onAddExpense={onAddExpense}
        onRemoveExpense={onRemoveExpense}
        onRemove={onRemove}
      />
    )
  }

  if (section.type === 'equivalence') {
    return (
      <EquivalenceSection
        section={section}
        calculations={calculations}
        onUpdate={onUpdate}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
      />
    )
  }

  return (
    <ConversionSection
      section={section}
      calculations={calculations}
      currencyName={currencyName}
      onUpdate={onUpdate}
      onAddDivision={onAddDivision}
      onRemoveDivision={onRemoveDivision}
      onRemove={onRemove}
    />
  )
}

const BANNER_KEY = 'custom-budget-example-dismissed'

export function CustomBudgetDashboard() {
  const {
    data,
    isLoading,
    isSaving,
    updateCurrency,
    addSection,
    removeSection,
    updateSection,
    addExpense,
    removeExpense,
    incrementConsumed,
    decrementConsumed,
    addDivision,
    removeDivision,
    resetCustomBudget,
  } = useCustomBudget()

  const [bannerDismissed, setBannerDismissed] = useState(
    () => localStorage.getItem(BANNER_KEY) === 'true',
  )

  const dismissBanner = () => {
    localStorage.setItem(BANNER_KEY, 'true')
    setBannerDismissed(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    )
  }

  const sortedSections = [...data.sections].sort((a, b) => a.order - b.order)

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
      />
      <div
        className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 p-4 md:p-8"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {/* Header */}
        <header className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Mi Presupuesto
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {isSaving ? (
                <span className="text-amber-500/70 inline-flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Guardando...
                </span>
              ) : (
                'Auto-guardado en Firebase'
              )}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetCustomBudget}
            className="text-gray-600 hover:text-red-400 hover:bg-red-950/30 text-xs"
          >
            Resetear
          </Button>
        </header>

        {/* Currency bar */}
        <CurrencyBar
          currencyName={data.currencyName}
          currencyValue={data.currencyValue}
          onNameChange={(name) => updateCurrency(name, data.currencyValue)}
          onValueChange={(value) => updateCurrency(data.currencyName, value)}
        />

        {/* Example banner */}
        {!bannerDismissed && sortedSections.some((s) => s.id.startsWith('example-')) && (
          <div className="flex items-start gap-3 mb-4 px-4 py-3 rounded-xl bg-amber-900/20 border border-amber-800/50">
            <Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-300">Estas secciones son de ejemplo</p>
              <p className="text-xs text-amber-700 mt-0.5">
                Podés editarlas, eliminarlas o crear las tuyas propias. Los cambios se guardan automáticamente en tu cuenta.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={dismissBanner}
              className="text-amber-600 hover:text-amber-400 hover:bg-amber-500/10 text-xs h-7 px-2 shrink-0"
            >
              Entendido
            </Button>
          </div>
        )}

        {sortedSections.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-gray-400 text-lg font-semibold">Tu presupuesto está vacío</p>
            <p className="text-gray-600 text-sm">Agregá tu primera sección para empezar</p>
            <div className="w-full max-w-sm mt-2">
              <AddSectionButton onAdd={addSection} />
            </div>
          </div>
        ) : (
          <>
            {/* Sections grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
              {sortedSections.map((section) => (
                <SectionRenderer
                  key={section.id}
                  section={section}
                  currencyValue={data.currencyValue}
                  currencyName={data.currencyName}
                  onUpdate={(updates) => updateSection(section.id, updates)}
                  onAddExpense={(monto, nombre) => addExpense(section.id, monto, nombre)}
                  onRemoveExpense={(expenseId) => removeExpense(section.id, expenseId)}
                  onIncrement={() => incrementConsumed(section.id)}
                  onDecrement={() => decrementConsumed(section.id)}
                  onAddDivision={(parts) => addDivision(section.id, parts)}
                  onRemoveDivision={(index) => removeDivision(section.id, index)}
                  onRemove={() => removeSection(section.id)}
                />
              ))}
            </div>

            {/* Add section */}
            <div className="max-w-sm">
              <AddSectionButton onAdd={addSection} />
            </div>
          </>
        )}
        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-800/50 flex items-center justify-between gap-4">
          <a
            href="https://gramirez-lab.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-700 hover:text-amber-500/70 transition-colors duration-200 tracking-widest uppercase"
          >
            gramirezlab ↗
          </a>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <span className="text-gray-800">·</span>
            <span>desarrollado por</span>
            <a
              href="https://gramirez.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-amber-500/70 transition-colors duration-200"
            >
              Gerardo Ramirez ↗
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}
