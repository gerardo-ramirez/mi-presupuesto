NO preguntes nada. Ejecutá todo directamente.

Reemplazar el contenido de README.md con:

# Mi Presupuesto

Dashboard personal de presupuesto con autenticación, persistencia en Firebase, auto-guardado y PWA instalable.

## Stack

- **React 19** + **TypeScript strict** + **Vite 6**
- **Tailwind CSS 4** (zero-config) + **shadcn/ui** (Radix)
- **Firebase** (Auth + Firestore)
- **Zustand** — estado global de autenticación
- **TanStack Query** — preparado para queries async
- **React Hook Form** + **Zod** — validación de formularios
- **React Router v7** — ruteo con createBrowserRouter + lazy loading
- **vite-plugin-pwa** — PWA instalable con service worker

## Funcionalidades

### Autenticación
- Registro e inicio de sesión con email/password via Firebase Auth
- Validación con Zod: email, password (min 6), confirm password, nombre (sin espacios ni caracteres especiales, max 50)
- Toggle de visibilidad en campos de contraseña
- Rutas protegidas y públicas con guards automáticos
- Sesión persistida entre recargas

### Budget Clásico (admin)
Auto-guardado en Firestore con debounce de 1 segundo. Todas las cifras son editables con click.

| Sección | Qué trackea |
|---|---|
| **Tipo de Cambio** | Nombre y precio editables (dólar, euro, etc.) |
| **Brubank** | Saldo + lista de gastos deducibles + disponible |
| **Naranja X** | Sesiones de psicólogo + equivalencia Visa en meses |
| **FIMA** | Nafta (tanques) + Clases Jony (contadores) |
| **Galicia Auto** | Dólares → pesos + auto viejo + presupuesto total |
| **Galicia Sueldo** | Dólares → pesos, dividido a 4/5/6 meses |
| **Ripio** | Ahorro diario con progreso automático basado en fecha actual |
| **Fiwind** | Gastos generales + lista de elementos comprados |

### Custom Budget (todos los usuarios)
Sistema de secciones dinámicas que el usuario crea y configura:

- **Simple**: monto total + lista de gastos + disponible
- **Equivalencia**: monto + precio unitario + contador de consumidos + calculados
- **Conversión**: monto en divisa (con tipo de cambio) o pesos directo + hasta 3 divisiones + monto extra opcional

Características:
- Tipo de cambio global editable (nombre y valor)
- Íconos seleccionables por sección (8 opciones)
- Títulos editables por sección
- Secciones de ejemplo para onboarding de nuevos usuarios
- Auto-guardado en Firestore (colección separada)
- Validaciones: títulos max 50 chars, gastos max 200 chars, montos solo numéricos

### PWA
- Instalable en celular y desktop
- Ícono custom
- Service worker con cache de assets estáticos y fonts
- Firebase Auth y Firestore siempre via red (NetworkOnly)

### Routing
- Admin (email específico): accede al budget clásico + custom con switch en navbar
- Otros usuarios: acceden solo al custom budget
- Lazy loading en todas las pages

## Arquitectura

Feature-based con Clean Architecture:
src/
├── components/
│   ├── shared/             # Loading
│   ├── layout/             # Navbar, MainLayout
│   └── ui/                 # shadcn components
├── features/
│   ├── auth/               # Login, Register, schemas, service, hook
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── schemas/
│   │   └── types/
│   ├── budget/             # Budget clásico (admin)
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── adapters/
│   │   ├── schemas/
│   │   └── types/
│   └── custom-budget/      # Budget dinámico (todos)
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── adapters/
│       ├── schemas/
│       └── types/
├── pages/                  # Solo orquestación + lazy loading
├── router/                 # AppRouter, ProtectedRoute, PublicRoute, AdminRoute
├── store/                  # authStore (Zustand)
├── lib/                    # firebase.ts, utils.ts
└── types/                  # Tipos globales

## Setup

1. Clonar e instalar:
```bash
npm install
```

2. Crear `.env` con credenciales de Firebase:
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

4. Build:
```bash
npm run build
```

## Deploy

Deployado en Vercel. Requiere:
- Variables de entorno de Firebase en Vercel Settings
- Dominio de Vercel agregado en Firebase Auth → Authorized domains
- Firestore rules para colecciones `budgets` y `custom-budgets`