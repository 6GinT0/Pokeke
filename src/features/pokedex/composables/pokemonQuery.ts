import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_POKEMONS } from '@/graphql/queries/pokemon'
import type { Pokemon } from '@/types/pokemon'

export const usePokemonQuery = (page: Ref<number>) => {
  const pokemonsRawData: Ref<Pokemon[]> = ref([])

  const { result, loading, error } = useQuery(
    GET_POKEMONS,
    () => ({
      offset: (page.value - 1) * 20,
      limit: 20,
    }),
    () => ({
      fetchPolicy: 'cache-and-network',
    }),
  )

  const pokemons = computed(
    () =>
      pokemonsRawData.value.map((p: Pokemon) => ({
        id: p.id,
        name: p.name,
        image: p.images[0]?.sprites?.other?.['official-artwork']?.front_default ?? '',
        stats: p.stats.map((s) => ({
          base_stat: s.base_stat,
          effort: s.effort,
          stat: {
            name: s.stat.name,
          },
        })),
      })) ?? [],
  )

  watch(result, () => {
    if (!result.value) return

    const plainPokemon = { ...result.value }

    if (plainPokemon.pokemons) {
      pokemonsRawData.value.push(...plainPokemon.pokemons)
    }
  })

  return {
    pokemons,
    loading,
    error,
  }
}
