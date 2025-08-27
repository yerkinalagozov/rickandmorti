import React from 'react'
import { Input } from '../UI/Input'
import { Button } from '../UI/Button'

interface SearchBarProps {
  query: string
  onQueryChange: (query: string) => void
  onSearch: () => void
  placeholder?: string
  loading?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onSearch,
  placeholder = "Search across the multiverse...",
  loading = false
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="text-lg"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        loading={loading}
        disabled={!query.trim()}
      >
        🔍 Search
      </Button>
    </form>
  )
}