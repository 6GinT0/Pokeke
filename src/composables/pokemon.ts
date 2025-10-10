import { ref } from 'vue'
import { useToast } from 'primevue'
import { useUser } from './user'
import { useCart } from '@/stores/cart'
import { getCurrentUser } from 'vuefire'
import { query, where, collection, doc, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import PokemonService from '@/services/pokemon.service'
import type { Ref } from 'vue'
import type { Pokemon } from '@/types/pokemon'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

export const usePokemon = () => {
  const pokedex: Ref<Pokemon[]> = ref([])
  const router = useRouter()
  const { userData } = useUser()
  const cart = useCart()
  const { clearCart } = cart
  const { pokemonCart, pokemonCartIsEmpty, total } = storeToRefs(cart)
  const toast = useToast()
  const pokemonService = PokemonService.getInstance()

  async function getUserData() {
    const currentUser = await getCurrentUser()
    if (!currentUser?.uid) {
      router.push({ name: 'login' })
      return null
    }

    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('uid', '==', currentUser.uid))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const userDoc = querySnapshot.docs[0]
    const userData = userDoc?.data()
    const userDocRef = doc(db, 'users', userDoc!.id)

    return { userData, userDocRef, uid: currentUser.uid }
  }

  async function getPokedex() {
    const userInfo = await getUserData()
    if (!userInfo) return { success: false, message: 'User not found' }

    const { userData, userDocRef } = userInfo

    if (userData?.cheat) {
      return {
        success: false,
        message: 'Cheats are enabled',
      }
    }

    const pokedexRef = collection(userDocRef, 'rawPokedex')
    const pokedexSnapshot = await getDocs(pokedexRef)

    const pokemons = pokedexSnapshot.docs.map((doc) => doc.data())

    const pokemonPromises = pokemons.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))

    pokedex.value = await Promise.all(pokemonPromises)

    return {
      success: true,
    }
  }

  async function handleRandomPokemonPurchase() {
    const userInfo = await getUserData()
    if (!userInfo) return

    const { success, data, error } = await pokemonService.purchaseRandomPokemon(userInfo.uid)

    if (!success) {
      toast.add({
        severity: 'warn',
        summary: error,
      })
    }

    return data
  }

  async function handleUnlockAll() {
    const userInfo = await getUserData()
    if (!userInfo) return

    await pokemonService.unlockAll(userInfo.uid)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'All Pokemon unlocked!',
      life: 3000,
    })

    window.location.reload()
  }

  async function handlePurchasePokemons() {
    if (!userData.value) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You must be logged in to purchase',
      })

      return
    }

    if (pokemonCartIsEmpty.value) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Your cart is empty',
      })

      return
    }

    if (userData.value.coins < total.value) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You do not have enough coins',
      })

      return
    }

    const { success, error } = await pokemonService.purchasePokemons(
      userData.value.uid,
      pokemonCart.value,
    )

    if (!success) {
      return toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error,
      })
    }

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Pokemons purchased!',
    })

    clearCart()

    return router.push({ name: 'pokedex' })
  }

  return {
    pokedex,
    getPokedex,
    handleRandomPokemonPurchase,
    handleUnlockAll,
    handlePurchasePokemons,
  }
}
