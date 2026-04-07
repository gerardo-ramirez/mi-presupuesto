Actuá como: Senior Frontend Ops / Architect experto en Tailwind 4.
Contexto: Inicializar un proyecto desde cero usando el stack: React 19, Vite 6, TS.

Tarea 1: Comandos de Instalación
Generá un único comando para instalar todas estas dependencias:
• Core: react-router-dom, zustand, @tanstack/react-query, lucide-react.
• Forms: react-hook-form, @hookform/resolvers, zod, firebase.
• UI: class-variance-authority, clsx, tailwind-merge.
• Dev: tailwindcss, @tailwindcss/vite (Configuración para Tailwind 4).

Tarea 2: Configuración de Tailwind 4 y Vite
1. IMPORTANTE: Tailwind 4 es ZERO-CONFIG. Prohibido generar tailwind.config.ts.
2. Generá el contenido de vite.config.ts incluyendo:
- El plugin @tailwindcss/vite.
- La configuración de resolve.alias para que "@/" apunte a "./src" (usando path.resolve).
3. Generá el contenido de src/index.css:
- Solo debe tener la directiva @import "tailwindcss";
- Prohibido usar @layer personalizado (no es compatible con el plugin de Vite en v4).

Tarea 3: Estructura de Carpetas (Clean Architecture)
Generá un comando mkdir para crear structura siguiento este patrón:
src/
├── components/
│   ├── shared/
│   ├── layout/
│   └── ui/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── schemas/
│   │   └── types/
│   └── budget/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── adapters/
│       ├── schemas/
│       └── types/
├── hooks/
├── pages/
├── router/
├── store/
├── lib/
└── types/



Tarea 4: Archivos Base
Generá el contenido de:
1. src/lib/utils.ts: La función cn() usando clsx y twMerge.
2. src/main.tsx: Inicial con QueryClientProvider y BrowserRouter, importando index.css.
3. tsconfig.json (compilerOptions.paths): Configuración del alias "@/*".

Salida: Solo comandos de terminal y bloques de código listos para copiar/pegar.