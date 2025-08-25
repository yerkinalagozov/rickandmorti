import { create } from 'zustand'

type Theme = 'light' | 'dark'

type ThemeState = {
  theme: Theme
  toggle: () => void
}

const initial = (localStorage.getItem('theme') as Theme) || 'light'

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: initial,
  toggle: () => {
    const next: Theme = get().theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', next)
    set({ theme: next })
  }
}))
