<script setup lang="ts">
import { ref, computed, watch, useTemplateRef } from 'vue'
import { useAsyncState, useElementVisibility } from '@vueuse/core'
import { usePokemon } from '@/composables/pokemon'
import { useUser } from '@/composables/user'
import type { Pokemon, PokedexRaw } from '@/types/pokemon'
import { Button } from 'primevue'
import PokemonCard from '@/components/PokemonCard.vue'

const page = ref(1)
const target = useTemplateRef<HTMLDivElement>('target')
const pokemons = ref<Pokemon[]>([])
const { user } = useUser()
const { handleRandomPokemonPurchase, handleUnlockAll } = usePokemon()
const { isLoading, execute } = useAsyncState(
  async () => {
    const limit = 20
    const offset = (page.value - 1) * limit
    const firstResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)

    const json = await firstResponse.json()

    const responses = await Promise.all(
      json.results.map(async (pokemon: PokedexRaw) => {
        const res = await fetch(pokemon.url)

        return await res.json()
      }),
    )

    pokemons.value = [...pokemons.value, ...responses]

    return responses
  },
  null,
  {
    immediate: true,
  },
)

const currentUserIsCheating = computed(() => {
  return user.value[0]?.cheat
})

const targetIsVisible = useElementVisibility(target, {
  rootMargin: '0px 0px 100px 0px',
})

watch(page, () => {
  if (!isLoading.value) {
    execute()
  }
})

watch(targetIsVisible, () => {
  if (targetIsVisible.value) {
    page.value++
  }
})
</script>

<template>
  <div class="my-8 flex justify-end gap-x-4">
    <Button
      v-if="!currentUserIsCheating"
      class="cursor-pointer bg-red-500 px-3 py-5"
      @click="handleRandomPokemonPurchase"
    >
      $250 (Random Pokemon)
    </Button>
    <Button
      v-if="!currentUserIsCheating"
      class="cursor-pointer bg-red-500 px-3 py-5"
      @click="handleUnlockAll"
    >
      Unlock All
    </Button>
  </div>
  <div class="my-12 grid gap-6 md:grid-cols-3 xl:grid-cols-4">
    <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon />
  </div>

  <div v-if="!isLoading" class="sr-only h-10" ref="target" />
</template>
