<script setup lang="ts">
import { ref } from 'vue'
import { usePokemon } from '@/composables/pokemon'
import { useDialog } from '@/composables/dialog'
import { useUser } from '@/composables/user'
import { useCart } from '@/stores/cart'
import type { Pokemon } from '@/types/pokemon'
import { Button } from 'primevue'
import PokemonCard from '@/components/pokemon/PokemonCard.vue'
import PokemonDialog from '@/components/pokemon/PokemonDialog.vue'
import PokemonInfiniteScroll from '@/components/pokemon/PokemonInfiniteScroll.vue'

const pokemons = ref<Pokemon[]>([])
const { dialogVisible, pokemonToShow, closeDialog, openDialogWithPokemon } = useDialog()
const { pokemonInPokedex, currentUserIsCheating } = useUser()
const { handleRandomPokemonPurchase, handleUnlockAll } = usePokemon()
const { addPokemon, removePokemon, pokemonInCart } = useCart()

const setPokemons = (pokemonsData: Pokemon[]) => {
  pokemons.value = [...pokemons.value, ...pokemonsData]
}
</script>

<template>
  <div class="my-8 flex items-center justify-end gap-x-4">
    <div v-if="!currentUserIsCheating" class="flex items-center gap-4">
      <Button @click="openDialogWithPokemon(handleRandomPokemonPurchase)">
        $250 (Random Pokemon)
      </Button>
      <Button @click="handleUnlockAll">Unlock All</Button>
    </div>
  </div>

  <PokemonInfiniteScroll @set-pokemons="setPokemons">
    <template #card>
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        :pokemon-in-pokedex="pokemonInPokedex(pokemon)"
      >
        <template v-if="!pokemonInPokedex(pokemon) && !currentUserIsCheating" #header>
          <div class="absolute top-2 right-2">
            <Button
              v-if="!pokemonInCart(pokemon)"
              icon="pi pi-shopping-cart"
              size="small"
              rounded
              @click="addPokemon(pokemon)"
            />

            <Button
              v-if="pokemonInCart(pokemon)"
              icon="pi pi-times"
              size="small"
              severity="danger"
              rounded
              @click="removePokemon(pokemon)"
            />
          </div>
        </template>
      </PokemonCard>
    </template>
  </PokemonInfiniteScroll>

  <PokemonDialog v-model:visible="dialogVisible" :pokemon="pokemonToShow" @close="closeDialog" />
</template>
