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

export function CharactersStarredList() {
  // Implement context
  const {
    handleCharacterStarred,
    isCharacterStarred,
    charactersStarred,
    count,
  } = useCharactersStarred()
  const { setSelectedCharacter } = useSelectedCharacter()

  if (!charactersStarred || charactersStarred.length === 0) {
    return (
      <div className="min-h-52">
        <Message
          icon={ICONS.alert}
          description={{ text: 'No characters starred yet' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    )
  }

  return (
    <div className="min-h-0 space-y-2">
      <Text text={`STARRED CHARACTERS (${count})`} weight="semibold" />
      <div>
        {charactersStarred.map((character: CharacterType) => (
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
      </div>
    </div>
  )
}
