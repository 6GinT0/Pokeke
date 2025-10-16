import { collection, doc, addDoc, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import FirebaseAuthService from '@/features/auth/services/FirebaseAuthService'
import PokeAPI from './PokeAPI'
import { getRandomInt } from '@/utils/randomInt'
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

    const pokemonCount = await this.pokeAPI.getPokemonsCount()
    const uniqueIds = new Set<number>()

    while (uniqueIds.size < 3) {
      const randomId = getRandomInt(1, pokemonCount)

      uniqueIds.add(randomId)
    }

    const pokemons = await Promise.all(
      Array.from(uniqueIds).map((id) => this.pokeAPI.getPokemonById(id)),
    )

    const pokemonPromises = pokemons.map(({ images, ...pokemon }) => {
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
