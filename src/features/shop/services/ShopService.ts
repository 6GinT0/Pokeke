import { doc, collection, getDocs, setDoc, increment, where, query } from 'firebase/firestore'
import { db } from '@/config/firebase'
import FirebaseAuthService from '@/features/auth/services/FirebaseAuthService'
import PokeAPI from '@/features/pokedex/services/PokeAPI'
import { PRICE, REFUND } from '../constants'
import type { PokemonParsedData } from '@/types/pokemon'
import type { PokedexResponse } from '@/features/pokedex/types/response'

export default class ShopService {
  constructor(
    private authService: FirebaseAuthService,
    private pokemonAPI: PokeAPI,
  ) {}

  public async purchaseRandomPokemon(uid: string): Promise<PokedexResponse> {
    const userInfo = await this.authService.getUser(uid)

    if (!userInfo.exists) {
      return {
        success: false,
        error: 'User not found',
      }
    }

    const randomPokemon = await this.pokemonAPI.getPokemonByRandomId()

    if (userInfo.data!.coins < PRICE) {
      return {
        success: false,
        error: 'Not enough coins',
      }
    } else {
      await setDoc(doc(db, 'users', userInfo.data!.uid), {
        ...userInfo.data,
        coins: userInfo.data!.coins - PRICE,
      })

      const q = query(
        collection(db, 'users', userInfo.data!.uid, 'rawPokedex'),
        where('name', '==', randomPokemon.name),
      )

      const pokedexSnapshot = await getDocs(q)

      if (!pokedexSnapshot.empty) {
        await setDoc(
          doc(db, 'users', userInfo.data!.uid),
          {
            ...userInfo.data,
            coins: increment(REFUND),
          },
          { merge: true },
        )

        return {
          success: false,
          error: 'Pokemon already in pokedex',
        }
      }

      const { images, ...pokemon } = randomPokemon
      const image = images?.[0]?.sprites?.other?.['official-artwork']?.front_default ?? ''

      const obj = {
        ...pokemon,
        image,
      }

      await setDoc(doc(collection(db, 'users', userInfo.data!.uid, 'rawPokedex')), {
        ...obj,
        caughtAt: new Date(),
      })

      return {
        success: true,
        pokemons: obj,
      }
    }
  }

  public async purchasePokemon(
    uid: string,
    pokemons: PokemonParsedData[],
  ): Promise<PokedexResponse> {
    const userInfo = await this.authService.getUser(uid)

    if (!userInfo.exists) {
      return {
        success: false,
        error: 'User not found',
      }
    }

    if (userInfo.data!.coins < PRICE * pokemons.length) {
      return {
        success: false,
        error: 'Not enough coins',
      }
    }

    const decrement = userInfo.data!.coins - PRICE * pokemons.length

    await setDoc(doc(db, 'users', userInfo.data!.uid), {
      ...userInfo.data,
      coins: decrement,
    })

    const pokemonPromises = pokemons.map((pokemon) => {
      return setDoc(doc(collection(db, 'users', userInfo.data!.uid, 'rawPokedex')), {
        ...pokemon,
        caughtAt: new Date(),
      })
    })

    await Promise.all([...pokemonPromises])

    return {
      success: true,
    }
  }
}
