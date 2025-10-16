import { computed } from 'vue'

import { formattedString } from '@/utils/pokemonName'

export const usePokemon = () => {
  const formattedName = computed(() => {
    return (name: string) => formattedString(name)
  })

  return {
    formattedName,
  }
}
