import { ref } from 'vue'
import type { PokedexRaw } from '@/types/pokemon'
import type { NavigationFailure } from 'vue-router'

export const useDialog = () => {
  const dialogVisible = ref(false)
  const pokemonToShow = ref<PokedexRaw | null>(null)

  async function openDialogWithPokemon(
    cb: () => Promise<PokedexRaw | void | NavigationFailure>,
  ) {
    const result = await cb()

    if (result && typeof result === 'object' && 'name' in result && 'url' in result) {
      const pokemon = result as PokedexRaw
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
    openDialogWithPokemon,
  }
}
