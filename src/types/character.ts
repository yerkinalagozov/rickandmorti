export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface CharacterFilters {
  name?: string
  status?: 'alive' | 'dead' | 'unknown'
  species?: string
  type?: string
  gender?: 'female' | 'male' | 'genderless' | 'unknown'
  page?: number
}