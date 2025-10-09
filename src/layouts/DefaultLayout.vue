<script setup lang="ts">
import FooterC from '@/components/FooterC.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main class="container mx-auto">
    <slot />
  </main>

  <FooterC />
</template>
