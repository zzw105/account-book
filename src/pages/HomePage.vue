<template>
  <van-nav-bar :fixed="true" :placeholder="true">
    <template #left>
      <div class="leftIcon">
        <iconpark-icon name="bookmark-three-66p67o22" size="23px"></iconpark-icon>
        <span>账本 v0.1.1</span>
      </div>
    </template>
  </van-nav-bar>
  <div class="main">
    <van-button type="primary" class="addBtn" block @click="addAccount">
      <iconpark-icon name="add-three"></iconpark-icon>
      <div>添加一条新记账</div>
    </van-button>
    <template v-for="account in globalStore.allAccountArr" :key="account.id">
      <AccountItem :account="account" @click="changeAccount(account)" />
    </template>
  </div>
  <AddRecord v-model:activeSheetIsShow="activeSheetIsShow" :record-data="recordData"></AddRecord>
  <BottomTabbar :now-active="0" :placeholder="true" />
</template>

<script setup lang="ts">
import { accountProps } from '@/@types/api'
import { ref } from 'vue'
import AddRecord from '../components/AddRecord.vue'
import AccountItem from '@/components/AccountItem.vue'
import { useGlobalStore } from '@/store/global'

const activeSheetIsShow = ref(false) // 是否显示添加框
const recordData = ref<accountProps | null>(null) // 当前需要修改的项目的数据
const globalStore = useGlobalStore() // 全局仓库

// 更新账单数据
const changeAccount = (account: accountProps) => {
  activeSheetIsShow.value = true
  recordData.value = account
}

// 新增账单
const addAccount = () => {
  activeSheetIsShow.value = true
  recordData.value = null
}
</script>

<style lang="less" scoped>
.leftIcon {
  display: flex;
  span {
    margin-left: 5px;
    font-weight: 700;
  }
}
.main {
  padding: 8px;
  .addBtn {
    font-size: 17px;
    :deep(.van-button__text) {
      display: flex;
      iconpark-icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
