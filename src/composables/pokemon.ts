import { ref } from 'vue'
import { getCurrentUser } from 'vuefire'
import { query, where, collection, doc, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Ref } from 'vue'
import type { Pokemon } from '@/types/pokemon'

export const usePokemon = () => {
  const pokedex: Ref<Pokemon[]> = ref([])

  async function getPokedex() {
    const currentUserData = await getCurrentUser()
    const usersRef = collection(db, 'users')

    const q = query(usersRef, where('uid', '==', currentUserData?.uid))
    const querySnapshot = await getDocs(q)

    const userDoc = querySnapshot.docs[0]
    const userData = userDoc?.data()
    const userDocRef = doc(db, 'users', userDoc!.id)

    if (!userData?.cheat) {
      const pokedexRef = collection(userDocRef, 'rawPokedex')
      const pokedexSnapshot = await getDocs(pokedexRef)

      const pokemons = pokedexSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))

      const pokemonPromises = pokemons.map((pokemon): Promise<Pokemon> => {
        return new Promise((resolve) => {
          resolve(fetch(pokemon.url).then((res) => res.json()))
        })
      })

      const pokemonData = await Promise.all(pokemonPromises)

      pokedex.value = pokemonData as Pokemon[]

      return {
        success: true,
      }
    }

    return {
      success: false,
      message: 'Cheats are enabled',
    }
  }

  return {
    pokedex,
    getPokedex,
  }
}
