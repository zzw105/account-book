import * as VueRouter from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import AssetPage from '@/pages/AssetPage.vue'
import CalendarPage from '@/pages/CalendarPage.vue'
import ChartPage from '@/pages/ChartPage.vue'
import UserPage from '@/pages/UserPage.vue'
const routes = [
  { name: 'home', path: '/', component: HomePage },
  { name: 'login', path: '/login', component: LoginPage },
  { name: 'asset', path: '/asset', component: AssetPage },
  { name: 'calendar', path: '/calendar', component: CalendarPage },
  { name: 'cart', path: '/cart', component: ChartPage },
  { name: 'user', path: '/user', component: UserPage }
]
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

export default router
