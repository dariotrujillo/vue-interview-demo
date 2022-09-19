import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(axios, {
    baseUrl: 'https://localhost:7216/'
  })
  .use(vuetify)
  .mount('#app')
