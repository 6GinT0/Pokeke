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
      path: '/pokedex',
      name: 'pokedex',
      component: () => import('@/views/PokedexView.vue'),
      meta: {
        title: 'Pokedex',
        requiresAuth: true,
      },
    },
    {
      path: '/battle',
      name: 'battle',
      component: () => import('@/views/BattleView.vue'),
      meta: {
        title: 'Battle',
        requiresAuth: true,
      },
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('@/views/ShopView.vue'),
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
          component: () => import('@/views/auth/LoginView.vue'),
          meta: {
            title: 'Login',
          },
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/views/auth/SignUpView.vue'),
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
