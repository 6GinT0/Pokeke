import { ref } from 'vue'
import { useToast } from 'primevue'
import { getCurrentUser } from 'vuefire'
import { query, where, collection, doc, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import PokemonService from '@/services/pokemon.service'
import type { Ref } from 'vue'
import type { Pokemon } from '@/types/pokemon'
import { useRouter } from 'vue-router'

export const usePokemon = () => {
  const pokedex: Ref<Pokemon[]> = ref([])
  const router = useRouter()
  const toast = useToast()
  const pokemonService = PokemonService.getInstance()

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

  async function handleRandomPokemonPurchase() {
    const currentUserData = await getCurrentUser()

    if (!currentUserData?.uid) {
      return router.push({
        name: 'login',
      })
    }

    const { success, data, error } = await pokemonService.purchaseRandomPokemon(
      currentUserData!.uid,
    )

    if (!success) {
      toast.add({
        severity: 'warn',
        summary: error,
      })
    }

    return data
  }

  async function handleUnlockAll() {
    const currentUserData = await getCurrentUser()

    if (!currentUserData?.uid) {
      return router.push({
        name: 'login',
      })
    }

    const { success, error } = await pokemonService.purchaseRandomPokemon(currentUserData!.uid)

    if (!success) {
      toast.add({
        severity: 'warn',
        summary: error,
      })
    }
  }

  return {
    pokedex,
    getPokedex,
    handleRandomPokemonPurchase,
    handleUnlockAll,
  }
}
