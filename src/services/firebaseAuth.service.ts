import { useFirebaseAuth } from 'vuefire'
import { getFirebaseErrorMessage } from '@/utils/firebaseErrorMessages'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import type { FirebaseAuthResult } from '@/types/auth'

export default class FirebaseAuthService {
  auth = useFirebaseAuth()!
  googleAuthProvider = new GoogleAuthProvider()

  constructor() {}

  async signUpWithEmailAndPassword(
    displayName: string,
    email: string,
    password: string,
  ): Promise<FirebaseAuthResult> {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password)

      await updateProfile(user, {
        displayName,
      })

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

  async loginWithEmailAndPassword(email: string, password: string): Promise<FirebaseAuthResult> {
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

  async loginWithGoogle(): Promise<FirebaseAuthResult> {
    try {
      const { user } = await signInWithPopup(this.auth, this.googleAuthProvider)

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

  async logout(): Promise<void> {
    await signOut(this.auth)
  }
}
