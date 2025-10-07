import type { User } from 'firebase/auth'

export interface FirebaseAuthResult {
  success: boolean
  user?: User
  error?: string
}
