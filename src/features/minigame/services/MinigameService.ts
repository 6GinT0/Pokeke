import { doc, setDoc, increment } from 'firebase/firestore'
import { db } from '@/config/firebase'
import FirebaseAuthService from '@/features/auth/services/FirebaseAuthService'

export default class MinigameService {
  constructor(private authService: FirebaseAuthService) {}

  public async guessThePokemonMinigame(uid: string) {
    const userInfo = await this.authService.getUser(uid)

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
