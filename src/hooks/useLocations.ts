import { useQuery } from '@tanstack/react-query'
import { locationsApi } from '../services/api/locations'
import type { LocationFilters } from '../types/location'

export const useLocations = (filters: LocationFilters = {}) => {
  return useQuery({
    queryKey: ['locations', filters],
    queryFn: () => locationsApi.getLocations(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useLocation = (id: number) => {
  return useQuery({
    queryKey: ['location', id],
    queryFn: () => locationsApi.getLocation(id),
    enabled: Boolean(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useMultipleLocations = (ids: number[]) => {
  return useQuery({
    queryKey: ['locations', 'multiple', ids.sort().join(',')],
    queryFn: () => locationsApi.getMultipleLocations(ids),
    enabled: ids.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}