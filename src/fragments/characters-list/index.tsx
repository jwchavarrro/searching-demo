/**
 * characters-list.tsx
 * @description: Fragmento para renderizar el listado de personajes según el filtro de Character
 */

// Import of components custom
import { CardA, Message } from '@/components/atomic-desing/molecules'
import { Text } from '@/components/atomic-desing/atoms'

// Import of hooks
import { useFilteredCharacters } from './hooks'

// Import of context
import { useCharactersStarred, useSelectedCharacter } from '@/context'

// Import of utils
import { ICONS } from '@/config'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type { CharacterFilter } from '@/components/atomic-desing/organisms'

interface CharactersListProps {
  characterFilter?: CharacterFilter
}

export function CharactersList({
  characterFilter = 'others',
}: CharactersListProps) {
  // Implement custom hooks
  /* @name useFilteredCharacters
  @description: Hook para obtener los personajes filtrados según el filtro de Character
  */
  const { filteredCharacters, isLoading, error, data } = useFilteredCharacters({
    characterFilter,
  })

  // Implement context
  const { setSelectedCharacter } = useSelectedCharacter()
  const { handleCharacterStarred, isCharacterStarred } = useCharactersStarred()

  if (isLoading) {
    return (
      <Message
        icon={ICONS.loading}
        description={{ text: 'Loading characters...' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  if (error) {
    return (
      <Message
        icon={ICONS.alert}
        description={{
          text: 'An error occurred while loading the characters.',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  if (!data || data.results.length === 0) {
    return (
      <Message
        icon={ICONS.alert}
        description={{ text: 'No characters found' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  if (filteredCharacters.length === 0) {
    const getEmptyMessage = () => {
      switch (characterFilter) {
        case 'starred':
          return 'No starred characters found'
        case 'others':
          return 'All characters are starred'
        case 'all':
          return 'No characters available'
        default:
          return 'No characters found'
      }
    }

    return (
      <Message
        icon={ICONS.alert}
        description={{ text: getEmptyMessage() }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  return (
    <div className="min-h-0 space-y-2">
      <Text
        text={`CHARACTERS (${filteredCharacters.length})`}
        weight="semibold"
      />
      <div>
        {filteredCharacters.length > 0 &&
          filteredCharacters.map((character: CharacterType) => (
            <CardA
              key={character.id}
              as="button"
              onClick={() => setSelectedCharacter(character.name)}
              isStarred={isCharacterStarred(character.id)}
              onIconClick={() => handleCharacterStarred(character)}
              avatar={{
                src: character.image,
                alt: character.name,
                size: 'lg',
              }}
              title={{
                title: character.name,
              }}
              description={{
                text: character.species,
              }}
            />
          ))}
      </div>
    </div>
  )
}
