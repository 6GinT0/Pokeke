<script setup lang="ts">
import { useCart } from '@features/shop/stores/cart'
import { storeToRefs } from 'pinia'
import CartList from '@features/shop/components/cart/CartList.vue'
import CartSummary from '@features/shop/components/cart/CartSummary.vue'

const cartStore = useCart()
const { cartIsEmpty } = storeToRefs(cartStore)
</script>

<template>
  <div v-if="!cartIsEmpty" class="my-12 grid gap-8 p-4 md:grid-cols-3">
    <CartList />
    <CartSummary />
  </div>
  <div v-else class="my-12 p-4">
    <h2 class="text-5xl font-bold uppercase">Your cart is empty</h2>
  </div>
</template>
