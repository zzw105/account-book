import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { Button, NavBar, Field, CellGroup, Col, Row, Checkbox, CheckboxGroup, Dialog } from 'vant'
import APIS from '@/api'
import 'vant/es/dialog/style'

const app = createApp(App)
app.use(router).use(Button).use(NavBar).use(Field).use(CellGroup).use(Col).use(Row).use(Checkbox).use(CheckboxGroup).use(Dialog).mount('#app')
app.config.globalProperties.$axios = APIS
// root@localhost: -5wrwSnRgk)j
