import { ref, watch, useTemplateRef } from 'vue'
import { useAsyncState, useElementVisibility } from '@vueuse/core'
import type { Pokemon, PokemonRaw } from '@/types/pokemon'

export const useInfiniteScroll = () => {
  const pokemons = ref<Pokemon[]>([])
  const page = ref(1)
  const target = useTemplateRef<HTMLDivElement>('target')

  const { isLoading, execute } = useAsyncState(
    async () => {
      const limit = 20
      const offset = (page.value - 1) * limit
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)

      const json = await res.json()

      const responses = await Promise.all(
        json.results.map(async (pokemon: PokemonRaw) => {
          const res = await fetch(pokemon.url)

          return await res.json()
        }),
      )

      pokemons.value = [...pokemons.value, ...responses]

      return responses
    },
    null,
    {
      immediate: true,
    },
  )

  const targetIsVisible = useElementVisibility(target, {
    rootMargin: '0px 0px 100px 0px',
  })

  watch(page, () => {
    if (!isLoading.value) {
      execute()
    }
  })

  watch(targetIsVisible, () => {
    if (targetIsVisible.value) {
      page.value++
    }
  })

  return {
    pokemons,
    target,
    isLoading,
  }
}
