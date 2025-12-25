/**
 * details-character.tsx
 * @description: Fragmento para renderizar el detalle de un personaje
 */

// Import of motion
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'

// Import of components custom
import { Header, Message } from '@/components/atomic-desing/molecules'
import { Button, Text } from '@/components/atomic-desing/atoms'

// Import of hooks
import { useCharacterByName } from '@/hooks'

// Import of context
import { useCharactersStarred, useSelectedCharacter } from '@/context'

// Import of types
import type { CharacterType } from '@/graphql/types'

// Import of utils
import { ICONS } from '@/config'
import { capitalizeFirstLetter } from '@/utils'
import { DETAILS_CHARACTER_TEXT } from '@/fragments'

export const DetailsCharacter = () => {
  // Implement context
  const { selectedCharacterName, setSelectedCharacter } = useSelectedCharacter()
  const { isCharacterStarred } = useCharactersStarred()

  /* @name selectedCharacter
  @description: Obtener datos del personaje por nombre
  */
  const {
    character: selectedCharacter,
    isLoading,
    error,
  } = useCharacterByName(selectedCharacterName)

  /* @name isStarred
  @description: Verificar si el personaje está marcado como favorito
  */
  const isStarred = selectedCharacter
    ? isCharacterStarred(selectedCharacter.id)
    : false

  /* @name if (!selectedCharacterName)
  @description: Validar si no hay un personaje seleccionado
  */
  if (!selectedCharacterName) {
    return (
      <Message
        icon={ICONS.selection_03}
        title={{ title: 'No character has been selected' }}
        description={{ text: 'Select a character to view their details' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  if (isLoading) {
    return (
      <Message
        icon={ICONS.loading}
        description={{ text: 'Loading character details...' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  if (error || !selectedCharacter) {
    return (
      <Message
        icon={ICONS.alert}
        title={{ title: 'Error loading character' }}
        description={{
          text: error?.message || 'Could not load character details',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  return (
    <motion.div
      className="relative h-full space-y-5"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSelectedCharacter(null)}
        className="text-primary-700 mb-2 md:hidden"
        aria-label="Close character details"
      >
        <Icon icon={ICONS.arrow_left_02} className="size-6" />
      </Button>

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
        {DETAILS_CHARACTER_TEXT.map((field, index) => {
          /* @name fieldValue
          @description: Obtener el valor del campo del personaje
          */
          const fieldValue =
            selectedCharacter[field as keyof CharacterType] || 'Unknown'

          return (
            <div
              key={field}
              className={
                index < DETAILS_CHARACTER_TEXT.length - 1
                  ? 'border-gray/20 border-b pb-5'
                  : ''
              }
            >
              <Text
                text={capitalizeFirstLetter(field)}
                weight="bold"
                size="base"
                className="text-black"
              />
              <Text text={String(fieldValue)} size="base" />
            </div>
          )
        })}
      </main>
    </motion.div>
  )
}
