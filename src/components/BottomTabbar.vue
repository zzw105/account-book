<template>
  <div>
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item icon="home-o">
        <span>账本</span>
        <template #icon><iconpark-icon name="home"></iconpark-icon> </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search">
        <span>日历</span>
        <template #icon><iconpark-icon name="calendar"></iconpark-icon> </template>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o">
        <span>资产</span>
        <template #icon> <iconpark-icon name="wallet"></iconpark-icon> </template>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o">
        <span>图表</span>
        <template #icon> <iconpark-icon name="chart-pie-one"></iconpark-icon> </template>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o">
        <span>用户</span>
        <template #icon> <iconpark-icon name="people"></iconpark-icon> </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

interface Props {
  nowActive: number
}

const props = withDefaults(defineProps<Props>(), {
  nowActive: 0
})

const router = useRouter()

const onChange = (e: any) => {
  switch (e) {
    case 0:
      router.push({ name: 'home' })
      break
    case 1:
      router.push({ name: 'asset' })
      break
    case 2:
      router.push({ name: 'calendar' })
      break
    case 3:
      router.push({ name: 'cart' })
      break
    case 4:
      router.push({ name: 'user' })
      break
    default:
      break
  }
}

const active = ref(props.nowActive)

// watch(
//   () => props.nowActive,
//   (newValue) => {
//     console.log(newValue)

//     active.value = newValue
//   },
//   { immediate: true }
// )
</script>

<style lang="less" scoped>
.van-tabbar {
  height: 55px;
  :deep(.van-tabbar-item__icon) {
    margin-bottom: 2px;
  }
}
</style>
