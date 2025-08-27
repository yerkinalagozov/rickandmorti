import React from 'react'
import { Button } from '../UI/Button'

const ENTITY_OPTIONS = [
  { value: 'characters', label: 'Characters', icon: '👨‍🔬' },
  { value: 'episodes', label: 'Episodes', icon: '📺' },
  { value: 'locations', label: 'Locations', icon: '🌍' },
] as const

export type SearchEntity = typeof ENTITY_OPTIONS[number]['value']

interface SearchFiltersProps {
  selectedEntity: SearchEntity
  onEntityChange: (entity: SearchEntity) => void
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  selectedEntity,
  onEntityChange
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {ENTITY_OPTIONS.map(({ value, label, icon }) => (
        <Button
          key={value}
          variant={selectedEntity === value ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onEntityChange(value)}
          className="flex items-center space-x-2"
        >
          <span>{icon}</span>
          <span>{label}</span>
        </Button>
      ))}
    </div>
  )
}