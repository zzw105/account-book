import { accountProps } from '@/@types/api'
import APIS from '@/api'
import { defineStore } from 'pinia'

interface useGlobalStoreStateProps {
  accountArr: accountProps[]
}

export const useGlobalStore = defineStore('storeId', {
  // 开启数据持久化
  persist: true,
  state: (): useGlobalStoreStateProps => {
    return {
      accountArr: []
    }
  },
  getters: {
    /**
     * @description: 获取全部账单
     */
    allAccountArr: (state) => state.accountArr
  },
  actions: {
    /**
     * @description: 请求接口获取并设置全局账单
     */
    async setAccountArr() {
      const res = await APIS.GET_ACCOUNT()
      this.accountArr = res.data
    }
  }
})
