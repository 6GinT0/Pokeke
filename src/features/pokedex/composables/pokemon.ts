import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from '@/composables/user'
import { useCart } from '@/features/shop/stores/cart'
import { useToast } from 'primevue'
import { storeToRefs } from 'pinia'
import { formattedString } from '@/utils/pokemonName'
import ShopService from '@/features/shop/services/ShopService'

export const usePokemon = () => {
  const router = useRouter()
  const { user } = useUser()
  const cartStore = useCart()
  const { clearCart } = cartStore
  const { cart } = storeToRefs(cartStore)
  const toast = useToast()
  const shopService = ShopService.getInstance()

  const formattedName = computed(() => {
    return (name: string) => formattedString(name)
  })

  async function handleRandomPokemonPurchase() {
    if (!user.value) return

    const { success, data, error } = await shopService.purchaseRandomPokemon(user.value.uid)

    if (!success) {
      toast.add({
        severity: 'warn',
        summary: error,
      })
    }

    return data
  }

  async function handlePurchasePokemons() {
    if (!user.value) return

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
    formattedName,
    handleRandomPokemonPurchase,
    handlePurchasePokemons,
  }
}
