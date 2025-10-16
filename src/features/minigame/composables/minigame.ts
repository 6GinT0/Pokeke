import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useUser } from '@/composables/user'
import { useServices } from '@/composables/services'
import { useToast } from 'primevue'
import { usePokemon } from '@/features/pokedex/composables/pokemon'

export const useMinigame = () => {
  const { user } = useUser()
  const { minigameService, pokeAPI } = useServices()
  const loading = ref(false)
  const toast = useToast()
  const { formattedName } = usePokemon()
  const currentPokemon: Ref<any> = ref(null)
  const userGuess = ref('')
  const feedback = ref('')
  const gameFinished = ref(false)

  const hiddenImageClass = computed(() => (gameFinished.value ? '' : 'brightness-0'))
  const pokemonName = computed(() => currentPokemon.value?.name?.replace(/-/g, ' ') ?? '')

  async function initGame() {
    loading.value = true
    currentPokemon.value = await pokeAPI.getPokemonByRandomId()

    gameFinished.value = false
    feedback.value = ''
    userGuess.value = ''

    console.log(currentPokemon.value.name)
    loading.value = false
  }

  async function checkGuess() {
    if (!currentPokemon.value) return
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
    currentPokemon,
    loading,
    gameFinished,
    feedback,
    userGuess,
    hiddenImageClass,
    checkGuess,
    initGame,
  }
}
