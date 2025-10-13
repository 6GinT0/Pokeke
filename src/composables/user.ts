import { computed } from 'vue'
import { useCurrentUser, useCollection, useDocument } from 'vuefire'
import { doc, collection } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Pokemon } from '@/types/pokemon'

export const useUser = () => {
  const user = useCurrentUser()

  const userDoc = computed(() =>
    user.value ? doc(collection(db, 'users'), user.value?.uid) : null,
  )

  const userRealtimeData = useDocument(userDoc)

  const pokedexCollection = computed(() =>
    user.value ? collection(db, 'users', user.value.uid, 'rawPokedex') : null,
  )

  const pokedexRealtimeData = useCollection(pokedexCollection)

  const pokemonInPokedex = computed(() => {
    return (pokemon: Pokemon) => pokedexRealtimeData.value.some((p) => p.name === pokemon.name)
  })

  return {
    user,
    userRealtimeData,
    pokedexRealtimeData,
    pokemonInPokedex,
  }
}
