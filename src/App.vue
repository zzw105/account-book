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
  await globalStore.setAsset()
})
</script>

<style lang="less">
body,
html {
  height: 100%;
}
body {
  background-color: rgb(247, 248, 250);
  font-family: Noto Sans SC !important;
}
:root {
  --van-action-sheet-max-height: 90% !important;
}
@media (min-width: 768px) {
  html {
    overflow-y: scroll;
  }
  #app {
    display: flex;
    justify-content: center;
    min-height: 100%;
    & > div {
      width: 400px;
      position: relative;
      min-height: 100%;
    }
  }
  .van-nav-bar {
    width: 400px;
    left: auto;
  }
  .van-tabbar--fixed {
    width: 400px;
    left: auto;
  }
  .van-action-sheet {
    width: 400px;
    position: sticky;
    left: 0;
  }
}
</style>

<style scoped></style>
