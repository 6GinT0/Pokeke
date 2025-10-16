import { computed } from 'vue'
import { useCurrentUser, useCollection, useDocument } from 'vuefire'
import { doc, collection } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { PokemonParsedData } from '@/types/pokemon'

export const useUser = () => {
  const currentUser = useCurrentUser()

  const userDoc = computed(() =>
    currentUser.value ? doc(collection(db, 'users'), currentUser.value?.uid) : null,
  )

  const userRealtimeData = useDocument(userDoc)

  const pokedexCollection = computed(() =>
    currentUser.value ? collection(db, 'users', currentUser.value.uid, 'rawPokedex') : null,
  )

  const pokedexRealtimeData = useCollection(pokedexCollection)

  const pokemonInPokedex = computed(() => {
    return (pokemon: PokemonParsedData) =>
      pokedexRealtimeData.value.some((p) => p.name === pokemon.name)
  })

  return {
    currentUser,
    user: userRealtimeData,
    pokedex: pokedexRealtimeData,
    pokemonInPokedex,
  }
}
