<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { usePokemon } from '@features/pokedex/composables/pokemon'
import PokeballBall from './PokeballBall.vue'
import { Dialog } from 'primevue'
import type { PokemonParsedData } from '@/types/pokemon'

const props = defineProps<{
  pokemon: PokemonParsedData | any
  routeInPokedex?: boolean
  pokemonInPokedex?: boolean
}>()

const visible = ref(false)
const { pokemon } = toRefs(props)
const { formattedName } = usePokemon()
</script>

<template>
  <div
    class="card flex flex-col items-center overflow-hidden rounded-xl border-3 border-zinc-700 bg-zinc-800"
  >
    <slot name="header" />
    <div
      class="flex h-[192px] w-full items-center justify-center"
      :class="[pokemonInPokedex ? 'bg-gray-300' : 'bg-rose-500']"
    >
      <img
        :src="pokemon.image"
        :alt="pokemon.name"
        class="h-full w-full object-contain"
        :class="{ 'grayscale-100': pokemonInPokedex }"
      />
    </div>
    <div class="card__avatar bg-zinc-800">
      <PokeballBall @click="visible = true" />
    </div>
    <div class="card__title">{{ formattedName(pokemon.name) }}</div>
  </div>

  <Dialog
    v-if="routeInPokedex"
    v-model:visible="visible"
    modal
    :header="formattedName(pokemon.name)"
    :style="{ width: '25rem' }"
  >
    <div
      class="card__dialog flex flex-col items-center overflow-hidden rounded-xl border-3 border-zinc-700 bg-zinc-800"
    >
      <div class="flex h-[192px] w-full items-center justify-center bg-rose-500">
        <img :src="pokemon.image" :alt="pokemon.name" class="h-full w-full object-contain" />
      </div>
      <div class="my-4 flex w-full flex-col justify-start px-4 py-2">
        <div v-for="(stat, idx) in pokemon.stats" class="flex gap-x-2" :key="idx">
          <div>{{ formattedName(stat.stat.name) }}:</div>
          <div>{{ stat.base_stat }}</div>
        </div>
      </div>
    </div>
  </Dialog>
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

.card__dialog {
  position: relative;
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
