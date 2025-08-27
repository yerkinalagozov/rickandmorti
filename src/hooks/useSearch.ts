import { useQuery } from '@tanstack/react-query'
import { charactersApi } from '../services/api/characters'
import { episodesApi } from '../services/api/episodes'
import { locationsApi } from '../services/api/locations'
import type { SearchEntity } from '../components/common/Search/SearchFilters'

export const useSearch = (entity: SearchEntity, query: string) => {
  return useQuery({
    queryKey: ['search', entity, query],
    queryFn: async () => {
      if (!query.trim()) return { results: [] }
      
      switch (entity) {
        case 'characters':
          const charactersResponse = await charactersApi.getCharacters({ name: query, page: 1 })
          return charactersResponse
        case 'episodes':
          const episodesResponse = await episodesApi.getEpisodes({ name: query, page: 1 })
          return episodesResponse
        case 'locations':
          const locationsResponse = await locationsApi.getLocations({ name: query, page: 1 })
          return locationsResponse
        default:
          return { results: [] }
      }
    },
    enabled: Boolean(query.trim()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}