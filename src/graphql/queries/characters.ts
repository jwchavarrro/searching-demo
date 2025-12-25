/**
 * characters.ts
 * @description: Queries para personajes de Rick and Morty
 */

import { gql } from 'graphql-request'

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        species
        status
        type
        gender
        created
      }
    }
  }
`

export const SEARCH_CHARACTERS = gql`
  query SearchCharacters($name: String!) {
    characters(filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        species
        status
        type
        gender
        created
      }
    }
  }
`

export const GET_CHARACTERS_BY_SPECIES = gql`
  query GetCharactersBySpecies($species: String!) {
    characters(filter: { species: $species }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        species
        status
        type
        gender
        created
      }
    }
  }
`
