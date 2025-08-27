import React from 'react'
import { Input } from '../common/UI/Input'
import { Select } from '../common/UI/Select'
import { Button } from '../common/UI/Button'
import type { CharacterFilters } from '../../types/character'

interface CharacterFiltersProps {
  filters: CharacterFilters
  onChange: (filters: CharacterFilters) => void
  onReset: () => void
}

export const CharacterFiltersComponent: React.FC<CharacterFiltersProps> = ({
  filters,
  onChange,
  onReset
}) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' },
  ]

  const genderOptions = [
    { value: '', label: 'All Genders' },
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'genderless', label: 'Genderless' },
    { value: 'unknown', label: 'Unknown' },
  ]

  const updateFilter = <K extends keyof CharacterFilters>(
    key: K,
    value: CharacterFilters[K]
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
          Filters
        </h3>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onReset}>
            Clear All
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder="Search by name..."
          value={filters.name || ''}
          onChange={(e) => updateFilter('name', e.target.value)}
        />
        
        <Select
          placeholder="Status"
          options={statusOptions}
          value={filters.status || ''}
          onChange={(e) => updateFilter('status', e.target.value as CharacterFilters['status'])}
        />
        
        <Select
          placeholder="Gender"
          options={genderOptions}
          value={filters.gender || ''}
          onChange={(e) => updateFilter('gender', e.target.value as CharacterFilters['gender'])}
        />
        
        <Input
          placeholder="Species..."
          value={filters.species || ''}
          onChange={(e) => updateFilter('species', e.target.value)}
        />
      </div>
      
      <div className="mt-4">
        <Input
          placeholder="Type..."
          value={filters.type || ''}
          onChange={(e) => updateFilter('type', e.target.value)}
        />
      </div>
    </div>
  )
}