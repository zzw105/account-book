import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { setRemInit } from '@/utils/rem.js'

setRemInit()

createApp(App).use(router).mount('#app')
