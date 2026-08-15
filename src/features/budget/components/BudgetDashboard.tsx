import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from '@/components/shared/SortableItem'
import { useBudget } from '../hooks/useBudget'
import { DolarSection } from './DolarSection'
import { BrubankSection } from './BrubankSection'
import { NaranjaSection } from './NaranjaSection'
import { FimaSection } from './FimaSection'
import { GaliciaAutoSection } from './GaliciaAutoSection'
import { GaliciaSueldoSection } from './GaliciaSueldoSection'
import { RipioSection } from './RipioSection'
import { FiwindSection } from './FiwindSection'

const ALL_SECTIONS = [
  'dolar',
  'brubank',
  'naranja',
  'fima',
  'galiciaAuto',
  'galiciaSueldo',
  'ripio',
  'fiwind',
]

export function BudgetDashboard() {
  const {
    data,
    calculations,
    isLoading,
    isSaving,
    updateField,
    addBrubankGasto,
    removeBrubankGasto,
    addElemento,
    removeElemento,
    markSectionComplete,
    hideSection,
    resetBudget,
  } = useBudget()

  const [sectionOrder, setSectionOrder] = useState<string[]>([])

  useEffect(() => {
    if (!isLoading) {
      setSectionOrder(
        ALL_SECTIONS.filter(
          (id) =>
            !data.hiddenSections.includes(id) && !data.completedSections.includes(id),
        ),
      )
    }
  }, [isLoading])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setSectionOrder((prev) => {
      const oldIndex = prev.indexOf(active.id as string)
      const newIndex = prev.indexOf(over.id as string)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  function handleComplete(id: string) {
    markSectionComplete(id)
    setSectionOrder((prev) => prev.filter((s) => s !== id))
  }

  function handleHide(id: string) {
    hideSection(id)
    setSectionOrder((prev) => prev.filter((s) => s !== id))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    )
  }

  const completedIds = data.completedSections.filter((id) => ALL_SECTIONS.includes(id))

  function renderSection(id: string, isCompleted = false) {
    const shared = {
      onRemove: () => (isCompleted ? handleHide(id) : handleHide(id)),
      onComplete: isCompleted ? undefined : () => handleComplete(id),
      isCompleted,
    }

    if (id === 'dolar') return (
      <DolarSection
        precioDolar={data.precioDolar}
        currencyName={data.currencyName}
        onPrecioDolarChange={(v) => updateField('precioDolar', v)}
        onCurrencyNameChange={(v) => updateField('currencyName', v)}
        {...shared}
      />
    )
    if (id === 'brubank') return (
      <BrubankSection
        brubank={data.brubank}
        brubankGastos={data.brubankGastos}
        calculations={calculations}
        onBrubankChange={(v) => updateField('brubank', v)}
        onAddGasto={addBrubankGasto}
        onRemoveGasto={removeBrubankGasto}
        {...shared}
      />
    )
    if (id === 'naranja') return (
      <NaranjaSection
        data={{
          naranjaPesos: data.naranjaPesos,
          costoSesion: data.costoSesion,
          sesionesCursadas: data.sesionesCursadas,
          dolaresNaranja: data.dolaresNaranja,
          costoVisa: data.costoVisa,
        }}
        calculations={calculations}
        onUpdate={updateField}
        {...shared}
      />
    )
    if (id === 'fima') return (
      <FimaSection
        data={{
          fima: data.fima,
          montoNafta: data.montoNafta,
          precioTanque: data.precioTanque,
          tanquesCargados: data.tanquesCargados,
          paraClasesJony: data.paraClasesJony,
          precioClase: data.precioClase,
          clasesCursadas: data.clasesCursadas,
        }}
        calculations={calculations}
        onUpdate={updateField}
        {...shared}
      />
    )
    if (id === 'galiciaAuto') return (
      <GaliciaAutoSection
        data={{ dolarAuto: data.dolarAuto, autoViejoVendido: data.autoViejoVendido }}
        calculations={calculations}
        onUpdate={updateField}
        {...shared}
      />
    )
    if (id === 'galiciaSueldo') return (
      <GaliciaSueldoSection
        data={{ dolarSueldo: data.dolarSueldo }}
        calculations={calculations}
        onUpdate={updateField}
        {...shared}
      />
    )
    if (id === 'ripio') return (
      <RipioSection
        data={{ ripioPorDia: data.ripioPorDia }}
        calculations={calculations}
        onUpdate={updateField}
        {...shared}
      />
    )
    if (id === 'fiwind') return (
      <FiwindSection
        data={{ gastosGenerales: data.gastosGenerales }}
        elementosComprados={data.elementosComprados}
        calculations={calculations}
        onUpdate={updateField}
        onAddElemento={addElemento}
        onRemoveElemento={removeElemento}
        {...shared}
      />
    )
    return null
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
      />
      <div
        className="min-h-screen bg-gradient-to-b from-bg to-bg-elevated p-4 md:p-8"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {/* Header */}
        <header className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Mi Presupuesto
            </h1>
            <p className="text-text-subtle text-sm mt-1">
              Auto-guardado en Firebase
              {isSaving && (
                <span className="ml-2 text-amber-500/70 inline-flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Guardando...
                </span>
              )}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetBudget}
            className="text-text-subtle hover:text-red-400 hover:bg-red-950/30 text-xs"
          >
            Resetear
          </Button>
        </header>

        {/* Grid activo con drag & drop */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sectionOrder} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {sectionOrder.map((id) => (
                <SortableItem key={id} id={id}>
                  {renderSection(id, false)}
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Secciones completadas — fuera del drag & drop */}
        {completedIds.length > 0 && (
          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-text-subtle mb-3">
              Completadas
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {completedIds.map((id) => (
                <div key={id}>
                  {renderSection(id, true)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border/50 flex items-center justify-between gap-4">
          <a
            href="https://gramirez-lab.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-subtle hover:text-amber-500/70 transition-colors duration-200 tracking-widest uppercase"
          >
            gramirezlab ↗
          </a>
          <div className="flex items-center gap-2 text-xs text-text-subtle">
            <span className="text-text">·</span>
            <span>desarrollado por</span>
            <a
              href="https://gramirez.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-subtle hover:text-amber-500/70 transition-colors duration-200"
            >
              Gerardo Ramirez ↗
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}
