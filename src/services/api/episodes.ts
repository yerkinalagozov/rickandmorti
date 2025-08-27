import { apiClient } from './client'
import type { Episode, EpisodeFilters } from '../../types/episode'
import type { ApiResponse } from '../../types/api'

export const episodesApi = {
  async getEpisodes(filters: EpisodeFilters = {}): Promise<ApiResponse<Episode>> {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
    )
    
    const response = await apiClient.axios.get('/episode', { 
      params: cleanFilters 
    })
    return response.data
  },

  async getEpisode(id: number): Promise<Episode> {
    const response = await apiClient.axios.get(`/episode/${id}`)
    return response.data
  },

  async getMultipleEpisodes(ids: number[]): Promise<Episode[]> {
    if (ids.length === 0) return []
    if (ids.length === 1) return [await this.getEpisode(ids[0])]
    
    const response = await apiClient.axios.get(`/episode/${ids.join(',')}`)
    return Array.isArray(response.data) ? response.data : [response.data]
  }
}