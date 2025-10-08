<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { usePokemon } from '@/composables/pokemon'
import PokemonCard from '@/components/PokemonCard.vue'
import LoaderC from '@/components/LoaderC.vue'

const { pokedex, getPokedex } = usePokemon()
const { isLoading } = useAsyncState(getPokedex, null, { immediate: true })
</script>

<template>
  <template v-if="!isLoading">
    <div class="my-12 grid gap-6 md:grid-cols-3 xl:grid-cols-4">
      <PokemonCard v-for="pokemon in pokedex" :key="pokemon.id" :pokemon />
    </div>
  </template>
  <template v-else>
    <LoaderC />
  </template>
</template>
