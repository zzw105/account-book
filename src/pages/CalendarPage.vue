<template>
  <van-nav-bar title="日历" :fixed="true" :placeholder="true" />
  <BottomTabbar :now-active="1" :placeholder="true" />
</template>

<script setup lang="ts">
import BottomTabbar from '@/components/BottomTabbar.vue'
</script>

<style lang="less" scoped></style>
