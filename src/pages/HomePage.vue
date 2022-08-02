<template>
  <van-nav-bar title="标题" />
  <div>Home</div>
  <van-button type="primary" @click="toLogin">登陆</van-button>
</template>

<script setup lang="ts">
// import APIS from '@/api'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const toLogin = () => {
  router.push({ name: 'login' })
}
onMounted(async () => {})
</script>

<style lang="less" scoped></style>
