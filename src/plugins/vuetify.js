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
        VField: {
            style: 'outline: none;',
        },
        VRow:{
            style: 'margin: 0; padding: 0px 0px 16px'
        },
        VCol:{
            style: 'margin: 0; padding: 0px'
        },
        VContainer:{
            style: 'max-width: none; min-width: none;'
        },
        VCheckBox:{
            style: 'min-height: none; min-width: none; height: 36px'
        },
        VCombobox:{
            style: 'outline: none;',
        }
    },
})


export default vuetify;