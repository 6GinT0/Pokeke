<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dialog } from 'primevue'
import { formattedString } from '@/utils/pokemonName'
import PokemonCard from '@/features/pokedex/components/pokeball/PokemonCard.vue'

const props = defineProps<{
  visible: boolean
  pokemon: any | null
}>()

const emits = defineEmits(['update:visible', 'close'])

const localVisible = ref(props.visible)

watch(
  () => props.visible,
  (value) => (localVisible.value = value),
)

watch(localVisible, (value) => {
  emits('update:visible', value)

  if (!value) emits('close')
})
</script>

<template>
  <Dialog
    v-model:visible="localVisible"
    modal
    :header="pokemon?.name ? formattedString(pokemon.name) : 'Pokemon'"
    :style="{ width: '25rem' }"
  >
    <PokemonCard :pokemon="pokemon" />
  </Dialog>
</template>
