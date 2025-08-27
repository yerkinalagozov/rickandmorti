import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../common/UI/Card'
import { Button } from '../common/UI/Button'
import { useFavoriteStore } from '../../store/useFavoriteStore'
import type { Location } from '../../types/location'

interface LocationCardProps {
  location: Location
  index?: number
}

export const LocationCard: React.FC<LocationCardProps> = ({ 
  location, 
  index = 0 
}) => {
  const { isFavoriteLocation, toggleFavoriteLocation } = useFavoriteStore()
  const isFavorite = isFavoriteLocation(location.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavoriteLocation(location.id)
  }

  const getLocationIcon = (type: string) => {
    const lowerType = type.toLowerCase()
    if (lowerType.includes('planet')) return '🪐'
    if (lowerType.includes('dimension')) return '🌌'
    if (lowerType.includes('space')) return '🚀'
    if (lowerType.includes('reality')) return '🌍'
    if (lowerType.includes('tv')) return '📺'
    if (lowerType.includes('dream')) return '💭'
    return '📍'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Card className="group h-full p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1">
            <div className="text-2xl">
              {getLocationIcon(location.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-[rgb(var(--color-text))] mb-1 line-clamp-2">
                {location.name}
              </h3>
              <p className="text-sm text-[rgb(var(--color-primary))] font-medium">
                {location.type}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className={`
              p-2 rounded-full ml-2 flex-shrink-0
              opacity-0 group-hover:opacity-100 transition-opacity
              ${isFavorite ? 'text-red-500' : 'text-[rgb(var(--color-text-secondary))]'}
            `}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '❤️' : '🤍'}
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-[rgb(var(--color-background))] rounded border border-[rgb(var(--color-border))]">
            <div className="text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wide mb-1">
              Dimension
            </div>
            <div className="text-sm text-[rgb(var(--color-text))] line-clamp-2">
              {location.dimension}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-[rgb(var(--color-text-secondary))]">Residents:</span>
            <span className="text-[rgb(var(--color-text))]">{location.residents.length}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[rgb(var(--color-text-secondary))]">
              Location #{location.id}
            </span>
            
            <motion.div
              className="text-[rgb(var(--color-primary))] opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
            >
              🌌
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}