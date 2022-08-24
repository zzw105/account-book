<template>
  <van-nav-bar left-text="返回" right-text="保存" left-arrow title="添加资产账户" :fixed="true" :placeholder="true" @click-left="onClickLeft" @click-right="onClickRight" />
  <van-cell-group inset class="addAsset">
    <van-field v-model="name" label="账户名称" placeholder="请输入账户名称" />
    <van-field v-model="price" type="number" label="账户余额" placeholder="请输入账户余额" />
    <van-field v-model="result" is-link readonly name="picker" label="账户类型" placeholder="点击选择账户类型" @click="showPicker = true" />
  </van-cell-group>
  <van-popup v-model:show="showPicker" position="bottom">
    <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
  </van-popup>
</template>

<script setup lang="ts">
import { Notify } from 'vant'
import { ref, watch } from 'vue'
import { useGlobalStore } from '@/store/global'
import { useRoute, useRouter } from 'vue-router'
import APIS from '@/api'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()
const globalStore = useGlobalStore()

const columns = ['资金账户', '信贷账户']

const name = ref('账户')
const price = ref()
const result = ref()
const showPicker = ref(false)

watch(
  () => route.params,
  (params) => {
    const asset = globalStore.assetArr.find((item) => item.id === +params.assetId)
    if (!asset) return
    name.value = asset.assetName
    result.value = asset.assetType === 1 ? '资金账户' : '信贷账户'
    price.value = params.price
  },
  {
    immediate: true,
    deep: true
  }
)

const onConfirm = (value: any) => {
  result.value = value
  showPicker.value = false
}

const onClickLeft = () => {
  router.push({ name: 'asset' })
}

const onClickRight = async () => {
  if (name.value === '') {
    Notify({ type: 'warning', message: '账户名不能为空' })
    return
  }
  if (globalStore.assetArr.find((item) => item.assetName === name.value && item.id !== +route.params.assetId)) {
    Notify({ type: 'warning', message: '账户名不能重复' })
    return
  }
  if (!result.value) {
    Notify({ type: 'warning', message: '账户类型不能为空' })
    return
  }
  const res = await APIS.ADD_ASSET({
    assetName: name.value,
    price: price.value,
    assetType: result.value === '资金账户' ? 1 : 0,
    dateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    assetId: route.params.assetId,
    oldPrice: route.params.price
  })
  if (res.code === 200) {
    await globalStore.setAsset()
    await globalStore.setAccountArr()
    router.push({ name: 'asset' })
  }
}
</script>

<style scoped lang="less">
.addAsset {
  margin-top: 10px;
}
</style>
