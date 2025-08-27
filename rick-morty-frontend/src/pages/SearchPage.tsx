import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchBar } from '../components/common/Search/SearchBar'
import { SearchFilters, type SearchEntity } from '../components/common/Search/SearchFilters'
import { SearchResults } from '../components/common/Search/SearchResults'
import { useSearch } from '../hooks/useSearch'
import { useSearchStore } from '../store/useSearchStore'
import { useDebounce } from '../hooks/useDebounce'

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { 
    query: storeQuery, 
    entity: storeEntity, 
    setQuery: setStoreQuery, 
    setEntity: setStoreEntity,
    addRecentSearch,
    recentSearches,
    clearRecentSearches
  } = useSearchStore()

  // Initialize from URL params or store
  const [query, setQuery] = useState(searchParams.get('q') || storeQuery)
  const [entity, setEntity] = useState<SearchEntity>(
    (searchParams.get('entity') as SearchEntity) || storeEntity
  )

  // Debounce query to avoid excessive API calls during typing
  const debouncedQuery = useDebounce(query, 300)
  
  const { data, isLoading, error } = useSearch(entity, debouncedQuery)

  // Update URL and store when query/entity changes
  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedQuery.trim()) params.set('q', debouncedQuery.trim())
    if (entity !== 'characters') params.set('entity', entity)
    
    setSearchParams(params, { replace: true })
    setStoreQuery(debouncedQuery)
    setStoreEntity(entity)
  }, [debouncedQuery, entity, setSearchParams, setStoreQuery, setStoreEntity])

  const handleSearch = () => {
    if (query.trim()) {
      addRecentSearch(query.trim())
    }
  }

  const handleEntityChange = (newEntity: SearchEntity) => {
    setEntity(newEntity)
  }

  const handleRecentSearchClick = (recentQuery: string) => {
    setQuery(recentQuery)
    addRecentSearch(recentQuery)
  }

  const results = data?.results || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[rgb(var(--color-text))] glitch-text mb-2">
          Multiverse Search
        </h1>
        <p className="text-[rgb(var(--color-text-secondary))]">
          Search across characters, episodes, and locations from infinite realities
        </p>
      </div>

      <div className="space-y-4">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          loading={isLoading}
        />
        
        <div className="flex items-center justify-between">
          <SearchFilters
            selectedEntity={entity}
            onEntityChange={handleEntityChange}
          />
        </div>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && !debouncedQuery.trim() && (
        <div className="bg-[rgb(var(--color-foreground))] border border-[rgb(var(--color-border))] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[rgb(var(--color-text))]">
              Recent Searches
            </h3>
            <button
              onClick={clearRecentSearches}
              className="text-xs text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((recentQuery, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearchClick(recentQuery)}
                className="px-3 py-1 text-sm bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-full hover:border-[rgb(var(--color-primary))] transition-colors"
              >
                {recentQuery}
              </button>
            ))}
          </div>
        </div>
      )}

      <SearchResults
        results={results}
        entity={entity}
        loading={isLoading}
        error={error?.message}
        query={debouncedQuery}
      />
    </div>
  )
}

export default SearchPage