/**
 * details-character.tsx
 * @description: Fragmento para renderizar el detalle de un personaje
 */

// Import of components custom
import { Header, Message } from '@/components/atomic-desing/molecules'

// Import of utils
import { ICONS } from '@/config'

// Import of hooks
import { useSelectedCharacter } from '@/context/use-selected-character'

export const DetailsCharacter = () => {
  // Implement custom hooks
  /* @name useSelectedCharacter
  @description: Hook para manejar el estado del personaje seleccionado
  */
  const { selectedCharacter } = useSelectedCharacter()

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
    <div className="relative h-full">
      <Header
        avatar={{
          avatar: {
            src: selectedCharacter.image,
            alt: selectedCharacter.name,
          },
        }}
        title={{ title: selectedCharacter.name }}
      />
      <div></div>
    </div>
  )
}
