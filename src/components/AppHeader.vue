<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUser } from '@/composables/user'
import { useAuth } from '@/composables/auth'
import { useCurrentUser } from 'vuefire'
import { Button, Menubar } from 'primevue'

const { userData } = useUser()
const { handleLogout } = useAuth()
const currentUser = useCurrentUser()
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
      <h2>Logo</h2>
      <div class="flex items-center gap-6">
        <Menubar :model="items">
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

        <div v-if="currentUser">
          My bag: ${{ userData?.coins }}
        </div>
        <Button v-if="currentUser" @click="handleLogout">Logout</Button>
        <RouterLink v-else to="/auth/login">
          <Button>Login</Button>
        </RouterLink>
      </div>
    </div>
  </header>
</template>
