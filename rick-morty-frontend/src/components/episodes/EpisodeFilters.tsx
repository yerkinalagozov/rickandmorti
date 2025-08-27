import React from 'react'
import { Input } from '../common/UI/Input'
import { Button } from '../common/UI/Button'
import type { EpisodeFilters } from '../../types/episode'

interface EpisodeFiltersProps {
  filters: EpisodeFilters
  onChange: (filters: EpisodeFilters) => void
  onReset: () => void
}

export const EpisodeFiltersComponent: React.FC<EpisodeFiltersProps> = ({
  filters,
  onChange,
  onReset
}) => {
  const updateFilter = <K extends keyof EpisodeFilters>(
    key: K,
    value: EpisodeFilters[K]
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
          Episode Filters
        </h3>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onReset}>
            Clear All
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Search episode by name..."
          value={filters.name || ''}
          onChange={(e) => updateFilter('name', e.target.value)}
        />
        
        <Input
          placeholder="Episode code (e.g., S01E01)..."
          value={filters.episode || ''}
          onChange={(e) => updateFilter('episode', e.target.value)}
        />
      </div>
    </div>
  )
}