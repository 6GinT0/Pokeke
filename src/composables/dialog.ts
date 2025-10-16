import { ref } from 'vue'
import type { NavigationFailure } from 'vue-router'

export const useDialog = () => {
  const dialogVisible = ref(false)
  const pokemonToShow = ref<any | null>(null)

  async function openDialogWithPokemon(cb: () => Promise<any | void | NavigationFailure>) {
    const result = await cb()

    if (result && typeof result === 'object' && 'name' in result) {
      const pokemon = result as any
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
