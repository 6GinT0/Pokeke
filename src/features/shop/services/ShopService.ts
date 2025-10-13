import { doc, collection, getDocs, setDoc, increment, where, query } from 'firebase/firestore'
import { db } from '@/config/firebase'
import UserService from '@/features/auth/services/UserService'
import PokemonService from '@/features/pokedex/services/PokemonService'
import { PRICE, REFUND } from '../constants'
import type { Pokemon, PokemonPurchase } from '@/types/pokemon'

export default class ShopService {
  private static instance: ShopService | null = null
  private userService = UserService.getInstance()
  private pokemonService = PokemonService.getInstance()

  private constructor() {}

  static getInstance(): ShopService {
    if (!ShopService.instance) {
      ShopService.instance = new ShopService()
    }

    return ShopService.instance
  }

  public async purchaseRandomPokemon(uid: string): Promise<PokemonPurchase> {
    const userInfo = await this.userService.getUser(uid)

    if (!userInfo.exists) {
      return {
        success: false,
        error: 'User not found',
      }
    }

    const randomPokemon = await this.pokemonService.getRandomPokemon()

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

      await setDoc(doc(collection(db, 'users', userInfo.data!.uid, 'rawPokedex')), {
        ...randomPokemon,
        caughtAt: new Date(),
      })

      return {
        success: true,
        data: randomPokemon,
      }
    }
  }

  public async purchasePokemon(uid: string, pokemons: Pokemon[]): Promise<PokemonPurchase> {
    const userInfo = await this.userService.getUser(uid)

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
        name: pokemon.name,
        url: 'https://pokeapi.co/api/v2/pokemon/' + pokemon.id,
        caughtAt: new Date(),
      })
    })

    await Promise.all([...pokemonPromises])

    return {
      success: true,
    }
  }
}
