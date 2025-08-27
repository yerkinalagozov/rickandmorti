import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SearchEntity } from '../components/common/Search/SearchFilters'

interface SearchState {
  query: string
  entity: SearchEntity
  recentSearches: string[]
  
  setQuery: (query: string) => void
  setEntity: (entity: SearchEntity) => void
  addRecentSearch: (query: string) => void
  clearRecentSearches: () => void
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      entity: 'characters',
      recentSearches: [],
      
      setQuery: (query) => set({ query }),
      
      setEntity: (entity) => set({ entity }),
      
      addRecentSearch: (query) => {
        if (!query.trim()) return
        
        const { recentSearches } = get()
        const filtered = recentSearches.filter(search => search !== query.trim())
        const updated = [query.trim(), ...filtered].slice(0, 10) // Keep last 10 searches
        
        set({ recentSearches: updated })
      },
      
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'rick-morty-search',
    }
  )
)