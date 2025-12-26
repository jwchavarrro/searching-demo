/**
 * characters-starred-list.tsx
 * @description: Fragmento para renderizar el listado de personajes marcados como favoritos
 */

// Import of components custom
import { CardA, Message } from '@/components/atomic-desing/molecules'
import { Text } from '@/components/atomic-desing/atoms'

// Import of context
import { useCharactersStarred, useSelectedCharacter } from '@/context'

// Import of utils
import { ICONS } from '@/config'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type { SpecieFilterType } from '@/components/atomic-desing/organisms'
import {
  SpecieFilterValues,
  SpecieApiValues,
} from '@/components/atomic-desing/organisms/filter/utils'
import { useMemo } from 'react'

interface CharactersStarredListProps {
  readonly searchValue?: string
  readonly specieFilter?: SpecieFilterType
}

export function CharactersStarredList({
  searchValue = '',
  specieFilter = SpecieFilterValues.ALL,
}: CharactersStarredListProps) {
  // Implement context
  const { handleCharacterStarred, isCharacterStarred, charactersStarred } =
    useCharactersStarred()
  const { setSelectedCharacter } = useSelectedCharacter()

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

  if (!charactersStarred || charactersStarred.length === 0) {
    return (
      <Message
        icon={ICONS.alert}
        description={{ text: 'No characters starred yet' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  if (filteredStarredCharacters.length === 0) {
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
      <Text
        text={`STARRED CHARACTERS (${filteredStarredCharacters.length})`}
        weight="semibold"
      />
      <div>
        {filteredStarredCharacters.map((character: CharacterType) => (
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
