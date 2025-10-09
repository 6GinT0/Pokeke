import { useFirebaseAuth } from 'vuefire'
import PokemonService from './pokemon.service'
import { getFirebaseErrorMessage } from '@/utils/firebaseErrorMessages'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { FirebaseError } from 'firebase/app'
import type { FirebaseAuthResult } from '@/types/auth'

export default class FirebaseAuthService {
  auth = useFirebaseAuth()!
  googleAuthProvider = new GoogleAuthProvider()
  private pokemonService = PokemonService.getInstance()

  constructor() {}

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

  private async userExists(uid: string): Promise<boolean> {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('uid', '==', uid))
    const querySnapshot = await getDocs(q)

    return !querySnapshot.empty
  }

  private async createUser(uid: string): Promise<void> {
    const usersRef = collection(db, 'users')

    const userExists = await this.userExists(uid)

    if (!userExists) {
      const userDocRef = await addDoc(usersRef, {
        uid,
        coins: 1000,
        cheat: false,
      })

      const pokedexRef = collection(userDocRef, 'rawPokedex')
      const firstPokemons = await this.pokemonService.getFirstRandomPokemons()

      const pokemonPromises = firstPokemons.map((pokemon) =>
        addDoc(pokedexRef, {
          ...pokemon,
          caughtAt: new Date(),
        }),
      )

      await Promise.all(pokemonPromises)
    }
  }
}
