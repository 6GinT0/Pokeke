<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { useAuth } from '@/composables/auth'
import { Card, InputText, Message, Button } from 'primevue'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { signupSchema } from '@/schemas/auth.schema'
import GoogleLogo from '@/assets/icons/GoogleLogo.vue'

const initialValues = reactive({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const resolver = ref(zodResolver(signupSchema))
const isEmailAuthLoading = ref(false)

const { handleLoginWithGoogle, handleSignUpWithEmailAndPassword } = useAuth()

const { isLoading: isGoogleAuthLoading, execute: executeHandleLoginWithGoogle } = useAsyncState(
  () => handleLoginWithGoogle(),
  null,
  {
    immediate: false,
  },
)

const onFormSubmit = async (e: FormSubmitEvent) => {
  const { valid, values } = e

  if (valid) {
    isEmailAuthLoading.value = true

    const { displayName, email, password } = values

    await handleSignUpWithEmailAndPassword(displayName, email, password)

    isEmailAuthLoading.value = false
  }
}
</script>

<template>
  <div class="max-w-lg p-4 rounded mx-auto">
    <Card>
      <template #title>SignUp Form</template>
      <template #subtitle> Fill the form to SignUp </template>
      <template #content>
        <Form
          class="flex flex-col gap-4 w-full"
          v-slot="$form"
          :initialValues
          :resolver
          @submit="onFormSubmit"
        >
          <div class="flex flex-col gap-1">
            <label for="displayName">Username</label>
            <InputText type="text" name="displayName" id="displayName" placeholder="John Doe" />
            <Message
              v-if="$form.displayName?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.displayName.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="email">Email</label>
            <InputText type="email" name="email" id="email" placeholder="johndoe@gmail.com" />
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
              {{ $form.email.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="password">Password</label>
            <InputText type="password" name="password" id="password" placeholder="•••••••" />
            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
              {{ $form.password.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="confirmPassword">Confirm Password</label>
            <InputText
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="•••••••"
            />
            <Message
              v-if="$form.confirmPassword?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.confirmPassword.error?.message }}
            </Message>
          </div>
          <Button type="submit" :disabled="isGoogleAuthLoading || isEmailAuthLoading">
            Sign Up
          </Button>
          <Button
            type="button"
            severity="primary"
            variant="outlined"
            :disabled="isGoogleAuthLoading || isEmailAuthLoading"
            @click="() => executeHandleLoginWithGoogle()"
          >
            <GoogleLogo />
            Login with Google
          </Button>
        </Form>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <p class="text-sm text-gray-300">
            You already have an account?
            <RouterLink class="underline" :to="{ name: 'login' }">Login</RouterLink>
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>
