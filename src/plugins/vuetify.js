// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'


const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
    icons: {
        efaultSet: 'mdi', // This is already the default value - only for display purposes
    },
    defaults: {
        VBtn: {
            style: 'outline: none;',
        },
        VRow:{
            style: 'margin: 0; padding: 16px'
        },
        VContainer:{
            style: 'max-width: none; min-width: none;'
        }
    },
})


export default vuetify;