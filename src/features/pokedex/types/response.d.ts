import type { Pokedex } from './pokedex'

export interface PokedexResponse {
  success: boolean
  error?: string
  pokemons?: Pokedex
}
