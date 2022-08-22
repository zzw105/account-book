import { accountProps } from '@/@types/api'
import { defineStore } from 'pinia'

interface useGlobalStoreStateProps {
  accountArr: accountProps[]
}

export const useGlobalStore = defineStore('storeId', {
  state: (): useGlobalStoreStateProps => {
    return {
      accountArr: []
    }
  },
  getters: {
    getAccountArr: (state) => state.accountArr
  },
  actions: {
    setAccountArr(data: accountProps[]) {
      this.accountArr = data
    }
  }
})
