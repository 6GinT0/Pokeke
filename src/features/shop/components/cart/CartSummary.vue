<script setup lang="ts">
import { useCart } from '@features/shop/stores/cart'
import { usePokemon } from '@/features/pokedex/composables/pokemon'
import { storeToRefs } from 'pinia'
import { Button } from 'primevue'

const cartStore = useCart()
const { cartLength, total } = storeToRefs(cartStore)
const { handlePurchasePokemons } = usePokemon()
</script>

<template>
  <div class="flex flex-col space-y-2 md:col-span-1">
    <h3 class="text-2xl font-bold uppercase">Cart summary</h3>
    <div class="flex items-center justify-between">
      <p>{{ cartLength }} <span>products</span></p>
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
