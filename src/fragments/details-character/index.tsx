/**
 * details-character.tsx
 * @description: Fragmento para renderizar el detalle de un personaje
 */

// Import of components custom
import { Header } from '@/components/atomic-desing/molecules'

// Import of hooks
import { useSelectedCharacter } from '@/context/use-selected-character'

export const DetailsCharacter = () => {
  // Implement custom hooks
  /* @name useSelectedCharacter
  @description: Hook para manejar el estado del personaje seleccionado
  */
  const { selectedCharacter } = useSelectedCharacter()

  if (!selectedCharacter) {
    return <div>No se ha seleccionado ningún personaje</div>
  }

  return (
    <div>
      <Header
        avatar={{
          avatar: {
            src: selectedCharacter.image,
            alt: selectedCharacter.name,
          },
        }}
        title={{ title: selectedCharacter.name }}
      />
    </div>
  )
}
