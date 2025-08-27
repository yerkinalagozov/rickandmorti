import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../common/UI/Card'
import { Button } from '../common/UI/Button'
import { useFavoriteStore } from '../../store/useFavoriteStore'
import type { Episode } from '../../types/episode'

interface EpisodeCardProps {
  episode: Episode
  index?: number
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ 
  episode, 
  index = 0 
}) => {
  const { isFavoriteEpisode, toggleFavoriteEpisode } = useFavoriteStore()
  const isFavorite = isFavoriteEpisode(episode.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavoriteEpisode(episode.id)
  }

  const getSeasonFromEpisode = (episodeCode: string) => {
    const match = episodeCode.match(/S(\d+)/)
    return match ? `Season ${match[1]}` : 'Unknown Season'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Card className="group h-full p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="text-sm text-[rgb(var(--color-primary))] font-medium mb-1">
              {episode.episode}
            </div>
            <h3 className="text-lg font-semibold text-[rgb(var(--color-text))] mb-2 line-clamp-2">
              {episode.name}
            </h3>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className={`
              p-2 rounded-full ml-2
              opacity-0 group-hover:opacity-100 transition-opacity
              ${isFavorite ? 'text-red-500' : 'text-[rgb(var(--color-text-secondary))]'}
            `}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '❤️' : '🤍'}
          </Button>
        </div>
        
        <div className="space-y-2 text-sm text-[rgb(var(--color-text-secondary))]">
          <div className="flex items-center justify-between">
            <span className="font-medium">Air Date:</span>
            <span>{episode.air_date}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-medium">Season:</span>
            <span>{getSeasonFromEpisode(episode.episode)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-medium">Characters:</span>
            <span>{episode.characters.length}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[rgb(var(--color-text-secondary))]">
              Episode #{episode.id}
            </span>
            
            <motion.div
              className="text-[rgb(var(--color-primary))] opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
            >
              📺
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}