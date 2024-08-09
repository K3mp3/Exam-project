import './assets/styling/main.scss'
import './index.css'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'

import { initializeApp } from 'firebase/app'

import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDBhiBvpwf1jp9SYhfmmQV85S4BdGoXzsg',
  authDomain: 'fixerfinder-81537.firebaseapp.com',
  projectId: 'fixerfinder-81537',
  storageBucket: 'fixerfinder-81537.appspot.com',
  messagingSenderId: '409626472344',
  appId: '1:409626472344:web:a90ffd66c40234f359c5ed',
  measurementId: 'G-4LZ131M36Z'
}

initializeApp(firebaseConfig)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

library.add(fas)

app.component('fontAwesome', FontAwesomeIcon)
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'primevue, tailwind-base, tailwind-utilities'
      }
    }
  }
})

app.mount('#app')
