import { create } from 'zustand'
import type { CharacterFilters } from '../types/character'
import type { EpisodeFilters } from '../types/episode'
import type { LocationFilters } from '../types/location'

interface FilterState {
  characterFilters: CharacterFilters
  episodeFilters: EpisodeFilters
  locationFilters: LocationFilters
  
  setCharacterFilters: (filters: CharacterFilters) => void
  setEpisodeFilters: (filters: EpisodeFilters) => void
  setLocationFilters: (filters: LocationFilters) => void
  
  resetCharacterFilters: () => void
  resetEpisodeFilters: () => void
  resetLocationFilters: () => void
  resetAllFilters: () => void
}

const initialCharacterFilters: CharacterFilters = {}
const initialEpisodeFilters: EpisodeFilters = {}
const initialLocationFilters: LocationFilters = {}

export const useFilterStore = create<FilterState>((set) => ({
  characterFilters: initialCharacterFilters,
  episodeFilters: initialEpisodeFilters,
  locationFilters: initialLocationFilters,
  
  setCharacterFilters: (filters) => set({ characterFilters: filters }),
  setEpisodeFilters: (filters) => set({ episodeFilters: filters }),
  setLocationFilters: (filters) => set({ locationFilters: filters }),
  
  resetCharacterFilters: () => set({ characterFilters: initialCharacterFilters }),
  resetEpisodeFilters: () => set({ episodeFilters: initialEpisodeFilters }),
  resetLocationFilters: () => set({ locationFilters: initialLocationFilters }),
  resetAllFilters: () => set({
    characterFilters: initialCharacterFilters,
    episodeFilters: initialEpisodeFilters,
    locationFilters: initialLocationFilters,
  }),
}))