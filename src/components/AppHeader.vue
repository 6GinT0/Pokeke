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
    icon: 'pi pi-home',
    route: '/',
  },
  {
    label: 'Pokedex',
    icon: 'pi pi-search',
    route: '/pokedex',
  },
  {
    label: 'Shop',
    icon: 'pi pi-shopping-bag',
    route: '/shop',
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
              v-for="item in items"
              :key="item.label"
              :to="item.route"
            >
              <span class="mr-2" :class="item.icon" />
              {{ item.label }}
            </RouterLink>
          </div>
        </Drawer>
        <Button icon="pi pi-bars" variant="outlined" @click="visible = true" />
      </div>
      <div class="hidden items-center gap-6 lg:flex">
        <Menubar :model="items" breakpoint="320px">
          <template #item="{ item, props, hasSubmenu }">
            <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
              </a>
            </RouterLink>
            <a v-else :href="item.url" :target="item.target" v-bind="props.action">
              <span :class="item.icon" />
              <span>{{ item.label }}</span>
              <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
            </a>
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
