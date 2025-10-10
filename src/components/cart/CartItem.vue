<script setup lang="ts">
import { useCart } from '@/stores/cart'
import { formattedString } from '@/utils/pokemonName'
import type { PokemonCart } from '@/stores/cart'
import { Button } from 'primevue'

defineProps<{
  pokemon: PokemonCart
}>()

const { removePokemon } = useCart()
</script>

<template>
  <article
    class="flex justify-between py-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-zinc-700"
  >
    <span class="text-2xl font-semibold">{{ formattedString(pokemon.name) }}</span>
    <div class="flex items-center gap-3">
      <p class="text-sm">
        Price: <span class="font-semibold">{{ pokemon.price }}</span>
      </p>
      <Button
        icon="pi pi-trash"
        variant="text"
        severity="secondary"
        size="small"
        rounded
        @click="removePokemon(pokemon)"
      />
    </div>
  </article>
</template>
