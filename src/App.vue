<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGlobalStore } from './store/global'
const globalStore = useGlobalStore()

onMounted(async () => {
  // 初始化时请求一次数据
  await globalStore.setAccountArr()
})
</script>

<style lang="less">
body {
  background-color: rgb(247, 248, 250);
  font-family: Noto Sans SC !important;
}
:root {
  --van-action-sheet-max-height: 90% !important;
}
</style>

<style scoped></style>
