import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { PokemonParsedData } from '@/types/pokemon'
import { PRICE } from '../constants'

export interface PokemonCart extends PokemonParsedData {
  price: number
}

export const useCart = defineStore(
  'cart',
  () => {
    const cart: Ref<PokemonCart[]> = ref([])

    const total = computed(() => cart.value.reduce((total, pokemon) => total + pokemon.price, 0))

    const cartIsEmpty = computed(() => cart.value.length === 0)

    const cartLength = computed(() => cart.value.length)

    const pokemonInCart = computed(() => (pokemon: PokemonParsedData) => {
      return cart.value.some((p: PokemonParsedData) => p.id === pokemon.id)
    })

    function addPokemon(pokemon: PokemonParsedData) {
      const pokemonInCart = cart.value.find((p: PokemonParsedData) => p.id === pokemon.id)

      if (!pokemonInCart) {
        cart.value.push({
          ...pokemon,
          price: PRICE,
        })
      }
    }

    function removePokemon(pokemon: PokemonParsedData) {
      cart.value = cart.value.filter((p: PokemonParsedData) => p.id !== pokemon.id)
    }

    function clearCart() {
      cart.value = []
    }

    return {
      cart,
      cartIsEmpty,
      cartLength,
      pokemonInCart,
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
