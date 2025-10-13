import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { UserData, UserInfo } from '../types/auth'

export default class UserService {
  private static instance: UserService

  static getInstance() {
    if (!UserService.instance) UserService.instance = new UserService()
    return UserService.instance
  }

  async getUser(uid: string): Promise<UserInfo> {
    const docRef = doc(db, 'users', uid)

    const docSnap = await getDoc(docRef)

    return {
      exists: docSnap.exists(),
      data: docSnap.data() as UserData,
    }
  }

  async createUser(uid: string, data: object): Promise<void> {
    await setDoc(doc(db, 'users', uid), data)
  }
}
