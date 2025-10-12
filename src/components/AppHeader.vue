<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUser } from '@/composables/user'
import { useAuth } from '@/composables/auth'
import { useCurrentUser } from 'vuefire'
import { Button, Menubar, Drawer } from 'primevue'

const { userData } = useUser()
const { handleLogout } = useAuth()
const currentUser = useCurrentUser()
const visible = ref(false)
const items = ref([
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Minigame',
    route: '/minigame',
  },
  {
    label: 'Pokedex',
    route: '/pokedex',
  },
  {
    label: 'Shop',
    route: '/shop',
  },
])
const itemsMobile = ref([
  ...items.value,
  {
    label: 'My bag',
    route: '/cart',
  },
])
</script>

<template>
  <header class="border-b border-zinc-700 bg-zinc-800">
    <div class="container mx-auto flex items-center justify-between p-2">
      <img src="/logo.png" alt="Logo del sitio" class="w-8" />
      <div class="lg:hidden">
        <Drawer v-model:visible="visible" position="right">
          <template #header>
            <img src="/logo.png" alt="Logo del sitio" class="w-8" />
          </template>
          <div class="flex flex-col space-y-4">
            <RouterLink
              class="hover:bg-zinc-700"
              v-for="item in itemsMobile"
              :key="item.label"
              :to="item.route"
            >
              {{ item.label }}
            </RouterLink>
          </div>
          <template #footer>
            <div class="flex flex-col gap-4">
              <div v-if="currentUser">My bag: ${{ userData?.coins }}</div>
              <Button v-if="currentUser" @click="handleLogout">Logout</Button>
              <RouterLink v-else to="/auth/login">
                <Button>Login</Button>
              </RouterLink>
            </div>
          </template>
        </Drawer>
        <Button icon="pi pi-bars" variant="outlined" @click="visible = true" />
      </div>
      <div class="hidden items-center gap-3 lg:flex">
        <Menubar :model="items" breakpoint="320px">
          <template #item="{ item, props }">
            <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route">
              <a :href="href" v-bind="props.action" @click="navigate">
                <span>{{ item.label }}</span>
              </a>
            </RouterLink>
          </template>
        </Menubar>

        <div v-if="currentUser">My bag: ${{ userData?.coins }}</div>
        <RouterLink to="/cart">
          <Button type="button" icon="pi pi-shopping-cart" variant="outlined" />
        </RouterLink>
        <Button v-if="currentUser" @click="handleLogout">Logout</Button>
        <RouterLink v-else to="/auth/login">
          <Button>Login</Button>
        </RouterLink>
      </div>
    </div>
  </header>
</template>
