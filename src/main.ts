import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
/* VueFire */
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'
/* PrimeVue */
import PrimeVue from 'primevue/config'
import { CustomPreset } from './config/primevue'
import ToastService from 'primevue/toastservice'
/* Apollo */
import { apolloPlugin } from './graphql/apollo'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(apolloPlugin)
app.use(pinia)
app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})
app.use(PrimeVue, {
  theme: {
    preset: CustomPreset,
    options: {
      darkModeSelector: 'none',
    },
  },
})
app.use(ToastService)

app.mount('#app')
