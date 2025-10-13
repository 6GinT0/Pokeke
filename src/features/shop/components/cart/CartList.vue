<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCart } from '@features/shop/stores/cart'
import CartItem from './CartItem.vue'

const cartStore = useCart()
const { cart, cartLength, total } = storeToRefs(cartStore)
</script>

<template>
  <div class="space-y-6 md:col-span-2">
    <div class="space-y-2">
      <h2 class="text-5xl font-bold uppercase">Your cart</h2>
      <p>
        <span class="uppercase">Total:</span> ({{ cartLength }})
        <span class="font-bold uppercase">{{ total }} coins</span>
      </p>
    </div>
    <div class="flex flex-col">
      <CartItem v-for="pokemon in cart" :key="pokemon.id" :pokemon="pokemon" />
    </div>
  </div>
</template>
