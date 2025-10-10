<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '@/composables/user'
import PokemonCard from '@/components/pokemon/PokemonCard.vue'
import PokemonInfiniteScroll from '@/components/pokemon/PokemonInfiniteScroll.vue'
import PokedexInfiniteScroll from '@/components/pokemon/PokedexInfiniteScroll.vue'
import type { Pokemon } from '@/types/pokemon'

const pokemons = ref<Pokemon[]>([])
const { currentUserIsCheating } = useUser()

const setPokemons = (pokemonsData: Pokemon[]) => {
  pokemons.value = [...pokemons.value, ...pokemonsData]
}
</script>

<template>
  <template v-if="!currentUserIsCheating">
    <PokedexInfiniteScroll />
  </template>
  <template v-else>
    <PokemonInfiniteScroll @set-pokemons="setPokemons">
      <template #card>
        <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon route-in-pokedex />
      </template>
    </PokemonInfiniteScroll>
  </template>
</template>
