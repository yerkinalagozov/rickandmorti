import React, { useState, useCallback } from 'react'
import { EpisodeList } from '../components/episodes/EpisodeList'
import { EpisodeFiltersComponent } from '../components/episodes/EpisodeFilters'
import { Pagination } from '../components/common/UI/Pagination'
import { useEpisodes } from '../hooks/useEpisodes'
import { useDebounce } from '../hooks/useDebounce'
import type { EpisodeFilters } from '../types/episode'

const EpisodesPage: React.FC = () => {
  const [filters, setFilters] = useState<EpisodeFilters>({
    page: 1
  })

  // Debounce search to avoid excessive API calls
  const debouncedFilters = useDebounce(filters, 500)
  
  const { data, isLoading, error } = useEpisodes(debouncedFilters)

  const handleFiltersChange = useCallback((newFilters: EpisodeFilters) => {
    setFilters(newFilters)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }))
  }, [])

  const handleResetFilters = useCallback(() => {
    setFilters({ page: 1 })
  }, [])

  const episodes = data?.results || []
  const currentPage = debouncedFilters.page || 1
  const totalPages = data?.info.pages || 1
  const totalCount = data?.info.count || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[rgb(var(--color-text))] glitch-text">
            Episodes
          </h1>
          <p className="text-[rgb(var(--color-text-secondary))] mt-1">
            Watch all {totalCount} episodes from across dimensions
          </p>
        </div>
      </div>

      <EpisodeFiltersComponent
        filters={filters}
        onChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      <EpisodeList
        episodes={episodes}
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

export default EpisodesPage