<template>
  <van-nav-bar :fixed="true" :placeholder="true">
    <template #left>
      <div class="leftIcon">
        <iconpark-icon name="bookmark-three-66p67o22" size="23px"></iconpark-icon>
        <span>账本</span>
      </div>
    </template>
  </van-nav-bar>
  <div class="main">
    <van-button type="primary" class="addBtn" block @click="() => (activeSheetIsShow = true)">
      <iconpark-icon name="add-three"></iconpark-icon>
      <div>添加一条新记账</div>
    </van-button>
    <template v-for="account in accountArr" :key="account.id">
      <AccountItem :account="account" />
    </template>
  </div>
  <AddRecord v-model:active-sheet-is-show="activeSheetIsShow" :get-account="getAccount"></AddRecord>
  <BottomTabbar :now-active="0" :placeholder="true" />
</template>

<script setup lang="ts">
// import APIS from '@/api'
import { accountProps } from '@/@types/api'
import APIS from '@/api'
import { onMounted, ref } from 'vue'
import AddRecord from '../components/AddRecord.vue'
import AccountItem from '@/components/AccountItem.vue'

const activeSheetIsShow = ref(false) // 是否显示添加框
const accountArr = ref<accountProps[]>([]) // 账目列表

// 获取账目信息
const getAccount = async () => {
  const arr = await APIS.GET_ACCOUNT()
  accountArr.value = arr.data
}

onMounted(async () => {
  await getAccount()
})
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
