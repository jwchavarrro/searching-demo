/**
 * characters-starred-list.tsx
 * @description: Fragmento para renderizar el listado de personajes marcados como favoritos
 */

import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'

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
import type {
  SpecieFilterType,
  GenderFilterType,
} from '@/fragments/components/filter/utils'
import {
  SpecieFilterValues,
  SpecieApiValues,
  GenderFilterValues,
  GenderApiValues,
} from '@/fragments/components/filter/utils'
import type { SortOrderType } from '@/fragments/components/sort-order/utils'

interface CharactersStarredListProps {
  readonly searchValue?: string
  readonly specieFilter?: SpecieFilterType
  readonly genderFilter?: GenderFilterType
  readonly sortOrder?: SortOrderType
  readonly onSortChange?: (order: SortOrderType) => void
}

export function CharactersStarredList({
  searchValue = '',
  specieFilter = SpecieFilterValues.ALL,
  genderFilter = GenderFilterValues.ALL,
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

    // Filtrar por género
    if (genderFilter === GenderFilterValues.MALE) {
      result = result.filter(
        character =>
          character.gender.toLowerCase() === GenderApiValues.MALE.toLowerCase()
      )
    } else if (genderFilter === GenderFilterValues.FEMALE) {
      result = result.filter(
        character =>
          character.gender.toLowerCase() ===
          GenderApiValues.FEMALE.toLowerCase()
      )
    } else if (genderFilter === GenderFilterValues.GENDERLESS) {
      result = result.filter(
        character =>
          character.gender.toLowerCase() ===
          GenderApiValues.GENDERLESS.toLowerCase()
      )
    } else if (genderFilter === GenderFilterValues.UNKNOWN) {
      result = result.filter(
        character =>
          character.gender.toLowerCase() ===
          GenderApiValues.UNKNOWN.toLowerCase()
      )
    }
    // Si es 'all', no filtrar por género

    return result
  }, [charactersStarred, hasSearch, trimmedSearch, specieFilter, genderFilter])

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
    <div className="min-h-0 w-full max-w-full space-y-2 overflow-x-hidden">
      <div className="flex min-w-0 items-center justify-between">
        <Text
          text={`STARRED CHARACTERS (${sortedStarredCharacters.length})`}
          weight="semibold"
        />
        <SortOrder sortOrder={sortOrder} onSortChange={onSortChange} />
      </div>
      <div className="w-full max-w-full space-y-2 overflow-x-hidden">
        <AnimatePresence>
          {sortedStarredCharacters.map((character: CharacterType) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              layout
              className="w-full max-w-full overflow-x-hidden"
            >
              <CardA
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
