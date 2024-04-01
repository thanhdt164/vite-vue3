import { createApp } from 'vue'
import App from './App.vue'
// import axios from './axios/axios.js'
import router from './routers/router.js'
import vuetify from './plugins/vuetify.js'
// Toast
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


// import './style.css'
import './css/scollbar.css'
import './css/common.css'
// Quill
import '@vueup/vue-quill/dist/vue-quill.snow.css';


const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(ToastPlugin)
app.mount('#app')

