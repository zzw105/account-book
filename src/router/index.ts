import * as VueRouter from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import AssetPage from '@/pages/AssetPage.vue'
import CalendarPage from '@/pages/CalendarPage.vue'
import ChartPage from '@/pages/ChartPage.vue'
import UserPage from '@/pages/UserPage.vue'
import AddAssetPage from '@/pages/AddAssetPage.vue'
const routes = [
  { name: 'home', path: '/', component: HomePage },
  { name: 'login', path: '/login', component: LoginPage },
  { name: 'asset', path: '/asset', component: AssetPage },
  { name: 'addAsset', path: '/addAsset', component: AddAssetPage },
  { name: 'calendar', path: '/calendar', component: CalendarPage },
  { name: 'cart', path: '/cart', component: ChartPage },
  { name: 'user', path: '/user', component: UserPage }
]
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

// let first = true

// 全局前置守卫
router.beforeEach(async (to, from) => {
  // if (from.fullPath === '/' && first) {
  //   first = false
  //   const arr = await APIS.GET_ACCOUNT()
  //   setLocalStorage('accountArr', JSON.stringify(arr.data))
  // }
})

export default router
