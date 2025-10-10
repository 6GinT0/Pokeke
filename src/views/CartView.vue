<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCart } from '@/stores/cart'
import CartList from '@/components/cart/CartList.vue'
import CartSummary from '@/components/cart/CartSummary.vue'

const cart = useCart()
const { pokemonCartIsEmpty } = storeToRefs(cart)
</script>

<template>
  <div v-if="!pokemonCartIsEmpty" class="my-12 grid gap-8 p-4 md:grid-cols-3">
    <CartList />
    <CartSummary />
  </div>
  <div v-else class="my-12 p-4">
    <h2 class="text-5xl font-bold uppercase">Your cart is empty</h2>
  </div>
</template>
