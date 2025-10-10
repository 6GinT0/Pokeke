<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCart } from '@/stores/cart'
import { usePokemon } from '@/composables/pokemon'
import { Button } from 'primevue'

const cart = useCart()
const { pokemonCart, total } = storeToRefs(cart)
const { handlePurchasePokemons } = usePokemon()
</script>

<template>
  <div class="flex flex-col space-y-2 md:col-span-1">
    <h3 class="text-2xl font-bold uppercase">Cart summary</h3>
    <div class="flex items-center justify-between">
      <p>{{ pokemonCart.length }} <span>products</span></p>
      <p>{{ total }} <span>coins</span></p>
    </div>
    <div class="flex items-center justify-between">
      <p class="font-bold uppercase">
        Total: <span>{{ total }}</span>
      </p>
    </div>
    <Button @click="handlePurchasePokemons"> Purchase </Button>
  </div>
</template>
