import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '../common/UI/Card'
import { Button } from '../common/UI/Button'
import { useFavoriteStore } from '../../store/useFavoriteStore'
import type { Character } from '../../types/character'

interface CharacterCardProps {
  character: Character
  index?: number
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  index = 0 
}) => {
  const navigate = useNavigate()
  const { isFavoriteCharacter, toggleFavoriteCharacter } = useFavoriteStore()
  
  const isFavorite = isFavoriteCharacter(character.id)
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'text-green-500'
      case 'dead':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavoriteCharacter(character.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Card 
        className="group h-full"
        onClick={() => navigate(`/characters/${character.id}`)}
      >
        <div className="relative">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`
              absolute top-2 right-2 p-2 rounded-full
              bg-black/50 hover:bg-black/70 backdrop-blur-sm
              opacity-0 group-hover:opacity-100 transition-opacity
              ${isFavorite ? 'text-red-500' : 'text-white'}
            `}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '❤️' : '🤍'}
          </Button>
          
          {/* Status Indicator */}
          <div className="absolute bottom-2 left-2">
            <span className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              bg-black/50 backdrop-blur-sm text-white
            `}>
              <span className={`w-2 h-2 rounded-full mr-1 ${getStatusColor(character.status)}`}>
                <span className="block w-full h-full bg-current rounded-full" />
              </span>
              {character.status}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[rgb(var(--color-text))] mb-2 line-clamp-1">
            {character.name}
          </h3>
          
          <div className="space-y-1 text-sm text-[rgb(var(--color-text-secondary))]">
            <p>
              <span className="font-medium">Species:</span> {character.species}
            </p>
            {character.type && (
              <p>
                <span className="font-medium">Type:</span> {character.type}
              </p>
            )}
            <p>
              <span className="font-medium">Gender:</span> {character.gender}
            </p>
            <p>
              <span className="font-medium">Origin:</span> 
              <span className="ml-1 line-clamp-1">{character.origin.name}</span>
            </p>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-[rgb(var(--color-text-secondary))]">
              {character.episode.length} episode{character.episode.length !== 1 ? 's' : ''}
            </span>
            
            <motion.div
              className="text-[rgb(var(--color-primary))] opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
            >
              →
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}