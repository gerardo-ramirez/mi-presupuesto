import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBudget } from '../hooks/useBudget'
import { DolarSection } from './DolarSection'
import { BrubankSection } from './BrubankSection'
import { NaranjaSection } from './NaranjaSection'
import { FimaSection } from './FimaSection'
import { GaliciaAutoSection } from './GaliciaAutoSection'
import { GaliciaSueldoSection } from './GaliciaSueldoSection'
import { RipioSection } from './RipioSection'
import { FiwindSection } from './FiwindSection'

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
    resetBudget,
  } = useBudget()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    )
  }

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
        <header className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Mi Presupuesto
            </h1>
            <p className="text-gray-500 text-sm mt-1">
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
            className="text-gray-600 hover:text-red-400 hover:bg-red-950/30 text-xs"
          >
            Resetear
          </Button>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <DolarSection
            precioDolar={data.precioDolar}
            currencyName={data.currencyName}
            onPrecioDolarChange={(v) => updateField('precioDolar', v)}
            onCurrencyNameChange={(v) => updateField('currencyName', v)}
          />

          <BrubankSection
            brubank={data.brubank}
            brubankGastos={data.brubankGastos}
            calculations={calculations}
            onBrubankChange={(v) => updateField('brubank', v)}
            onAddGasto={addBrubankGasto}
            onRemoveGasto={removeBrubankGasto}
          />

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
          />

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
          />

          <GaliciaAutoSection
            data={{ dolarAuto: data.dolarAuto, autoViejoVendido: data.autoViejoVendido }}
            calculations={calculations}
            onUpdate={updateField}
          />

          <GaliciaSueldoSection
            data={{ dolarSueldo: data.dolarSueldo }}
            calculations={calculations}
            onUpdate={updateField}
          />

          <RipioSection
            data={{ ripioPorDia: data.ripioPorDia }}
            calculations={calculations}
            onUpdate={updateField}
          />

          <div className="md:col-span-2 xl:col-span-1">
            <FiwindSection
              data={{ gastosGenerales: data.gastosGenerales }}
              elementosComprados={data.elementosComprados}
              calculations={calculations}
              onUpdate={updateField}
              onAddElemento={addElemento}
              onRemoveElemento={removeElemento}
            />
          </div>
        </div>
      </div>
    </>
  )
}
