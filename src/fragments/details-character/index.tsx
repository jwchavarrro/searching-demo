/**
 * details-character.tsx
 * @description: Fragmento para renderizar el detalle de un personaje
 */

// Import of components custom
import { Header, Message } from '@/components/atomic-desing/molecules'
import { Text } from '@/components/atomic-desing/atoms'

// Import of context
import { useCharactersStarred, useSelectedCharacter } from '@/context'

// Import of utils
import { ICONS } from '@/config'
import { capitalizeFirstLetter } from '@/utils'
import { DETAILS_CHARACTER_TEXT } from '@/fragments'

export const DetailsCharacter = () => {
  // Implement context
  const { selectedCharacter } = useSelectedCharacter()
  const { isCharacterStarred } = useCharactersStarred()

  /* @name isStarred
  @description: Verificar si el personaje está marcado como favorito
  */
  const isStarred = selectedCharacter
    ? isCharacterStarred(selectedCharacter?.id || 0)
    : false

  /* @name if (!selectedCharacter)
  @description: Validar si no hay un personaje seleccionado
  */
  if (!selectedCharacter) {
    return (
      <Message
        icon={ICONS.selection_03}
        title={{ title: 'No character has been selected' }}
        description={{ text: 'Select a character to view their details' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  return (
    <div className="relative h-full space-y-5">
      <Header
        avatar={{
          avatar: {
            src: selectedCharacter.image,
            alt: selectedCharacter.name,
          },
          icon: isStarred ? ICONS.heart : undefined,
        }}
        title={{ title: selectedCharacter.name }}
      />

      {/* Details character */}
      <main className="flex flex-col gap-5">
        {DETAILS_CHARACTER_TEXT.map((text, index) => (
          <div
            key={text}
            className={
              index < DETAILS_CHARACTER_TEXT.length - 1
                ? 'border-gray/20 border-b pb-5'
                : ''
            }
          >
            <Text
              text={capitalizeFirstLetter(text)}
              weight="bold"
              size="base"
              className="text-black"
            />
            <Text text="Alien" size="base" />
          </div>
        ))}
      </main>
    </div>
  )
}
