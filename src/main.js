import { createApp } from 'vue'
import App from './App.vue'
import {router} from './routers/router.js'

import vuetify from './plugins/vuetify.js'
// Toast
import ToastPlugin from 'vue-toast-notification';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


// import './style.css'
import './css/scollbar.css'
import './css/common.scss'
// Quill
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from '@vueup/vue-quill'






const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(ToastPlugin)
app.mount('#app')

app.component('QuillEditor', QuillEditor)


//Enum
import SubjectEnum from '@/enum/SubjectEnum.js';
import { TimeEnum, KnowledgeLevelEnum, KnowledgeTypeEnum } from '@/enum/PoolEnum.js';
app.config.globalProperties.$enum = {
  SubjectEnum, 
  TimeEnum, KnowledgeLevelEnum, KnowledgeTypeEnum
};
app.config.globalProperties.$toast = useToast();

