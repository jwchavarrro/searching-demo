/**
 * characters/index.tsx
 * @description: Fragmento para renderizar el listado de personajes
 */

// Import of components custom
import { CardA } from '@/components/atomic-desing/molecules'
import { Text } from '@/components/atomic-desing/atoms'

// Import of hooks
import { useCharacters } from '@/hooks'
import { useSelectedCharacter } from '@/context/use-selected-character'

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Text text="Cargando personajes..." size="base" align="center" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <Text text={`Error: ${error.message}`} size="base" align="center" />
      </div>
    )
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <Text text="No se encontraron personajes" size="base" align="center" />
      </div>
    )
  }

  return (
    <div>
      {data.results.map((character: CharacterType) => (
        <CardA
          key={character.id}
          as="button"
          onClick={() => setSelectedCharacter(character)}
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
  )
}
