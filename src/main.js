import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/router.js'
import vuetify from './plugins/vuetify.js'
// import './style.css'

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')

