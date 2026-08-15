export type SectionType = "simple" | "equivalence" | "conversion" | "checklist";

export interface Expense {
  id: string;
  nombre?: string;
  monto: number;
  order?: number;
  done?: boolean;
}

export interface Separator {
  id: string;
  label: string;
  order: number;
}

export interface CustomSection {
  id: string;
  title: string;
  icon: string;
  order: number;
  type: SectionType;
  completed?: boolean;

  // Común a simple y equivalence
  totalAmount: number;

  // Solo SIMPLE y CHECKLIST: lista de gastos
  expenses: Expense[];
  // Solo SIMPLE: separadores visuales (no afectan los cálculos)
  separators: Separator[];

  // Solo EQUIVALENCE
  unitLabel?: string;       // "tanque", "clase", "sesión"
  unitPrice?: number;
  consumed?: number;

  // Solo CONVERSION
  useCurrency?: boolean;    // true = usa tipo de cambio global, false = pesos directo
  currencyAmount?: number;  // monto en divisa
  extraAmount?: number;     // monto extra sumable, default 0
  extraLabel?: string;      // "Auto viejo vendido"
  divisions?: number[];     // ej: [4, 5, 6] -> max 3 elementos
  divisionLabel?: string;   // "partes" por defecto
}

export interface CustomBudgetData {
  currencyName: string;     // "DÓLAR", "EURO", etc.
  currencyValue: number;    // tipo de cambio
  sections: CustomSection[];
}

export interface SectionCalculations {
  // Simple
  totalGastado?: number;
  disponible?: number;

  // Equivalence
  totalUnidades?: number;
  unidadesRestantes?: number;
  montoRestante?: number;

  // Conversion
  equivalenciaPesos?: number;
  totalConExtra?: number;
  divisionResults?: { parts: number; amount: number }[];
}
