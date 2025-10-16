import { useRouter } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { useToast } from 'primevue'
import { useServices } from '@/composables/services'

export const useAuth = () => {
  const router = useRouter()
  const toast = useToast()
  const { firebaseAuthService, pokemonService } = useServices()

  const { isLoading: isGoogleAuthLoading, execute: executeHandleLoginWithGoogle } = useAsyncState(
    () => handleLoginWithGoogle(),
    null,
    {
      immediate: false,
    },
  )

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
      await pokemonService.createStarterPokedex(result.user!.uid)

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
      await pokemonService.createStarterPokedex(result.user!.uid)

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
    googleAuth: {
      isGoogleAuthLoading,
      executeHandleLoginWithGoogle,
    },
    handleLogout,
  }
}
