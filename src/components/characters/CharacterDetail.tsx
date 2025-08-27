import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../common/UI/Button'
import { Card } from '../common/UI/Card'
import { PortalLoader } from '../common/UI/PortalLoader'
import { useFavoriteStore } from '../../store/useFavoriteStore'
import { useMultipleEpisodes } from '../../hooks/useEpisodes'
import type { Character } from '../../types/character'

interface CharacterDetailProps {
  character: Character
  loading?: boolean
  error?: string | null
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({
  character,
  loading = false,
  error = null
}) => {
  const { isFavoriteCharacter, toggleFavoriteCharacter } = useFavoriteStore()
  
  // Extract episode IDs from episode URLs
  const episodeIds = character?.episode.map(url => {
    const match = url.match(/\/episode\/(\d+)/)
    return match ? parseInt(match[1]) : null
  }).filter(Boolean) as number[] || []
  
  const { data: episodes, isLoading: episodesLoading } = useMultipleEpisodes(episodeIds)
  
  const isFavorite = character ? isFavoriteCharacter(character.id) : false

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <PortalLoader size="lg" />
        <p className="mt-4 text-[rgb(var(--color-text-secondary))]">
          Scanning across dimensions...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🛸</div>
        <h3 className="text-xl font-semibold text-[rgb(var(--color-text))] mb-2">
          Character Not Found
        </h3>
        <p className="text-[rgb(var(--color-text-secondary))] text-center max-w-md">
          This character might be in another dimension, or Rick destroyed their reality.
        </p>
      </div>
    )
  }

  if (!character) return null

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500'
      case 'dead':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="overflow-hidden">
        <div className="md:flex">
          {/* Character Image */}
          <div className="md:w-1/3">
            <div className="relative">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-64 md:h-full object-cover"
              />
              
              {/* Status Overlay */}
              <div className="absolute top-4 left-4">
                <span className={`
                  inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white
                  ${getStatusColor(character.status)}
                `}>
                  <span className="w-2 h-2 bg-white rounded-full mr-2" />
                  {character.status}
                </span>
              </div>
            </div>
          </div>
          
          {/* Character Info */}
          <div className="md:w-2/3 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-[rgb(var(--color-text))] mb-2">
                  {character.name}
                </h1>
                <p className="text-lg text-[rgb(var(--color-text-secondary))]">
                  {character.species} • {character.gender}
                </p>
              </div>
              
              <Button
                variant="ghost"
                onClick={() => toggleFavoriteCharacter(character.id)}
                className={`text-2xl ${isFavorite ? 'text-red-500' : ''}`}
              >
                {isFavorite ? '❤️' : '🤍'}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-[rgb(var(--color-text))] mb-2">Basic Info</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-[rgb(var(--color-text-secondary))]">Species:</span>
                    <span className="ml-2 text-[rgb(var(--color-text))]">{character.species}</span>
                  </div>
                  {character.type && (
                    <div>
                      <span className="font-medium text-[rgb(var(--color-text-secondary))]">Type:</span>
                      <span className="ml-2 text-[rgb(var(--color-text))]">{character.type}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-[rgb(var(--color-text-secondary))]">Gender:</span>
                    <span className="ml-2 text-[rgb(var(--color-text))]">{character.gender}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-[rgb(var(--color-text))] mb-2">Locations</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-[rgb(var(--color-text-secondary))]">Origin:</span>
                    <span className="ml-2 text-[rgb(var(--color-text))]">{character.origin.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[rgb(var(--color-text-secondary))]">Location:</span>
                    <span className="ml-2 text-[rgb(var(--color-text))]">{character.location.name}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-[rgb(var(--color-text))] mb-2">
                Episodes ({character.episode.length})
              </h3>
              
              {episodesLoading ? (
                <div className="flex items-center space-x-2">
                  <PortalLoader size="sm" />
                  <span className="text-sm text-[rgb(var(--color-text-secondary))]">
                    Loading episodes...
                  </span>
                </div>
              ) : (
                <div className="max-h-32 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {episodes?.map((episode) => (
                      <div
                        key={episode.id}
                        className="text-sm p-2 bg-[rgb(var(--color-background))] rounded border border-[rgb(var(--color-border))]"
                      >
                        <div className="font-medium text-[rgb(var(--color-text))]">
                          {episode.episode}
                        </div>
                        <div className="text-[rgb(var(--color-text-secondary))] truncate">
                          {episode.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}