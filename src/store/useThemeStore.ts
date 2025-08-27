import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  actualTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  getSystemTheme: () => 'light' | 'dark'
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyTheme = (theme: Theme) => {
  const actualTheme = theme === 'system' ? getSystemTheme() : theme
  document.documentElement.dataset.theme = actualTheme
  return actualTheme
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      actualTheme: 'light',
      getSystemTheme,
      setTheme: (theme) => {
        const actualTheme = applyTheme(theme)
        set({ theme, actualTheme })
      },
      toggleTheme: () => {
        const currentActual = get().actualTheme
        const newTheme = currentActual === 'light' ? 'dark' : 'light'
        get().setTheme(newTheme)
      },
    }),
    {
      name: 'rick-morty-theme',
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          const actualTheme = applyTheme(state.theme)
          // Update the actualTheme in the store after rehydration
          useThemeStore.setState({ actualTheme })
          
          // Listen for system theme changes if using system theme
          if (state.theme === 'system' && typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const handleChange = () => {
              if (useThemeStore.getState().theme === 'system') {
                const newActual = getSystemTheme()
                applyTheme('system')
                useThemeStore.setState({ actualTheme: newActual })
              }
            }
            mediaQuery.addEventListener('change', handleChange)
          }
        }
      },
    }
  )
)
