/**
 * Capitaliza la primera letra de una palabra.
 * @param word - La palabra a capitalizar.
 * @returns La palabra con la primera letra en mayúscula.
 */
export function capitalizeFirstLetter(word: string): string {
  if (!word) return ''
  return word.charAt(0).toUpperCase() + word.slice(1)
}
