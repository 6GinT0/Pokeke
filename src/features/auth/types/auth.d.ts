import type { User } from 'firebase/auth'

export interface FirebaseAuthResult {
  success: boolean
  user?: User
  error?: string
}

export interface UserInfo {
  exists: boolean
  data?: UserData
}

export interface UserData {
  uid: string
  coins: number
  cheat: boolean
}

export interface UserError {
  success: false
  error: string
}
