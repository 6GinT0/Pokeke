import { collection, doc, addDoc, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import FirebaseAuthService from '@/features/auth/services/FirebaseAuthService'
import PokeAPI from './PokeAPI'
import type { PokedexResponse } from '../types/response'
import type { Pokedex } from '../types/pokedex'

export default class PokemonService {
  constructor(
    private authService: FirebaseAuthService,
    private pokeAPI: PokeAPI,
  ) {}

  public async getUserPokedex(uid: string): Promise<PokedexResponse> {
    const userInfo = await this.authService.getUser(uid)

    if (!userInfo.exists) {
      return {
        success: false,
        error: 'User not found',
      }
    }

    const snapshot = await getDocs(collection(db, 'users', uid, 'rawPokedex'))
    const pokemons = snapshot.docs.map((doc) => doc.data()) as Pokedex

    return {
      success: true,
      pokemons,
    }
  }

  public async createStarterPokedex(uid: string): Promise<void> {
    const userRef = doc(db, 'users', uid)
    const pokedexRef = collection(userRef, 'rawPokedex')

    if (!(await getDocs(pokedexRef)).empty) {
      return
    }

    const uniquePokemons: any[] = []

    while (uniquePokemons.length < 3) {
      const randomPokemon = await this.pokeAPI.getPokemonByRandomId()
      if (!randomPokemon) continue

      // Verifica por ID si ya está en el array
      if (!uniquePokemons.find((p) => p.id === randomPokemon.id)) {
        uniquePokemons.push(randomPokemon)
      }
    }

    const pokemonPromises = uniquePokemons.map(({ images, ...pokemon }) => {
      const image = images?.[0]?.sprites?.other?.['official-artwork']?.front_default ?? ''

      return addDoc(pokedexRef, {
        ...pokemon,
        image,
        caughtAt: new Date(),
      })
    })

    await Promise.all(pokemonPromises)
  }
}
