<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth } from '@features/auth/composables/auth'
import { useAuthForm } from '@features/auth/composables/authForm'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { loginSchema } from '@features/auth/schemas/auth.schema'
import { Form } from '@primevue/forms'
import GoogleLogo from '@features/auth/assets/icons/GoogleLogo.vue'
import { Card, InputText, Message, Button } from 'primevue'

const initialValues = reactive({
  email: '',
  password: '',
})

const resolver = ref(zodResolver(loginSchema))

const {
  googleAuth: { isGoogleAuthLoading, executeHandleLoginWithGoogle },
  handleLoginWithEmailAndPassword,
} = useAuth()

const { isSubmitting: isEmailAuthLoading, onFormSubmit } = useAuthForm(
  async ({ email, password }) => {
    await handleLoginWithEmailAndPassword(email, password)
  },
)
</script>

<template>
  <div class="mx-auto max-w-lg rounded p-4">
    <Card>
      <template #title>Login Form</template>
      <template #subtitle> Fill the form to login </template>
      <template #content>
        <Form
          class="flex w-full flex-col gap-4"
          v-slot="$form"
          :initialValues
          :resolver
          @submit="onFormSubmit"
        >
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
          <Button type="submit" :disabled="isGoogleAuthLoading || isEmailAuthLoading">
            Login
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
            You dont have an account?
            <RouterLink class="underline" :to="{ name: 'signup' }">Sign Up</RouterLink>
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>
