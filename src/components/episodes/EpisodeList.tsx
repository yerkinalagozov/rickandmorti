import React from 'react'
import { motion } from 'framer-motion'
import { EpisodeCard } from './EpisodeCard'
import { PortalLoader } from '../common/UI/PortalLoader'
import type { Episode } from '../../types/episode'

interface EpisodeListProps {
  episodes: Episode[]
  loading?: boolean
  error?: string | null
}

export const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  loading = false,
  error = null
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <PortalLoader size="lg" />
        <p className="mt-4 text-[rgb(var(--color-text-secondary))]">
          Loading episodes from across dimensions...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="text-xl font-semibold text-[rgb(var(--color-text))] mb-2">
          Interdimensional Cable Down!
        </h3>
        <p className="text-[rgb(var(--color-text-secondary))] text-center max-w-md">
          {error}
        </p>
      </div>
    )
  }

  if (episodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-[rgb(var(--color-text))] mb-2">
          No Episodes Found
        </h3>
        <p className="text-[rgb(var(--color-text-secondary))] text-center max-w-md">
          Try adjusting your filters to find episodes from other realities.
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
      {episodes.map((episode, index) => (
        <EpisodeCard
          key={episode.id}
          episode={episode}
          index={index}
        />
      ))}
    </motion.div>
  )
}