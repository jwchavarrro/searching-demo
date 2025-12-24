/**
 * characters/index.tsx
 * @description: Fragmento para renderizar el listado de personajes
 */

// Import of components custom
import { CardA, Message } from '@/components/atomic-desing/molecules'

// Import of context
import { useCharactersStarred } from '@/context'

// Import of utils
import { ICONS } from '@/config'

// Import of types
import type { CharacterType } from '@/graphql/types'

export function CharactersStarredList() {
  // Implement context
  /* @name charactersStarred
  @description: Personajes marcados como favoritos
  */
  const { charactersStarred } = useCharactersStarred()

  if (!charactersStarred || charactersStarred.length === 0) {
    return (
      <Message
        icon={ICONS.alert}
        description={{ text: 'No characters starred found' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  return (
    <>
      {charactersStarred.map((character: CharacterType) => (
        <CardA
          key={character.id}
          as="button"
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
