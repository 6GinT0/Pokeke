import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
/* VueFire */
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'
/* PrimeVue */
import PrimeVue from 'primevue/config'
import { CustomPreset } from './config/primevue'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(createPinia())
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
