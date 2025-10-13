import { createRouter, createWebHistory } from 'vue-router'
/* Views */
import HomeView from '@/views/HomeView.vue'
/* Others */
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/minigame',
      name: 'minigame',
      component: () => import('@features/minigame/views/MinigameView.vue'),
      meta: {
        title: 'Minigame',
      },
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: () => import('@features/pokedex/views/PokedexView.vue'),
      meta: {
        title: 'Pokedex',
        requiresAuth: true,
      },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@features/shop/views/CartView.vue'),
      meta: {
        title: 'Cart',
      },
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('@features/shop/views/ShopView.vue'),
      meta: {
        title: 'Shopping',
      },
    },
    {
      path: '/auth',
      redirect: () => ({ name: 'login' }),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@features/auth/views/LoginView.vue'),
          meta: {
            title: 'Login',
          },
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@features/auth/views/RegisterView.vue'),
          meta: {
            title: 'Sign Up',
          },
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Pokeke`

  next()
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return {
        path: '/auth/login',
      }
    }
  }
})

export default router
