<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePokemon } from '@/composables/pokemon'
import { useFetch } from '@vueuse/core'
import { Card, InputText, Button, Message } from 'primevue'
import { getRandomInt } from '@/utils/randomInt'
import { formattedString } from '@/utils/pokemonName'
import type { PokedexRaw, Pokemon } from '@/types/pokemon'

const allPokemons = ref<PokedexRaw[]>([])
const currentPokemonUrl = ref('')
const userGuess = ref('')
const feedback = ref('')
const gameFinished = ref(false)
const { handleGuessThePokemonMinigame } = usePokemon()

const {
  isFetching,
  data: pokemonData,
  execute: fetchPokemon,
} = useFetch<Pokemon>(currentPokemonUrl, {
  refetch: true,
  immediate: false,
}).json()

const hiddenImageClass = computed(() => (gameFinished.value ? '' : 'brightness-0'))
const pokemonName = computed(() => pokemonData.value?.name?.replace(/-/g, ' ') ?? '')

async function initGame() {
  if (!allPokemons.value.length) {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    const json = await res.json()
    allPokemons.value = json.results
  }

  const randIndex = getRandomInt(0, allPokemons.value.length - 1)
  currentPokemonUrl.value = allPokemons.value[randIndex]?.url as string

  gameFinished.value = false
  feedback.value = ''
  userGuess.value = ''

  await fetchPokemon()

  console.log(allPokemons.value[randIndex]?.name as string)
}

async function checkGuess() {
  if (!pokemonData.value) return
  const normalizedGuess = userGuess.value.trim().toLowerCase()
  const normalizedName = pokemonName.value.toLowerCase()

  if (normalizedGuess === normalizedName) {
    await handleGuessThePokemonMinigame()

    feedback.value = '✅ Correct!'
  } else {
    feedback.value = `❌ Incorrect! It was ${formattedString(pokemonName.value)}.`
  }

  gameFinished.value = true
}

onMounted(initGame)
</script>

<template>
  <div class="my-12 flex justify-center p-4">
    <Card v-if="!isFetching && pokemonData" class="w-full max-w-lg">
      <template #header>
        <div class="flex justify-center">
          <img
            :src="pokemonData.sprites?.other['official-artwork']?.front_default"
            alt="Guess the Pokémon"
            :class="hiddenImageClass"
          />
        </div>
      </template>

      <template #content>
        <Message v-if="feedback" severity="info" class="mb-3">{{ feedback }}</Message>

        <div v-if="!gameFinished" class="flex flex-col gap-2">
          <InputText
            type="text"
            placeholder="Who's that Pokémon?"
            v-model="userGuess"
            @keyup.enter="checkGuess"
          />
          <Button label="Guess" @click="checkGuess" />
        </div>

        <div v-else class="flex flex-col gap-2">
          <Button label="Play again" @click="initGame" />
        </div>
      </template>
    </Card>

    <div v-else-if="isFetching" class="text-center text-gray-500">Loading Pokémon...</div>
  </div>
</template>
