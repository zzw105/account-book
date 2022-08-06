<template>
  <van-nav-bar :fixed="true" :placeholder="true">
    <template #left>
      <div class="leftIcon">
        <iconpark-icon name="bookmark-three-66p67o22" size="23px"></iconpark-icon>
        <span>账本</span>
      </div>
    </template>
  </van-nav-bar>
  <div>Home</div>
  <van-button type="primary" @click="() => (activeSheetIsShow = true)">添加</van-button>
  <AddRecord v-model:active-sheet-is-show="activeSheetIsShow"></AddRecord>
  <BottomTabbar :now-active="0" :placeholder="true" />
</template>

<script setup lang="ts">
// import APIS from '@/api'
import { onMounted, ref } from 'vue'
import AddRecord from '../components/AddRecord.vue'

const activeSheetIsShow = ref(false)

onMounted(async () => {})
</script>

<style lang="less" scoped>
.leftIcon {
  display: flex;
  span {
    margin-left: 5px;
    font-weight: 700;
  }
}
</style>
