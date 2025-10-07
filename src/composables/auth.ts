import { useRouter } from 'vue-router'
import { useToast } from 'primevue'
import FirebaseAuthService from '@/services/firebaseAuth.service'

export const useAuth = () => {
  const router = useRouter()
  const toast = useToast()
  const firebaseAuthService = new FirebaseAuthService()

  async function handleSignUpWithEmailAndPassword(
    displayName: string,
    email: string,
    password: string,
  ) {
    const result = await firebaseAuthService.signUpWithEmailAndPassword(
      displayName,
      email,
      password,
    )

    if (result.success) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Logged in successfully',
        life: 3000,
      })

      router.push('/')
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: result.error,
        life: 3000,
      })
    }
  }

  async function handleLoginWithEmailAndPassword(email: string, password: string) {
    const result = await firebaseAuthService.loginWithEmailAndPassword(email, password)

    if (result.success) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Logged in successfully',
        life: 3000,
      })

      router.push('/')
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: result.error,
        life: 3000,
      })
    }
  }

  async function handleLoginWithGoogle() {
    const result = await firebaseAuthService.loginWithGoogle()

    if (result.success) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Logged in successfully',
        life: 3000,
      })

      router.push('/')
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: result.error,
        life: 3000,
      })
    }
  }

  async function handleLogout() {
    await firebaseAuthService.logout()

    router.push('/auth/login')
  }

  return {
    handleSignUpWithEmailAndPassword,
    handleLoginWithEmailAndPassword,
    handleLoginWithGoogle,
    handleLogout,
  }
}
