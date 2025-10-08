import { computed } from 'vue'
import { useCurrentUser, useCollection } from 'vuefire'
import { collection, query, where } from 'firebase/firestore'
import { db } from '@/config/firebase'

export const useUser = () => {
  const user = useCurrentUser()

  const userQuery = computed(() => {
    if (!user.value) return null

    return query(collection(db, 'users'), where('uid', '==', user.value.uid))
  })

  const users = useCollection(userQuery)

  return {
    user: users,
  }
}
