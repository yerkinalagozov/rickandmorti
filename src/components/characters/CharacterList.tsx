import React from 'react'
import { motion } from 'framer-motion'
import { CharacterCard } from './CharacterCard'
import { CharacterCardSkeleton } from './CharacterCardSkeleton'
import { Loader } from '../common/UI/Loader'
import type { Character } from '../../types/character'

interface CharacterListProps {
  characters: Character[]
  loading?: boolean
  error?: string | null
}

export const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  loading = false,
  error = null
}) => {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="loading-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <CharacterCardSkeleton key={index} index={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🛸</div>
        <h3 className="text-xl font-semibold text-text mb-2">
          Portal Malfunction!
        </h3>
        <p className="text-textSecondary text-center max-w-md">
          {error}
        </p>
      </div>
    )
  }

  if (characters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-text mb-2">
          No Characters Found
        </h3>
        <p className="text-textSecondary text-center max-w-md">
          Try adjusting your filters to discover characters from other dimensions.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          index={index}
        />
      ))}
    </motion.div>
  )
}