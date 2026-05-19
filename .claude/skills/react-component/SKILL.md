---
name: react-component
description: Usá esta skill cuando el usuario pida crear un componente React, 
             un hook, o cualquier pieza de UI en TypeScript.
---

# Convenciones de componentes React

## Estructura obligatoria
- Siempre TypeScript strict, cero any
- Props tipadas con interface, nunca type inline
- Componentes funcionales con arrow function
- Exports nombrados, nunca default export

## Ejemplo de componente correcto
\```typescript
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export const Button = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
\```

## Hooks
- Siempre con useCallback para funciones
- useMemo solo cuando hay cálculo costoso
- Custom hooks en archivo separado con prefijo use