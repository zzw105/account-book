<template>
  <van-nav-bar title="个人中心" :fixed="true" :placeholder="true" />
  <van-button type="primary" @click="toLogin">登陆</van-button>
  <BottomTabbar :now-active="4" :placeholder="true" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const toLogin = () => {
  router.push({ name: 'login' })
}
</script>

<style lang="less" scoped></style>
