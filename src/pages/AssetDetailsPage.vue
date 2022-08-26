<template>
  <div>
    <van-nav-bar left-text="返回" right-text="编辑" left-arrow :title="asset.assetName" :fixed="true" :placeholder="true" @click-left="onClickLeft" @click-right="onClickRight" />
    <van-cell-group inset class="titleBox">
      <div class="title">账户余额</div>
      <div class="price">{{ getAssetPrice() }}</div>
    </van-cell-group>
    <div class="main">
      <van-button type="primary" class="addBtn" block @click="addAccount">
        <iconpark-icon name="add-three"></iconpark-icon>
        <div>添加一条新记账</div>
      </van-button>
      <template v-for="account in accountArr" :key="account.id">
        <AccountItem :account="account" @click="changeAccount(account)" />
      </template>
    </div>
    <AddRecord v-model:activeSheetIsShow="activeSheetIsShow" :record-data="recordData"></AddRecord>
  </div>
</template>

<script setup lang="ts">
import { accountProps, assetProps } from '@/@types/api'
import { useGlobalStore } from '@/store/global'
import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const globalStore = useGlobalStore()

const asset = ref<assetProps>({ id: -1, userName: '', assetName: '', assetType: -1 })
const accountArr = ref<accountProps[]>([])
const activeSheetIsShow = ref(false) // 是否显示添加框
const recordData = ref<accountProps | null>(null) // 当前需要修改的项目

watch(
  () => route.params,
  (params) => {
    asset.value = globalStore.getAssetById(+params.assetId)
    accountArr.value = globalStore.getAccountArrByAssetId(asset.value.id)
  },
  {
    immediate: true,
    deep: true
  }
)

// 新增账单
const addAccount = () => {
  activeSheetIsShow.value = true
  recordData.value = {
    leaveOne: '其他',
    leaveTwo: '其他',
    price: 0,
    remarkText: '',
    dateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    id: -1,
    assetId: asset.value.id,
    userName: '',
    type: -1
  }
}

// 更新账单数据
const changeAccount = (account: accountProps) => {
  activeSheetIsShow.value = true
  recordData.value = account
}

const getAssetPrice = () => {
  return accountArr.value.reduce((prev, item) => {
    return prev + item.price
  }, 0)
}

const onClickRight = () => {
  router.push({
    name: 'addAsset',
    params: { assetId: asset.value.id, price: getAssetPrice() }
  })
}

const onClickLeft = () => {
  router.push({ name: 'asset' })
}
</script>

<style scoped lang="less">
.titleBox {
  margin: 5px 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  background-color: #2f88ff;
  color: #fff;
}
.main {
  padding: 8px;
  .addBtn {
    font-size: 17px;
    background-color: #6babff;
    border: #6babff;
    :deep(.van-button__text) {
      display: flex;
      iconpark-icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
