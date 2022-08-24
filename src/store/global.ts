import { accountProps, assetProps } from '@/@types/api'
import APIS from '@/api'
import { defineStore } from 'pinia'

interface useGlobalStoreStateProps {
  accountArr: accountProps[]
  assetArr: assetProps[]
}

export const useGlobalStore = defineStore('storeId', {
  // 开启数据持久化
  persist: true,
  state: (): useGlobalStoreStateProps => {
    return {
      accountArr: [],
      assetArr: []
    }
  },
  getters: {
    /**
     * @description: 获取全部账单
     */
    allAccountArr: (state) => {
      return state.accountArr
    },

    /**
     * @description: 获取当前账户的账单
     */
    accountArrInAsset: (state) => {
      return (assetId: number) => {
        return state.accountArr.filter((item) => item.assetId === assetId)
      }
    }
  },
  actions: {
    /**
     * @description: 请求接口获取并设置全局账单
     */
    async setAccountArr() {
      const res = await APIS.GET_ACCOUNT()
      this.accountArr = res.data
    },
    /**
     * @description: 请求接口获取并设置全局资产
     */
    async setAsset() {
      const res = await APIS.GET_ASSET()
      this.assetArr = res.data
    }
  }
})
