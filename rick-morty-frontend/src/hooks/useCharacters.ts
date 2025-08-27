import { useQuery } from '@tanstack/react-query'
import { charactersApi } from '../services/api/characters'
import type { CharacterFilters } from '../types/character'

export const useCharacters = (filters: CharacterFilters = {}) => {
  return useQuery({
    queryKey: ['characters', filters],
    queryFn: () => charactersApi.getCharacters(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => charactersApi.getCharacter(id),
    enabled: Boolean(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useMultipleCharacters = (ids: number[]) => {
  return useQuery({
    queryKey: ['characters', 'multiple', ids.sort().join(',')],
    queryFn: () => charactersApi.getMultipleCharacters(ids),
    enabled: ids.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}