import { apiClient } from './client'
import type { Character, CharacterFilters } from '../../types/character'
import type { ApiResponse } from '../../types/api'

export const charactersApi = {
  async getCharacters(filters: CharacterFilters = {}): Promise<ApiResponse<Character>> {
    // Client-side validation like the backend
    await apiClient.validateFilters(filters)
    
    // Clean up filters
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
    )
    
    const response = await apiClient.axios.get('/character', { 
      params: cleanFilters 
    })
    return response.data
  },

  async getCharacter(id: number): Promise<Character> {
    const response = await apiClient.axios.get(`/character/${id}`)
    return response.data
  },

  async getMultipleCharacters(ids: number[]): Promise<Character[]> {
    if (ids.length === 0) return []
    if (ids.length === 1) return [await this.getCharacter(ids[0])]
    
    const response = await apiClient.axios.get(`/character/${ids.join(',')}`)
    return Array.isArray(response.data) ? response.data : [response.data]
  },

  async searchCharacters(name: string, page = 1): Promise<ApiResponse<Character>> {
    return this.getCharacters({ name, page })
  }
}