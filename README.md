# Mi Presupuesto

Dashboard personal de presupuesto con autenticación, persistencia en Firebase y auto-guardado.

## Stack

- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS 4** (zero-config) + **shadcn/ui**
- **Firebase** (Auth + Firestore)
- **Zustand** — estado global de autenticación
- **TanStack Query** — preparado para queries async
- **React Hook Form** + **Zod** — validación de formularios
- **React Router v7** — ruteo con lazy loading

## Funcionalidades

### Autenticación
- Registro e inicio de sesión con email/password via Firebase Auth
- Rutas protegidas y públicas con guards automáticos
- Sesión persistida entre recargas

### Dashboard de Presupuesto
Auto-guardado en Firestore con debounce de 1 segundo. Todas las cifras son editables con click.

| Sección | Qué trackea |
|---|---|
| **Tipo de Cambio** | Precio del dólar editable |
| **Brubank** | Saldo + lista de gastos deducibles |
| **Naranja X** | Sesiones disponibles, contador de cursadas, equivalencia en meses de Visa |
| **FIMA** | Nafta (tanques totales/restantes) + Clases Jony (clases totales/restantes) |
| **Galicia Auto** | Dólares ahorrados + auto viejo + presupuesto total en pesos |
| **Galicia Sueldo** | Dólares → pesos, distribuido a 4/5/6 meses |
| **Ripio** | Ahorro diario entre 25/03/2026 y 01/12/2026, progreso automático |
| **Fiwind** | Presupuesto de gastos generales + lista de elementos comprados |

## Estructura

```
src/
├── features/
│   ├── auth/               # Tipos, schemas, servicio, store, hook, forms
│   └── budget/             # Tipos, schemas, adapter, servicio, hooks, componentes
├── components/
│   ├── shared/             # Loading spinner
│   └── layout/             # Navbar, MainLayout
├── pages/                  # LoginPage, RegisterPage, BudgetPage
├── router/                 # AppRouter, ProtectedRoute, PublicRoute
├── store/                  # authStore (Zustand)
└── lib/                    # firebase.ts, utils.ts
```

## Setup

1. Clonar el repo e instalar dependencias:

```bash
npm install
```

2. Crear `.env` en la raíz con las credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

3. Correr en desarrollo:

```bash
npm run dev
```
