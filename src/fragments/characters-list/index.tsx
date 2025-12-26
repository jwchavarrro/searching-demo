/**
 * characters-list.tsx
 * @description: Fragmento para renderizar el listado de personajes según el filtro de Character
 */

// Import of components custom
import { SortOrder } from '@/fragments/components'
import { Text } from '@/components/atomic-desing/atoms'
import { CardA, Message } from '@/components/atomic-desing/molecules'

// Import of hooks
import { useFilteredCharacters } from './hooks'
import { useSortedCharacters } from '@/fragments/hooks'

// Import of context
import { useCharactersStarred, useSelectedCharacter } from '@/context'

// Import of utils
import { ICONS } from '@/config'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type {
  CharacterFilterType,
  SpecieFilterType,
} from '@/fragments/components/filter/utils'
import type { SortOrderType } from '@/fragments/components/sort-order/utils'

interface CharactersListProps {
  readonly characterFilter?: CharacterFilterType
  readonly specieFilter?: SpecieFilterType
  readonly searchValue?: string
  readonly sortOrder?: SortOrderType
  readonly onSortChange?: (order: SortOrderType) => void
}

export function CharactersList({
  characterFilter = 'others',
  specieFilter = 'all',
  searchValue = '',
  sortOrder = 'asc',
  onSortChange,
}: CharactersListProps) {
  // Implement custom hooks
  /* @name useFilteredCharacters
  @description: Hook para obtener los personajes filtrados según búsqueda, Character y Specie
  */
  const { filteredCharacters, isLoading, error, data } = useFilteredCharacters({
    characterFilter,
    specieFilter,
    searchValue,
  })

  // Ordenar los personajes filtrados
  const sortedCharacters = useSortedCharacters({
    characters: filteredCharacters,
    sortOrder,
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
      <div className="flex items-center justify-between">
        <Text
          text={`CHARACTERS (${sortedCharacters.length})`}
          weight="semibold"
        />
        <SortOrder sortOrder={sortOrder} onSortChange={onSortChange} />
      </div>
      <div>
        {sortedCharacters.length > 0 &&
          sortedCharacters.map((character: CharacterType) => (
            <CardA
              key={character.id}
              as="button"
              onClick={() => setSelectedCharacter(character.name)}
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
              isStarred={{
                status: isCharacterStarred(character.id),
                onIconClick: () => handleCharacterStarred(character),
              }}
            />
          ))}
      </div>
    </div>
  )
}
