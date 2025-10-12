<script setup lang="ts">
import Button from 'primevue/button'
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
</script>

<template>
  <main class="my-12 p-4">
    <Button>Hola</Button>
    <p v-if="user">Hello {{ user.providerData[0]?.displayName }}</p>
  </main>
</template>
