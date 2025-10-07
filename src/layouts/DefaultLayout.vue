<script setup lang="ts">
import FooterC from '@/components/FooterC.vue'
import HeaderC from '@/components/HeaderC.vue'
</script>

<template>
  <HeaderC />

  <main class="container mx-auto">
    <slot />
  </main>

  <FooterC />
</template>
