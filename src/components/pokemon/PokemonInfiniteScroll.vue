<script setup lang="ts">
import { ref, watch, useTemplateRef } from 'vue'
import { useAsyncState, useElementVisibility } from '@vueuse/core'
import type { PokedexRaw } from '@/types/pokemon'

const emit = defineEmits(['set-pokemons'])

const page = ref(1)
const target = useTemplateRef<HTMLDivElement>('target')
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

    emit('set-pokemons', responses)

    return responses
  },
  null,
  {
    immediate: true,
  },
)

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
  <div class="my-12 grid gap-6 md:grid-cols-3 xl:grid-cols-4">
    <slot name="card" />
  </div>

  <div v-if="!isLoading" class="sr-only h-10" ref="target" />
</template>
