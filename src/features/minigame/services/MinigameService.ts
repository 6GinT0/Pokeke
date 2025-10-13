import { doc, setDoc, increment } from 'firebase/firestore'
import { db } from '@/config/firebase'
import UserService from '@/features/auth/services/UserService'

export default class MinigameService {
  private static instance: MinigameService | null = null
  private userService = UserService.getInstance()

  constructor() {}

  static getInstance(): MinigameService {
    if (!MinigameService.instance) {
      MinigameService.instance = new MinigameService()
    }

    return MinigameService.instance
  }

  public async guessThePokemonMinigame(uid: string) {
    const userInfo = await this.userService.getUser(uid)

    if (!userInfo.exists) {
      return {
        success: false,
        error: 'User not found',
      }
    }

    await setDoc(
      doc(db, 'users', userInfo.data!.uid),
      {
        ...userInfo.data,
        coins: increment(100),
      },
      { merge: true },
    )
  }
}
