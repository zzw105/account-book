import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { Button, NavBar, Field, CellGroup, Col, Row, Checkbox, CheckboxGroup, Dialog, Tabbar, TabbarItem, ActionSheet, Tab, Tabs, Calendar, DatetimePicker, Popup } from 'vant'
import APIS from '@/api'
import 'vant/es/dialog/style'
import 'vant/es/toast/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

const app = createApp(App)
app
  .use(router)
  .use(Button)
  .use(NavBar)
  .use(Field)
  .use(CellGroup)
  .use(Col)
  .use(Row)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Dialog)
  .use(Tabbar)
  .use(TabbarItem)
  .use(ActionSheet)
  .use(Tab)
  .use(Tabs)
  .use(Calendar)
  .use(Popup)
  .use(DatetimePicker)
  .mount('#app')
app.config.globalProperties.$axios = APIS
// root@localhost: -5wrwSnRgk)j
