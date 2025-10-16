<script setup lang="ts">
import { useUser } from '@/composables/user'
import PokemonCard from '@/features/pokedex/components/pokeball/PokemonCard.vue'

const { pokedex } = useUser()
</script>

<template>
  <div class="my-12 grid gap-6 md:grid-cols-3 xl:grid-cols-4">
    <PokemonCard v-for="pokemon in pokedex" :key="pokemon.id" :pokemon="pokemon" route-in-pokedex />
  </div>
</template>
