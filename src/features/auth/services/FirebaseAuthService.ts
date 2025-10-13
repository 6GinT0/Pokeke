import { useFirebaseAuth } from 'vuefire'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'
import type { User, UserCredential } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'
import { db } from '@/config/firebase'
import { getFirebaseErrorMessage } from '@features/auth/utils/firebaseErrorMessages'
import { REGISTER_COINS } from '@features/auth/constants'
import type { FirebaseAuthResult } from '@features/auth/types/auth'
import UserService from './UserService'

export default class FirebaseAuthService {
  private static instance: FirebaseAuthService | null = null
  auth = useFirebaseAuth()!
  googleAuthProvider = new GoogleAuthProvider()
  userService = UserService.getInstance()

  constructor() {}

  static getInstance(): FirebaseAuthService {
    if (!FirebaseAuthService.instance) {
      FirebaseAuthService.instance = new FirebaseAuthService()
    }

    return FirebaseAuthService.instance
  }

  private async handleAuthRequest(
    authFunction: Promise<UserCredential>,
    customLogic?: (user: User) => Promise<void>,
  ): Promise<FirebaseAuthResult> {
    try {
      const { user } = await authFunction

      if (customLogic) {
        await customLogic(user)
      }

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

  public async signUpWithEmailAndPassword(
    displayName: string,
    email: string,
    password: string,
  ): Promise<FirebaseAuthResult> {
    return this.handleAuthRequest(
      createUserWithEmailAndPassword(this.auth, email, password),
      async (user) => {
        await updateProfile(user, { displayName })
        await this.createUser(user.uid)
      },
    )
  }

  public async loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<FirebaseAuthResult> {
    return this.handleAuthRequest(signInWithEmailAndPassword(this.auth, email, password))
  }

  public async loginWithGoogle(): Promise<FirebaseAuthResult> {
    return this.handleAuthRequest(signInWithPopup(this.auth, this.googleAuthProvider), (user) =>
      this.createUser(user.uid),
    )
  }

  public async logout(): Promise<void> {
    await signOut(this.auth)
  }

  private async createUser(uid: string): Promise<void> {
    const userRef = doc(db, 'users', uid)

    const userExists = (await this.userService.getUser(uid)).exists

    if (!userExists) {
      await setDoc(userRef, {
        uid,
        coins: REGISTER_COINS,
        cheat: false,
      })
    }
  }
}
