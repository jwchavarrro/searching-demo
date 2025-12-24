/**
 * characters/index.tsx
 * @description: Fragmento para renderizar el listado de personajes
 */

// Import of components custom
import { CardA, Message } from '@/components/atomic-desing/molecules'

// Import of hooks
import { useCharacters } from '@/hooks'
import { useSelectedCharacter } from '@/context/use-selected-character'
import { useCharactersStarred } from '@/context'

// Import of utils
import { ICONS } from '@/config'

// Import of types
import type { CharacterType } from '@/graphql/types'

export function CharactersList() {
  // Implement custom hooks
  /* @name useCharacters
  @description: Hook para obtener los personajes  
 */
  const { data, isLoading, error } = useCharacters()

  /* @name useSelectedCharacter
  @description: Hook para manejar el estado del personaje seleccionado
  */
  const { setSelectedCharacter } = useSelectedCharacter()

  /* @name useCharactersStarred
  @description: Hook para manejar el estado de los personajes marcados como favoritos
  */
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

  return (
    <>
      {data.results.map((character: CharacterType) => (
        <CardA
          key={character.id}
          as="button"
          onClick={() => setSelectedCharacter(character)}
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
    </>
  )
}
