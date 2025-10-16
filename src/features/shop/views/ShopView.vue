<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useUser } from '@/composables/user'
import { useCart } from '@features/shop/stores/cart'
import { useShopActions } from '@features/shop/composables/shopActions'
import { useInfiniteScroll } from '@features/shop/composables/infiniteScroll'
import { usePokemonQuery } from '@/features/pokedex/composables/pokemonQuery'
import { useDialog } from '@/composables/dialog'
import { Button } from 'primevue'
import PokemonCard from '@/features/pokedex/components/pokeball/PokemonCard.vue'
import PokemonDialog from '@/components/pokemon/PokemonDialog.vue'

const { pokemonInPokedex } = useUser()
const target = useTemplateRef<HTMLDivElement>('target')
const { page } = useInfiniteScroll(target)
const { pokemons, loading } = usePokemonQuery(page)
const { dialogVisible, pokemonToShow, closeDialog, openDialogWithPokemon } = useDialog()
const { handleRandomPokemonPurchase } = useShopActions()
const { addPokemon, removePokemon, pokemonInCart } = useCart()
</script>

<template>
  <div class="my-8 flex items-center justify-end gap-x-4">
    <div class="flex items-center gap-4">
      <Button @click="openDialogWithPokemon(handleRandomPokemonPurchase)">
        $250 (Random Pokemon)
      </Button>
    </div>
  </div>

  <div class="my-12 grid gap-6 md:grid-cols-3 xl:grid-cols-4">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      :pokemon-in-pokedex="pokemonInPokedex(pokemon)"
    >
      <template v-if="!pokemonInPokedex(pokemon)" #header>
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
  </div>

  <div v-if="!loading" class="sr-only h-10" ref="target" />

  <PokemonDialog v-model:visible="dialogVisible" :pokemon="pokemonToShow" @close="closeDialog" />
</template>
