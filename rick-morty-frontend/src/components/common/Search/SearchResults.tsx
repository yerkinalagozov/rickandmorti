import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '../UI/Card'
import { PortalLoader } from '../UI/PortalLoader'
import type { SearchEntity } from './SearchFilters'
import type { Character } from '../../../types/character'
import type { Episode } from '../../../types/episode'
import type { Location } from '../../../types/location'

type SearchResult = Character | Episode | Location

interface SearchResultsProps {
  results: SearchResult[]
  entity: SearchEntity
  loading?: boolean
  error?: string | null
  query: string
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  entity,
  loading = false,
  error = null,
  query
}) => {
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <PortalLoader size="lg" />
        <p className="mt-4 text-[rgb(var(--color-text-secondary))]">
          Searching across infinite dimensions...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🛸</div>
        <h3 className="text-xl font-semibold text-[rgb(var(--color-text))] mb-2">
          Search Portal Malfunction!
        </h3>
        <p className="text-[rgb(var(--color-text-secondary))] text-center max-w-md">
          {error}
        </p>
      </div>
    )
  }

  if (!query.trim()) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-[rgb(var(--color-text))] mb-2">
          Ready to Search
        </h3>
        <p className="text-[rgb(var(--color-text-secondary))] text-center max-w-md">
          Enter a search term to discover {entity} from across the Rick and Morty multiverse.
        </p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h3 className="text-xl font-semibold text-[rgb(var(--color-text))] mb-2">
          No Results Found
        </h3>
        <p className="text-[rgb(var(--color-text-secondary))] text-center max-w-md">
          No {entity} found for "{query}". Try a different search term or check another category.
        </p>
      </div>
    )
  }

  const handleResultClick = (result: SearchResult) => {
    if (entity === 'characters') {
      navigate(`/characters/${result.id}`)
    }
    // Episodes and Locations don't have detail pages yet, so we don't navigate
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[rgb(var(--color-text))]">
          Found {results.length} {entity} for "{query}"
        </h3>
      </div>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {results.map((result, index) => (
          <SearchResultCard
            key={result.id}
            result={result}
            entity={entity}
            index={index}
            onClick={() => handleResultClick(result)}
          />
        ))}
      </motion.div>
    </div>
  )
}

interface SearchResultCardProps {
  result: SearchResult
  entity: SearchEntity
  index: number
  onClick: () => void
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  result,
  entity,
  index,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Card 
        className="p-4 h-full cursor-pointer" 
        onClick={entity === 'characters' ? onClick : undefined}
      >
        {entity === 'characters' && (
          <CharacterResultCard character={result as Character} />
        )}
        {entity === 'episodes' && (
          <EpisodeResultCard episode={result as Episode} />
        )}
        {entity === 'locations' && (
          <LocationResultCard location={result as Location} />
        )}
      </Card>
    </motion.div>
  )
}

const CharacterResultCard: React.FC<{ character: Character }> = ({ character }) => (
  <div className="space-y-3">
    <img
      src={character.image}
      alt={character.name}
      className="w-full h-32 object-cover rounded-md"
    />
    <div>
      <h4 className="font-semibold text-[rgb(var(--color-text))] line-clamp-1">
        {character.name}
      </h4>
      <p className="text-sm text-[rgb(var(--color-text-secondary))]">
        {character.status} • {character.species}
      </p>
    </div>
  </div>
)

const EpisodeResultCard: React.FC<{ episode: Episode }> = ({ episode }) => (
  <div className="space-y-3">
    <div className="h-32 bg-[rgb(var(--color-background))] rounded-md flex items-center justify-center">
      <div className="text-4xl">📺</div>
    </div>
    <div>
      <div className="text-sm text-[rgb(var(--color-primary))] font-medium mb-1">
        {episode.episode}
      </div>
      <h4 className="font-semibold text-[rgb(var(--color-text))] line-clamp-1">
        {episode.name}
      </h4>
      <p className="text-sm text-[rgb(var(--color-text-secondary))]">
        {episode.air_date}
      </p>
    </div>
  </div>
)

const LocationResultCard: React.FC<{ location: Location }> = ({ location }) => (
  <div className="space-y-3">
    <div className="h-32 bg-[rgb(var(--color-background))] rounded-md flex items-center justify-center">
      <div className="text-4xl">🌍</div>
    </div>
    <div>
      <div className="text-sm text-[rgb(var(--color-primary))] font-medium mb-1">
        {location.type}
      </div>
      <h4 className="font-semibold text-[rgb(var(--color-text))] line-clamp-1">
        {location.name}
      </h4>
      <p className="text-sm text-[rgb(var(--color-text-secondary))]">
        {location.dimension}
      </p>
    </div>
  </div>
)