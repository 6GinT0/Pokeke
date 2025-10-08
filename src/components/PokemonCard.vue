<script setup lang="ts">
import { toRefs } from 'vue'
import { formattedString } from '@/utils/pokemonName'
import type { Pokemon } from '@/types/pokemon'
import PokeballC from '@/components/PokeballC.vue'

const props = defineProps<{
  pokemon: Pokemon
}>()

const { pokemon } = toRefs(props)
</script>

<template>
  <div
    class="card flex flex-col items-center overflow-hidden rounded-xl border-3 border-zinc-700 bg-zinc-800"
  >
    <div class="flex h-[192px] w-full items-center justify-center bg-rose-500">
      <img
        :src="pokemon.sprites.other['official-artwork'].front_default"
        :alt="pokemon.name"
        class="h-full w-full object-contain"
      />
    </div>
    <div class="card__avatar bg-zinc-800">
      <PokeballC />
    </div>
    <div class="card__title">{{ formattedString(pokemon.name) }}</div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
}

.card__img {
  height: 192px;
  width: 100%;
}

.card__img img {
  height: 100%;
  border-radius: 20px 20px 0 0;
}

.card__avatar {
  position: absolute;
  width: 114px;
  height: 114px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: calc(50% - 10px);
}

.card__title {
  margin-top: 60px;
  font-weight: 500;
  font-size: 18px;
  color: var(--main-color);
}
</style>
