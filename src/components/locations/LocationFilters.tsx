import React from 'react'
import { Input } from '../common/UI/Input'
import { Button } from '../common/UI/Button'
import type { LocationFilters } from '../../types/location'

interface LocationFiltersProps {
  filters: LocationFilters
  onChange: (filters: LocationFilters) => void
  onReset: () => void
}

export const LocationFiltersComponent: React.FC<LocationFiltersProps> = ({
  filters,
  onChange,
  onReset
}) => {
  const updateFilter = <K extends keyof LocationFilters>(
    key: K,
    value: LocationFilters[K]
  ) => {
    onChange({
      ...filters,
      [key]: value || undefined,
      page: 1, // Reset to first page when filters change
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && value !== 1
  )

  return (
    <div className="bg-[rgb(var(--color-foreground))] border border-[rgb(var(--color-border))] rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[rgb(var(--color-text))]">
          Location Filters
        </h3>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onReset}>
            Clear All
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search location by name..."
          value={filters.name || ''}
          onChange={(e) => updateFilter('name', e.target.value)}
        />
        
        <Input
          placeholder="Type (e.g., Planet, Dimension)..."
          value={filters.type || ''}
          onChange={(e) => updateFilter('type', e.target.value)}
        />
        
        <Input
          placeholder="Dimension (e.g., C-137)..."
          value={filters.dimension || ''}
          onChange={(e) => updateFilter('dimension', e.target.value)}
        />
      </div>
    </div>
  )
}