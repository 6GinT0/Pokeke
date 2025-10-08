<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useUser } from '@/composables/user'
import { useCurrentUser } from 'vuefire'
import { Avatar, Button, Menubar, Menu } from 'primevue'
import { formattedString } from '@/utils/pokemonName'

const cartMenu = ref()
const { user } = useUser()
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

const cartItems = ref([
  {
    name: 'pikachu',
    price: '250',
    quantity: 1,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    id: 25,
  },
])

const price = computed(() => {
  return cartItems.value.reduce((acc, item) => {
    return acc + parseInt(item.price)
  }, 0)
})

const currentUser = useCurrentUser()

const toggleCartMenu = (event: Event) => {
  cartMenu.value.toggle(event)
}
</script>

<template>
  <header class="border-b border-zinc-700 bg-zinc-800">
    <div class="container mx-auto flex items-center justify-between p-2">
      <h2>Logo</h2>
      <div class="flex items-center gap-6">
        <div class="card">
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
        </div>

        <Button
          v-if="currentUser"
          icon="pi pi-shopping-cart"
          severity="secondary"
          rounded
          @click="toggleCartMenu"
        />
        <Menu
          ref="cartMenu"
          id="overlay_menu"
          :model="cartItems"
          :popup="true"
          class="flex flex-col p-2"
        >
          <template #item="{ item }">
            <div class="flex items-center gap-x-2">
              <Avatar />
              <span>{{ formattedString(item.name) }}</span>
            </div>
          </template>
          <template #end>
            <div class="flex w-full flex-col items-center gap-2 border-t border-zinc-700">
              <div class="flex w-full justify-end">Total: ${{ price }}</div>
              <div v-if="currentUser" class="flex w-full justify-end">
                My bag: ${{ user[0]!.coins }}
              </div>

              <Button variant="outlined" severity="secondary" class="w-full">Purchase</Button>
            </div>
          </template>
        </Menu>
        <Button>Login</Button>
      </div>
    </div>
  </header>
</template>
