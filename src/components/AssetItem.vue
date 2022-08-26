<template>
  <div class="assetItem" @click="setAsset">
    <div class="title">
      <iconpark-icon name="wallet"></iconpark-icon>
      {{ asset.assetName }}
    </div>
    <div :class="['price', getAssetPrice() >= 0 ? 'green' : 'red']">{{ getAssetPrice() }}</div>
  </div>
</template>

<script setup lang="ts">
import { assetProps, accountProps } from '@/@types/api'
import { useRouter } from 'vue-router'
// import { useGlobalStore } from '@/store/global'

// const globalStore = useGlobalStore()
const router = useRouter()
const props = defineProps<{
  asset: assetProps
  accountArr: accountProps[]
}>()

const getAssetPrice = () => {
  return props.accountArr.reduce((prev, item) => {
    return prev + item.price
  }, 0)
}

const setAsset = () => {
  router.push({
    name: 'assetDetail',
    params: { assetId: props.asset.id }
  })
}
</script>

<style scoped lang="less">
.assetItem {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  .red {
    color: red;
  }
  .green {
    color: green;
  }
}
</style>
