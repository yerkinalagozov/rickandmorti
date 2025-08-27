import axios from 'axios'

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000
})

export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  image: string
  episode: string[]
  url: string
  created: string
}

export interface ApiResponse<T> {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: T[]
}

export interface CharacterFilters {
  name?: string
  status?: 'alive' | 'dead' | 'unknown'
  species?: string
  type?: string
  gender?: 'female' | 'male' | 'genderless' | 'unknown'
  page?: number
}

export const rickMortyApi = {
  async getCharacters(filters: CharacterFilters = {}): Promise<ApiResponse<Character>> {
    const response = await api.get('/character', { params: filters })
    return response.data
  },

  async getCharacter(id: number): Promise<Character> {
    const response = await api.get(`/character/${id}`)
    return response.data
  },

  async searchCharacters(name: string, page = 1): Promise<ApiResponse<Character>> {
    return this.getCharacters({ name, page })
  }
}