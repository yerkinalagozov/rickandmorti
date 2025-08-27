import React, { useState, useCallback } from 'react'
import { LocationList } from '../components/locations/LocationList'
import { LocationFiltersComponent } from '../components/locations/LocationFilters'
import { Pagination } from '../components/common/UI/Pagination'
import { useLocations } from '../hooks/useLocations'
import { useDebounce } from '../hooks/useDebounce'
import type { LocationFilters } from '../types/location'

const LocationsPage: React.FC = () => {
  const [filters, setFilters] = useState<LocationFilters>({
    page: 1
  })

  // Debounce search to avoid excessive API calls
  const debouncedFilters = useDebounce(filters, 500)
  
  const { data, isLoading, error } = useLocations(debouncedFilters)

  const handleFiltersChange = useCallback((newFilters: LocationFilters) => {
    setFilters(newFilters)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }))
  }, [])

  const handleResetFilters = useCallback(() => {
    setFilters({ page: 1 })
  }, [])

  const locations = data?.results || []
  const currentPage = debouncedFilters.page || 1
  const totalPages = data?.info.pages || 1
  const totalCount = data?.info.count || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[rgb(var(--color-text))] glitch-text">
            Locations
          </h1>
          <p className="text-[rgb(var(--color-text-secondary))] mt-1">
            Explore {totalCount} locations across infinite realities
          </p>
        </div>
      </div>

      <LocationFiltersComponent
        filters={filters}
        onChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      <LocationList
        locations={locations}
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

export default LocationsPage