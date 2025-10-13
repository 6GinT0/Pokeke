import { ref, computed } from 'vue'
import { useUser } from '@/composables/user'
import { useFetch } from '@vueuse/core'
import { useToast } from 'primevue'
import { usePokemon } from '@/features/pokedex/composables/pokemon'
import PokemonService from '@/features/pokedex/services/PokemonService'
import MinigameService from '@/features/minigame/services/MinigameService'
import type { Pokemon } from '@/types/pokemon'

export const useMinigame = () => {
  const pokemonService = PokemonService.getInstance()
  const minigameService = MinigameService.getInstance()
  const { user } = useUser()
  const toast = useToast()
  const { formattedName } = usePokemon()
  const currentPokemonUrl = ref('')
  const userGuess = ref('')
  const feedback = ref('')
  const gameFinished = ref(false)

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
    const randPokemon = await pokemonService.getRandomPokemon()
    currentPokemonUrl.value = randPokemon.url

    gameFinished.value = false
    feedback.value = ''
    userGuess.value = ''

    await fetchPokemon()

    console.log(randPokemon.name)
  }

  async function checkGuess() {
    if (!pokemonData.value) return
    const normalizedGuess = userGuess.value.trim().toLowerCase()
    const normalizedName = pokemonName.value.toLowerCase()

    if (normalizedGuess === normalizedName) {
      await handleGuessThePokemonMinigame()

      feedback.value = '✅ Correct!'
    } else {
      feedback.value = `❌ Incorrect! It was ${formattedName.value(pokemonName.value)}.`
    }

    gameFinished.value = true
  }

  async function handleGuessThePokemonMinigame() {
    if (user.value) {
      await minigameService.guessThePokemonMinigame(user.value.uid)

      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'You guessed the Pokemon!',
        life: 3000,
      })
    }
  }

  return {
    gameFinished,
    feedback,
    userGuess,
    pokemonData,
    hiddenImageClass,
    isFetching,
    checkGuess,
    initGame,
  }
}
