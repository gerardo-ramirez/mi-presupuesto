export interface BrubankGasto {
  id: string;
  monto: number;
}

export interface ElementoComprado {
  id: string;
  nombre: string;
  monto: number;
}

export interface BudgetData {
  precioDolar: number;
  brubank: number;
  brubankGastos: BrubankGasto[];
  naranjaPesos: number;
  costoSesion: number;
  sesionesCursadas: number;
  dolaresNaranja: number;
  costoVisa: number;
  fima: number;
  montoNafta: number;
  precioTanque: number;
  tanquesCargados: number;
  paraClasesJony: number;
  precioClase: number;
  clasesCursadas: number;
  dolarAuto: number;
  autoViejoVendido: number;
  dolarSueldo: number;
  ripioPorDia: number;
  gastosGenerales: number;
  elementosComprados: ElementoComprado[];
}

export interface BudgetCalculations {
  totalBrubankGastado: number;
  brubankRestante: number;
  sesionesDisponibles: number;
  sesionesRestantes: number;
  mesesVisa: number;
  naftaRestante: number;
  tanquesTotales: number;
  tanquesRestantes: number;
  clasesTotales: number;
  clasesRestantes: number;
  clasesMontoRestante: number;
  pesosAuto: number;
  totalPresupuestoAuto: number;
  pesosSueldo: number;
  sueldo4: number;
  sueldo5: number;
  sueldo6: number;
  diasRipio: number;
  diasTranscurridos: number;
  totalRipioObjetivo: number;
  totalRipioAcumulado: number;
  totalElementosComprados: number;
  gastosDisponible: number;
}
