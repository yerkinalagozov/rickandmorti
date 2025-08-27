import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteState {
  favoriteCharacters: Set<number>
  favoriteEpisodes: Set<number>
  favoriteLocations: Set<number>
  
  addFavoriteCharacter: (id: number) => void
  removeFavoriteCharacter: (id: number) => void
  toggleFavoriteCharacter: (id: number) => void
  isFavoriteCharacter: (id: number) => boolean
  
  addFavoriteEpisode: (id: number) => void
  removeFavoriteEpisode: (id: number) => void
  toggleFavoriteEpisode: (id: number) => void
  isFavoriteEpisode: (id: number) => boolean
  
  addFavoriteLocation: (id: number) => void
  removeFavoriteLocation: (id: number) => void
  toggleFavoriteLocation: (id: number) => void
  isFavoriteLocation: (id: number) => boolean
  
  clearAllFavorites: () => void
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favoriteCharacters: new Set(),
      favoriteEpisodes: new Set(),
      favoriteLocations: new Set(),
      
      addFavoriteCharacter: (id) => set((state) => ({
        favoriteCharacters: new Set([...state.favoriteCharacters, id])
      })),
      removeFavoriteCharacter: (id) => set((state) => {
        const newSet = new Set(state.favoriteCharacters)
        newSet.delete(id)
        return { favoriteCharacters: newSet }
      }),
      toggleFavoriteCharacter: (id) => {
        const { favoriteCharacters, addFavoriteCharacter, removeFavoriteCharacter } = get()
        if (favoriteCharacters.has(id)) {
          removeFavoriteCharacter(id)
        } else {
          addFavoriteCharacter(id)
        }
      },
      isFavoriteCharacter: (id) => get().favoriteCharacters.has(id),
      
      addFavoriteEpisode: (id) => set((state) => ({
        favoriteEpisodes: new Set([...state.favoriteEpisodes, id])
      })),
      removeFavoriteEpisode: (id) => set((state) => {
        const newSet = new Set(state.favoriteEpisodes)
        newSet.delete(id)
        return { favoriteEpisodes: newSet }
      }),
      toggleFavoriteEpisode: (id) => {
        const { favoriteEpisodes, addFavoriteEpisode, removeFavoriteEpisode } = get()
        if (favoriteEpisodes.has(id)) {
          removeFavoriteEpisode(id)
        } else {
          addFavoriteEpisode(id)
        }
      },
      isFavoriteEpisode: (id) => get().favoriteEpisodes.has(id),
      
      addFavoriteLocation: (id) => set((state) => ({
        favoriteLocations: new Set([...state.favoriteLocations, id])
      })),
      removeFavoriteLocation: (id) => set((state) => {
        const newSet = new Set(state.favoriteLocations)
        newSet.delete(id)
        return { favoriteLocations: newSet }
      }),
      toggleFavoriteLocation: (id) => {
        const { favoriteLocations, addFavoriteLocation, removeFavoriteLocation } = get()
        if (favoriteLocations.has(id)) {
          removeFavoriteLocation(id)
        } else {
          addFavoriteLocation(id)
        }
      },
      isFavoriteLocation: (id) => get().favoriteLocations.has(id),
      
      clearAllFavorites: () => set({
        favoriteCharacters: new Set(),
        favoriteEpisodes: new Set(),
        favoriteLocations: new Set(),
      }),
    }),
    {
      name: 'rick-morty-favorites',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const parsed = JSON.parse(str)
          return {
            ...parsed,
            state: {
              ...parsed.state,
              favoriteCharacters: new Set(parsed.state.favoriteCharacters || []),
              favoriteEpisodes: new Set(parsed.state.favoriteEpisodes || []),
              favoriteLocations: new Set(parsed.state.favoriteLocations || []),
            }
          }
        },
        setItem: (name, value) => {
          const serialized = {
            ...value,
            state: {
              ...value.state,
              favoriteCharacters: Array.from(value.state.favoriteCharacters),
              favoriteEpisodes: Array.from(value.state.favoriteEpisodes),
              favoriteLocations: Array.from(value.state.favoriteLocations),
            }
          }
          localStorage.setItem(name, JSON.stringify(serialized))
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)