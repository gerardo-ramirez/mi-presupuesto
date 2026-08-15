import { useState, useCallback } from 'react'
import { getCurrentTheme, toggleTheme as toggleThemeUtil, type Theme } from '@/lib/theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getCurrentTheme())

  const toggleTheme = useCallback(() => {
    setTheme(toggleThemeUtil())
  }, [])

  return { theme, toggleTheme }
}
