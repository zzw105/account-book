import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { Button, NavBar, Field, CellGroup } from 'vant'
import APIS from '@/api'

const app = createApp(App)
app.use(router).use(Button).use(NavBar).use(Field).use(CellGroup).mount('#app')
app.config.globalProperties.$axios = APIS
