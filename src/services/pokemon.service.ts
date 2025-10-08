import { pokemonBaseUrl } from '@/lib/axios'
import { getRandomInt } from '@/utils/randomInt'
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  increment,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { PokedexRaw, PurchasePokemon } from '@/types/pokemon'

export default class PokemonService {
  private PRICE = 250
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

  public async purchaseRandomPokemon(userUid: string): Promise<PurchasePokemon> {
    const pokedex = await this.getPokedex()
    const index = getRandomInt(1, pokedex.length)
    const randomPokemon = pokedex[index]!

    const q = query(collection(db, 'users'), where('uid', '==', userUid))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return {
        success: false,
        error: 'User not found',
      }
    }

    const querySnapshotDoc = querySnapshot.docs[0]

    const querySnapshotData = querySnapshotDoc?.data()

    if (querySnapshotData!.coins < this.PRICE) {
      return {
        success: false,
        error: 'Not enough coins',
      }
    } else {
      await setDoc(doc(db, 'users', querySnapshotDoc!.id), {
        ...querySnapshotData,
        coins: querySnapshotData!.coins - this.PRICE,
      })

      const pokedexRef = collection(db, 'users', querySnapshotDoc!.id, 'rawPokedex')

      const pokedexSnapshot = await getDocs(pokedexRef)

      const pokedexSnapshotData = pokedexSnapshot.docs.map((el) => ({
        ...el.data(),
      }))

      if (pokedexSnapshotData.some((pokemon) => pokemon.name === randomPokemon.name)) {
        await setDoc(
          doc(db, 'users', querySnapshotDoc!.id),
          {
            ...querySnapshotData,
            coins: increment(50),
          },
          { merge: true },
        )

        return {
          success: false,
          error: 'Pokemon already in pokedex',
        }
      }

      await setDoc(doc(collection(db, 'users', querySnapshotDoc!.id, 'rawPokedex')), {
        ...randomPokemon,
        caughtAt: new Date(),
      })

      return {
        success: true,
        data: randomPokemon,
      }
    }
  }

  public async unlockAll(userUid: string): Promise<void | {
    success: boolean
    error: string
  }> {
    const q = query(collection(db, 'users'), where('uid', '==', userUid))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return {
        success: false,
        error: 'User not found',
      }
    } else {
      await setDoc(doc(db, 'users', querySnapshot.docs[0]!.id), {
        ...querySnapshot.docs[0]!.data(),
        coins: 10000000,
        cheat: true,
      })

      const querySnapshotDoc = querySnapshot.docs[0]

      const pokedexRef = collection(db, 'users', querySnapshotDoc!.id, 'rawPokedex')

      const pokedexSnapshot = await getDocs(pokedexRef)

      const deletePokemonsPromises = pokedexSnapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, 'users', querySnapshotDoc!.id, 'rawPokedex', docSnap.id)),
      )

      await Promise.all(deletePokemonsPromises)
    }
  }
}
