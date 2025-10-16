import { useFirebaseAuth } from 'vuefire'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'
import { db } from '@/config/firebase'
import { getFirebaseErrorMessage } from '@features/auth/utils/firebaseErrorMessages'
import { REGISTER_COINS } from '@features/auth/constants'
import type { FirebaseAuthResult } from '@features/auth/types/auth'
import type { UserData, UserInfo } from '@features/auth/types/auth'

export default class FirebaseAuthService {
  auth = useFirebaseAuth()!
  googleAuthProvider = new GoogleAuthProvider()

  constructor() {}

  public async signUpWithEmailAndPassword(
    displayName: string,
    email: string,
    password: string,
  ): Promise<FirebaseAuthResult> {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password)

      await updateProfile(user, { displayName })

      await this.createUser(user.uid)

      return {
        success: true,
        user,
      }
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        return {
          success: false,
          error: getFirebaseErrorMessage(e.code),
        }
      }

      return {
        success: false,
        error: 'Something went wrong',
      }
    }
  }

  public async loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<FirebaseAuthResult> {
    try {
      const { user } = await signInWithEmailAndPassword(this.auth, email, password)

      return {
        success: true,
        user,
      }
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        return {
          success: false,
          error: getFirebaseErrorMessage(e.code),
        }
      }

      return {
        success: false,
        error: 'Something went wrong',
      }
    }
  }

  public async loginWithGoogle(): Promise<FirebaseAuthResult> {
    try {
      const { user } = await signInWithPopup(this.auth, this.googleAuthProvider)

      await this.createUser(user.uid)

      return {
        success: true,
        user,
      }
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        return {
          success: false,
          error: getFirebaseErrorMessage(e.code),
        }
      }

      return {
        success: false,
        error: 'Something went wrong',
      }
    }
  }

  public async logout(): Promise<void> {
    await signOut(this.auth)
  }

  async getUser(uid: string): Promise<UserInfo> {
    const docRef = doc(db, 'users', uid)

    const docSnap = await getDoc(docRef)

    return {
      exists: docSnap.exists(),
      data: docSnap.data() as UserData,
    }
  }

  private async createUser(uid: string): Promise<void> {
    const userRef = doc(db, 'users', uid)

    const userExists = (await this.getUser(uid)).exists

    if (!userExists) {
      await setDoc(userRef, {
        uid,
        coins: REGISTER_COINS,
      })
    }
  }
}
