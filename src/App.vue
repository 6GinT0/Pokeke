<script setup lang="ts">
/* Layouts */
import DefaultLayout from '@/layouts/DefaultLayout.vue'
/* Other */
import Toast from 'primevue/toast'
</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>

  <Toast />
</template>
