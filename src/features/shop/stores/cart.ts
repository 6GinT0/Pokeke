import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pokemon } from '@/types/pokemon'
import { PRICE } from '../constants'

export interface PokemonCart extends Pokemon {
  price: number
}

export const useCart = defineStore(
  'cart',
  () => {
    const cart: Ref<PokemonCart[]> = ref([])

    const total = computed(() => cart.value.reduce((total, pokemon) => total + pokemon.price, 0))

    const cartIsEmpty = computed(() => cart.value.length === 0)

    const cartLength = computed(() => cart.value.length)

    const pokemonInCart = computed(() => (pokemon: Pokemon) => {
      return cart.value.some((p: Pokemon) => p.id === pokemon.id)
    })

    function addPokemon(pokemon: Pokemon) {
      const pokemonInCart = cart.value.find((p: Pokemon) => p.id === pokemon.id)

      if (!pokemonInCart) {
        cart.value.push({
          ...pokemon,
          price: PRICE,
        })
      }
    }

    function removePokemon(pokemon: Pokemon) {
      cart.value = cart.value.filter((p: Pokemon) => p.id !== pokemon.id)
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
