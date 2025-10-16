import {
  GET_POKEMONS_IDS,
  GET_POKEMONS_COUNT,
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
} from '@/graphql/queries/pokemon'
import { getRandomInt } from '@/utils/randomInt'
import type { ApolloClient } from '@apollo/client/core'

export default class PokeAPI {
  private allIds: number[] | null = null

  constructor(private client: ApolloClient<any>) {}

  async getAllIds() {
    if (this.allIds) return this.allIds

    const { data } = await this.client.query({
      query: GET_POKEMONS_IDS,
    })

    this.allIds = data.pokemons.map((p: any) => p.id)

    return this.allIds
  }

  async getPokemonsCount(): Promise<number> {
    const { data } = await this.client.query({
      query: GET_POKEMONS_COUNT,
    })

    return data.pokemon_aggregate.aggregate.count ?? 0
  }

  async getPokemons(limit: number, offset: number) {
    const { data } = await this.client.query({
      query: GET_POKEMONS,
      variables: { limit, offset },
    })

    return data.pokemons ?? []
  }

  async getPokemonById(id: number) {
    const { data } = await this.client.query({
      query: GET_POKEMON_BY_ID,
      variables: { id },
    })

    return data.pokemon[0] ?? null
  }

  async getPokemonByRandomId() {
    const ids = await this.getAllIds()
    const randomId = ids![getRandomInt(0, ids!.length - 1)]

    const pokemon = await this.getPokemonById(randomId as number)

    return pokemon ?? null
  }
}
