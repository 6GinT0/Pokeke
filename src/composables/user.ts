import { computed } from 'vue'
import { computedAsync } from '@vueuse/core'
import { useCurrentUser, useCollection } from 'vuefire'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Pokemon } from '@/types/pokemon'

export const useUser = () => {
  const currentUser = useCurrentUser()

  const userQuery = computed(() => {
    if (!currentUser.value) return null

    return query(collection(db, 'users'), where('uid', '==', currentUser.value.uid))
  })

  const pokedexQuery = computedAsync(async () => {
    if (!currentUser.value) return null

    const q = query(collection(db, 'users'), where('uid', '==', currentUser.value.uid))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const userDoc = querySnapshot.docs[0]
    const userId = userDoc!.id

    const pokedexRef = collection(db, 'users', userId, 'rawPokedex')

    return pokedexRef
  })

  const users = useCollection(userQuery)

  const pokedex = useCollection(pokedexQuery)

  const pokemonInPokedex = computed(() => {
    return (pokemon: Pokemon) => pokedex.value.some((p) => p.name === pokemon.name)
  })

  const userData = computed(() => (users.value[0] ? users.value[0] : null))

  return {
    user: currentUser,
    userData,
    pokedex,
    pokemonInPokedex,
  }
}
