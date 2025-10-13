<script setup lang="ts">
import { onMounted } from 'vue'
import { useMinigame } from '@/features/minigame/composables/minigame'
import { Card, InputText, Button, Message } from 'primevue'

const {
  gameFinished,
  feedback,
  userGuess,
  pokemonData,
  hiddenImageClass,
  isFetching,
  checkGuess,
  initGame,
} = useMinigame()

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
