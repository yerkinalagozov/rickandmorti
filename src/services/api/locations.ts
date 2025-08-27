import { apiClient } from './client'
import type { Location, LocationFilters } from '../../types/location'
import type { ApiResponse } from '../../types/api'

export const locationsApi = {
  async getLocations(filters: LocationFilters = {}): Promise<ApiResponse<Location>> {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
    )
    
    const response = await apiClient.axios.get('/location', { 
      params: cleanFilters 
    })
    return response.data
  },

  async getLocation(id: number): Promise<Location> {
    const response = await apiClient.axios.get(`/location/${id}`)
    return response.data
  },

  async getMultipleLocations(ids: number[]): Promise<Location[]> {
    if (ids.length === 0) return []
    if (ids.length === 1) return [await this.getLocation(ids[0])]
    
    const response = await apiClient.axios.get(`/location/${ids.join(',')}`)
    return Array.isArray(response.data) ? response.data : [response.data]
  }
}