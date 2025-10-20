import { useUser } from '@/composables/user'
import { useCart } from '../stores/cart'
import { useToast } from 'primevue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useServices } from '@/composables/services'

export const useShopActions = () => {
  const { user } = useUser()
  const cartStore = useCart()
  const { clearCart } = cartStore
  const { cart } = storeToRefs(cartStore)
  const toast = useToast()
  const router = useRouter()
  const { shopService } = useServices()

  async function handleRandomPokemonPurchase() {
    if (!user.value)
      return toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You must be logged in to purchase a random pokemon!',
      })

    const { success, pokemons, error } = await shopService.purchaseRandomPokemon(user.value.uid)

    if (!success) {
      toast.add({
        severity: 'warn',
        summary: error,
      })
    }

    return pokemons
  }

  async function handlePurchasePokemons() {
    if (!user.value)
      return toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You must be logged in to purchase a random pokemon!',
      })

    const { success, error } = await shopService.purchasePokemon(user.value!.uid, cart.value)

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
    handleRandomPokemonPurchase,
    handlePurchasePokemons,
  }
}
