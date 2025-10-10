import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pokemon } from '@/types/pokemon'

export interface PokemonCart extends Pokemon {
  price: number
}

export const useCart = defineStore(
  'cart',
  () => {
    const pokemonCart: Ref<PokemonCart[]> = ref([])

    const total = computed(() =>
      pokemonCart.value.reduce((total, pokemon) => total + pokemon.price, 0),
    )

    const pokemonCartIsEmpty = computed(() => pokemonCart.value.length === 0)

    const pokemonInCart = computed(() => (pokemon: Pokemon) => {
      return pokemonCart.value.some((p: Pokemon) => p.id === pokemon.id)
    })

    function addPokemon(pokemon: Pokemon) {
      const pokemonInCart = pokemonCart.value.find((p: Pokemon) => p.id === pokemon.id)

      if (!pokemonInCart) {
        pokemonCart.value.push({
          ...pokemon,
          price: 250,
        })
      }
    }

    function removePokemon(pokemon: Pokemon) {
      pokemonCart.value = pokemonCart.value.filter((p: Pokemon) => p.id !== pokemon.id)
    }

    function clearCart() {
      pokemonCart.value = []
    }

    return {
      pokemonCart,
      pokemonInCart,
      pokemonCartIsEmpty,
      total,
      addPokemon,
      removePokemon,
      clearCart,
    }
  },
  {
    persist: true,
  },
)
