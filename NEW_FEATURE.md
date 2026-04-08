# Sesión de Hoy — Mi Presupuesto

## Objetivo
Escalar la app "Mi Presupuesto" con:
- Mejoras de UX en auth (confirm password, visibility toggle)
- Currency name editable
- Migración del router a createBrowserRouter
- Feature nueva: Custom Budget (secciones dinámicas por usuario)
- Routing admin vs usuario regular

---

## Cambios Realizados

### 1. Auth — Confirm Password + Error Labels
- Se agregó campo `confirmPassword` al schema de registro con `.refine()` de Zod
- Validación: contraseñas deben coincidir
- Errores inline por campo con `FormMessage` de shadcn

### 2. Auth — Password Visibility Toggle
- Botón Eye/EyeOff en campos password y confirmPassword
- Toggle entre `type="password"` y `type="text"`
- Aplica tanto en LoginForm como RegisterForm

### 3. Budget — Currency Name Editable
- Nuevo campo `currencyName` en BudgetData (default: "DÓLAR")
- El usuario puede cambiar el nombre: DÓLAR, EURO, REALES, etc.
- Se persiste en Firestore

### 4. Router — Migración a createBrowserRouter
- Se reemplazó `<Routes>/<Route>` por `createBrowserRouter`
- Se actualizó `main.tsx` con `<RouterProvider>`
- PublicRoute y ProtectedRoute adaptados al patrón children

### 5. Bug Fix — Persistencia de Budget
- **Root cause**: el auto-save se disparaba antes de que Firestore respondiera, sobreescribiendo datos reales con DEFAULT_BUDGET
- **Fix**: flag `isLoaded` que solo se activa después del fetch, el auto-save solo corre si `isLoaded === true`

### 6. Feature Nueva — Custom Budget (4 fases)

#### Fase 1: Dominio (tipos, schemas, adapter, service)
- 3 tipos de sección: `simple`, `equivalence`, `conversion`
- **Simple**: monto + lista de gastos + disponible
- **Equivalence**: monto + precio unitario + contador + calculados
- **Conversion**: monto en divisa o pesos + equivalencia + hasta 3 divisiones + monto extra opcional
- Adapter bidireccional Firestore ↔ dominio
- Colección Firestore separada: `custom-budgets/{userId}`
- Regla de seguridad agregada en Firebase Console

#### Fase 2: Hooks
- `useCustomCalculations`: cálculos derivados por tipo de sección (useMemo)
- `useCustomBudget`: CRUD completo de secciones + auto-save con debounce + protección contra sobreescritura (mismo patrón del fix)

#### Fase 3: Componentes
- **Átomos**: EditableText, EditableNumber, Counter, Row, IconPicker (8 emojis)
- **Moléculas**: SectionCard, ExpenseList, AddExpenseForm, DivisionManager
- **Organismos**: SimpleSection, EquivalenceSection, ConversionSection
- **Template**: CurrencyBar, AddSectionButton (dropdown con 3 tipos), CustomBudgetDashboard
- shadcn dropdown-menu instalado

#### Fase 4: Router + Pages
- `CustomBudgetPage` creada
- `AdminRoute` componente: filtra por email
- **Admin** (gerardoramirez656@gmail.com): ve budget clásico por defecto, botón switch en navbar para ir al custom
- **Otros usuarios**: ven solo custom-budget
- Navbar con botón de switch condicional

---

## Estructura de Archivos Creados

```
src/features/custom-budget/
├── types/
│   └── customBudget.types.ts
├── schemas/
│   └── customBudget.schemas.ts
├── adapters/
│   └── CustomBudgetAdapter.ts
├── services/
│   └── CustomBudgetService.ts
├── hooks/
│   ├── useCustomCalculations.ts
│   └── useCustomBudget.ts
├── components/
│   ├── EditableText.tsx
│   ├── EditableNumber.tsx
│   ├── Counter.tsx
│   ├── Row.tsx
│   ├── IconPicker.tsx
│   ├── SectionCard.tsx
│   ├── ExpenseList.tsx
│   ├── AddExpenseForm.tsx
│   ├── DivisionManager.tsx
│   ├── SimpleSection.tsx
│   ├── EquivalenceSection.tsx
│   ├── ConversionSection.tsx
│   ├── CurrencyBar.tsx
│   ├── AddSectionButton.tsx
│   └── CustomBudgetDashboard.tsx
└── index.ts

src/router/AdminRoute.tsx
src/pages/CustomBudgetPage.tsx
```

## Firebase
- Regla nueva: `custom-budgets/{userId}` con auth por uid

---

## Pendiente (próxima sesión)
- **Fase 5: PWA** — manifest.json, service worker, logo/ícono, instalable en celular
- **Merge**: branch `feature/custom-budget` → `main`
- **Testing** en producción
