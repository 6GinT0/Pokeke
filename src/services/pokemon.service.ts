import { pokemonBaseUrl } from '@/lib/axios'
import { getRandomInt } from '@/utils/randomInt'
import type { PokedexRaw } from '@/types/pokemon'

export default class PokemonService {
  private static instance: PokemonService | null = null

  private constructor() {}

  static getInstance(): PokemonService {
    if (!PokemonService.instance) {
      PokemonService.instance = new PokemonService()
    }

    return PokemonService.instance
  }

  private async getPokedex(): Promise<PokedexRaw[]> {
    const { data } = await pokemonBaseUrl('/pokemon?limit=100000&offset=0')

    return data.results
  }

  public async getFirstRandomPokemons(): Promise<PokedexRaw[]> {
    const pokemons: PokedexRaw[] = []
    const pokedex = await this.getPokedex()
    let index = getRandomInt(1, pokedex.length)

    while (pokemons.length < 3) {
      const randomPokemon = pokedex[index]!

      const isPokemonInPokedex = pokemons.some((pokemon) => pokemon.name === randomPokemon.name)

      if (!isPokemonInPokedex) {
        pokemons.push(randomPokemon)
      }

      index = getRandomInt(1, pokedex.length)
    }

    return pokemons
  }
}
