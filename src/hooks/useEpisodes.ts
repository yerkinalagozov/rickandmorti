import { useQuery } from '@tanstack/react-query'
import { episodesApi } from '../services/api/episodes'
import type { EpisodeFilters } from '../types/episode'

export const useEpisodes = (filters: EpisodeFilters = {}) => {
  return useQuery({
    queryKey: ['episodes', filters],
    queryFn: () => episodesApi.getEpisodes(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useEpisode = (id: number) => {
  return useQuery({
    queryKey: ['episode', id],
    queryFn: () => episodesApi.getEpisode(id),
    enabled: Boolean(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useMultipleEpisodes = (ids: number[]) => {
  return useQuery({
    queryKey: ['episodes', 'multiple', ids.sort().join(',')],
    queryFn: () => episodesApi.getMultipleEpisodes(ids),
    enabled: ids.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}