<script setup lang="ts">
import PokemonService from '@/services/pokemon.service'

import { useCurrentUser } from 'vuefire'
const currentUser = useCurrentUser()
const pokemonService = PokemonService.getInstance()
</script>

<template>
  <h2>Shop</h2>
  <button
    class="cursor-pointer bg-red-500 px-3 py-5"
    @click="() => pokemonService.purchaseRandomPokemon(currentUser!.uid)"
  >
    Comprar
  </button>
</template>
