import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/common/UI/Button'
import { CharacterDetail } from '../components/characters/CharacterDetail'
import { useCharacter } from '../hooks/useCharacters'

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const characterId = id ? parseInt(id) : 0
  const { data: character, isLoading, error } = useCharacter(characterId)

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate('/characters')}
        >
          ← Back to Characters
        </Button>
        
        {character && (
          <div>
            <h1 className="text-2xl font-bold text-[rgb(var(--color-text))]">
              Character #{character.id}
            </h1>
          </div>
        )}
      </div>

      <CharacterDetail
        character={character!}
        loading={isLoading}
        error={error?.message}
      />
    </div>
  )
}

export default CharacterDetailPage
