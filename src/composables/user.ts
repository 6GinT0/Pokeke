import { computed } from 'vue'
import { useCurrentUser, useCollection } from 'vuefire'
import { collection, query, where } from 'firebase/firestore'
import { db } from '@/config/firebase'

export const useUser = () => {
  const currentUser = useCurrentUser()

  const userQuery = computed(() => {
    if (!currentUser.value) return null

    return query(collection(db, 'users'), where('uid', '==', currentUser.value.uid))
  })

  const users = useCollection(userQuery)

  const userData = computed(() => (users.value[0] ? users.value[0] : null))

  return {
    user: currentUser,
    userData,
  }
}
