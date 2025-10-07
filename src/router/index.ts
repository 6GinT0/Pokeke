import { createRouter, createWebHistory } from 'vue-router'
/* Views */
import HomeView from '@/views/HomeView.vue'

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

export default router
