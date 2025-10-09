import { ref } from 'vue'
import type { PokedexRaw } from '@/types/pokemon'
import type { NavigationFailure } from 'vue-router'

export const useDialog = () => {
  const dialogVisible = ref(false)
  const pokemonToShow = ref<PokedexRaw | null>(null)

  async function handleBuy(cb: () => Promise<PokedexRaw | void | NavigationFailure>) {
    const pokemon = (await cb()) as PokedexRaw

    if (pokemon) {
      pokemonToShow.value = pokemon
      dialogVisible.value = true
    }
  }

  function closeDialog() {
    dialogVisible.value = false
    pokemonToShow.value = null
  }

  return {
    dialogVisible,
    pokemonToShow,
    closeDialog,
    handleBuy,
  }
}
