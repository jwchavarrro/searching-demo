/**
 * client.ts
 * @description: Cliente para la API de Rick and Morty
 */

import { GraphQLClient } from 'graphql-request'

const GRAPHQL_ENDPOINT = 'https://rickandmortyapi.com/graphql'

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT)
