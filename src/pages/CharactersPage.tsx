import React, { useState, useCallback } from 'react'
import { CharacterList } from '../components/characters/CharacterList'
import { CharacterFiltersComponent } from '../components/characters/CharacterFilters'
import { Pagination } from '../components/common/UI/Pagination'
import { useCharacters } from '../hooks/useCharacters'
import { useDebounce } from '../hooks/useDebounce'
import type { CharacterFilters } from '../types/character'

const CharactersPage: React.FC = () => {
  const [filters, setFilters] = useState<CharacterFilters>({
    page: 1
  })

  // Debounce search to avoid excessive API calls
  const debouncedFilters = useDebounce(filters, 500)
  
  const { data, isLoading, error } = useCharacters(debouncedFilters)

  const handleFiltersChange = useCallback((newFilters: CharacterFilters) => {
    setFilters(newFilters)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }))
  }, [])

  const handleResetFilters = useCallback(() => {
    setFilters({ page: 1 })
  }, [])

  const characters = data?.results || []
  const currentPage = debouncedFilters.page || 1
  const totalPages = data?.info.pages || 1
  const totalCount = data?.info.count || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[rgb(var(--color-text))] glitch-text">
            Characters
          </h1>
          <p className="text-[rgb(var(--color-text-secondary))] mt-1">
            Discover {totalCount} characters from across the multiverse
          </p>
        </div>
      </div>

      <CharacterFiltersComponent
        filters={filters}
        onChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      <CharacterList
        characters={characters}
        loading={isLoading}
        error={error?.message}
      />

      {totalPages > 1 && !isLoading && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}

export default CharactersPage