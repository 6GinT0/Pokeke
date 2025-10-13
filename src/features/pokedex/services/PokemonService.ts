import { collection, doc, addDoc, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import UserService from '@/features/auth/services/UserService'
import { pokemonBaseUrl } from '../lib/axios'
import { getRandomInt } from '../../../utils/randomInt'
import type { PokemonRaw, PokemonFetch } from '@/types/pokemon'

export default class PokemonService {
  private static instance: PokemonService | null = null
  private userService = UserService.getInstance()
  private pokemons: PokemonRaw[] = []

  private constructor() {}

  static getInstance(): PokemonService {
    if (!PokemonService.instance) {
      PokemonService.instance = new PokemonService()
    }

    return PokemonService.instance
  }

  public async getAllPokemons(): Promise<PokemonRaw[]> {
    if (this.pokemons.length > 0) {
      return this.pokemons
    }

    const { data } = await pokemonBaseUrl('/pokemon?limit=100000&offset=0')

    return data.results
  }

  public async getRandomPokemon(): Promise<PokemonRaw> {
    const pokedex = await this.getAllPokemons()

    const index = getRandomInt(1, pokedex.length)

    return pokedex[index]!
  }

  public async getFirstRandomPokemons(): Promise<PokemonRaw[]> {
    const pokemons: PokemonRaw[] = []

    while (pokemons.length < 3) {
      let randomPokemon = await this.getRandomPokemon()

      const isPokemonInPokedex = pokemons.some((pokemon) => pokemon.name === randomPokemon.name)

      if (!isPokemonInPokedex) {
        pokemons.push(randomPokemon)
      }

      randomPokemon = await this.getRandomPokemon()
    }

    return pokemons
  }

  public async getUserPokedex(uid: string): Promise<PokemonFetch> {
    const userInfo = await this.userService.getUser(uid)
    let pokedex = []

    if (!userInfo.exists) {
      return {
        success: false,
        error: 'User not found',
      }
    }

    const pokedexSnapshot = await getDocs(collection(db, 'users', userInfo.data!.uid, 'rawPokedex'))

    const pokemons = pokedexSnapshot.docs.map((doc) => doc.data())

    const pokemonPromises = pokemons.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))

    pokedex = await Promise.all(pokemonPromises)

    return {
      success: true,
      data: pokedex,
    }
  }

  public async createStarterPokedex(uid: string): Promise<void> {
    const userRef = doc(db, 'users', uid)
    const pokedexRef = collection(userRef, 'rawPokedex')
    const firstPokemons = await this.getFirstRandomPokemons()

    const pokemonPromises = firstPokemons.map((pokemon) =>
      addDoc(pokedexRef, {
        ...pokemon,
        caughtAt: new Date(),
      }),
    )

    await Promise.all(pokemonPromises)
  }
}
