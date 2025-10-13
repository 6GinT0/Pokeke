import { ref } from 'vue'
import type { FormSubmitEvent } from '@primevue/forms'

export const useAuthForm = (submitHandler: (values: any) => Promise<void>) => {
  const isSubmitting = ref(false)

  const onFormSubmit = async ({ valid, values }: FormSubmitEvent) => {
    if (!valid) return

    isSubmitting.value = true

    await submitHandler(values)

    isSubmitting.value = false
  }

  return {
    isSubmitting,
    onFormSubmit,
  }
}
