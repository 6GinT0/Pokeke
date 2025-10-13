<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '@/composables/user'
import { useAsyncState } from '@vueuse/core'
import type { Pokemon } from '@/types/pokemon'
import PokemonService from '@features/pokedex/services/PokemonService'
import PokemonCard from '@/features/pokedex/components/pokeball/PokemonCard.vue'
import PokedexLoader from '@/features/pokedex/components/pokedex/PokedexLoader.vue'

const pokemonService = PokemonService.getInstance()
const pokedex = ref<Pokemon[]>([])
const { user } = useUser()

const { isLoading } = useAsyncState(
  async () => {
    if (!user.value) return

    pokedex.value = (await pokemonService.getUserPokedex(user.value.uid)).data as Pokemon[]

    return pokedex.value
  },
  null,
  {
    immediate: true,
  },
)
</script>

<template>
  <template v-if="!isLoading">
    <div class="my-12 grid gap-6 md:grid-cols-3 xl:grid-cols-4">
      <PokemonCard
        v-for="pokemon in pokedex"
        :key="pokemon.id"
        :pokemon="pokemon"
        route-in-pokedex
      />
    </div>
  </template>
  <template v-else>
    <PokedexLoader />
  </template>
</template>
