<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dialog } from 'primevue'
import { formattedString } from '@/utils/pokemonName'
import PokemonCard from './PokemonCard.vue'
import type { PokedexRaw, Pokemon } from '@/types/pokemon'

const props = defineProps<{
  visible: boolean
  pokemon: PokedexRaw | null
}>()

const emits = defineEmits(['update:visible', 'close'])

const localVisible = ref(props.visible)
const renderedPokemon = ref<Pokemon | null>(null)

watch(
  () => props.visible,
  (value) => (localVisible.value = value),
)

watch(localVisible, (value) => {
  emits('update:visible', value)

  if (!value) emits('close')
})

watch(
  () => props.pokemon,
  async (newPokemon) => {
    if (!newPokemon?.url) {
      renderedPokemon.value = null

      return
    }

    const res = await fetch(newPokemon.url)

    renderedPokemon.value = await res.json()
  },
  { immediate: true },
)
</script>

<template>
  <Dialog
    v-model:visible="localVisible"
    modal
    :header="renderedPokemon?.name ? formattedString(renderedPokemon.name) : 'Nuevo Pokémon'"
    :style="{ width: '25rem' }"
  >
    <PokemonCard v-if="renderedPokemon" :pokemon="renderedPokemon" />
  </Dialog>
</template>
