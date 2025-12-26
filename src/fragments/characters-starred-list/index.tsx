/**
 * characters-starred-list.tsx
 * @description: Fragmento para renderizar el listado de personajes marcados como favoritos
 */

import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

// Import of components custom
import { Text } from '@/components/atomic-desing/atoms'
import { SortOrder } from '@/fragments/components'
import { CardA, Message } from '@/components/atomic-desing/molecules'

// Import of hooks
import { useSortedCharacters } from '@/fragments/hooks'

// Import of context
import { useCharactersStarred, useSelectedCharacter } from '@/context'

// Import of utils
import { ICONS } from '@/config'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type { SpecieFilterType } from '@/fragments/components/filter/utils'
import {
  SpecieFilterValues,
  SpecieApiValues,
} from '@/fragments/components/filter/utils'
import type { SortOrderType } from '@/fragments/components/sort-order/utils'

interface CharactersStarredListProps {
  readonly searchValue?: string
  readonly specieFilter?: SpecieFilterType
  readonly sortOrder?: SortOrderType
  readonly onSortChange?: (order: SortOrderType) => void
}

export function CharactersStarredList({
  searchValue = '',
  specieFilter = SpecieFilterValues.ALL,
  sortOrder = 'asc',
  onSortChange,
}: CharactersStarredListProps) {
  // Implement context
  const { handleCharacterStarred, isCharacterStarred, charactersStarred } =
    useCharactersStarred()
  const { setSelectedCharacter } = useSelectedCharacter()
  const navigate = useNavigate()

  // Handler para seleccionar un personaje
  const handleCharacterSelect = (characterName: string) => {
    setSelectedCharacter(characterName)
    // Navegar a la ruta del personaje
    const encodedName = encodeURIComponent(characterName)
    navigate(`/character/${encodedName}`)
  }

  // Normalizar y validar búsqueda
  const trimmedSearch = searchValue.trim()
  const hasSearch = trimmedSearch.length > 0

  // Aplicar filtros sobre los personajes starred
  const filteredStarredCharacters = useMemo(() => {
    if (!charactersStarred || charactersStarred.length === 0) {
      return []
    }

    let result = charactersStarred

    // Filtrar por búsqueda: solo nombres que empiezan con el texto
    if (hasSearch) {
      const searchLower = trimmedSearch.toLowerCase()
      result = result.filter(character =>
        character.name.toLowerCase().startsWith(searchLower)
      )
    }

    // Filtrar por especie
    if (specieFilter === SpecieFilterValues.HUMAN) {
      result = result.filter(
        character =>
          character.species.toLowerCase() ===
          SpecieApiValues.HUMAN.toLowerCase()
      )
    } else if (specieFilter === SpecieFilterValues.ALIEN) {
      result = result.filter(
        character =>
          character.species.toLowerCase() !==
          SpecieApiValues.HUMAN.toLowerCase()
      )
    }
    // Si es 'all', no filtrar por especie

    return result
  }, [charactersStarred, hasSearch, trimmedSearch, specieFilter])

  // Ordenar los personajes starred filtrados
  const sortedStarredCharacters = useSortedCharacters({
    characters: filteredStarredCharacters,
    sortOrder,
  })

  if (!charactersStarred || charactersStarred.length === 0) {
    return (
      <Message
        icon={ICONS.alert}
        description={{ text: 'No characters starred yet' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  if (sortedStarredCharacters.length === 0) {
    return (
      <Message
        icon={ICONS.alert}
        description={{ text: 'No starred characters match the filters' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  return (
    <div className="min-h-0 space-y-2">
      <div className="flex items-center justify-between">
        <Text
          text={`STARRED CHARACTERS (${sortedStarredCharacters.length})`}
          weight="semibold"
        />
        <SortOrder sortOrder={sortOrder} onSortChange={onSortChange} />
      </div>
      <div>
        {sortedStarredCharacters.map((character: CharacterType) => (
          <CardA
            key={character.id}
            as="button"
            onClick={() => handleCharacterSelect(character.name)}
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
