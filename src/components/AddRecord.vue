<template>
  <van-action-sheet :show="activeSheetIsShow" title="添加新记录" @close="onClose">
    <van-tabs v-model:active="tabsActive">
      <van-tab title="支出">
        <div class="levelOneIconBox">
          <div v-for="iconListItem in iconInfoList" :key="iconListItem.name" class="icon">
            <iconpark-icon :name="iconListItem.icon" :size="25"></iconpark-icon>
            <div>{{ iconListItem.name }}</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="收入">内容 2</van-tab>
      <van-tab title="转账">内容 3</van-tab>
      <van-tab title="债务">内容 4</van-tab>
    </van-tabs>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { iconInfoList } from '@/utils'

interface Props {
  activeSheetIsShow: boolean
}

const emit = defineEmits(['update:activeSheetIsShow'])
withDefaults(defineProps<Props>(), {
  activeSheetIsShow: false
})

const tabsActive = ref(0)

const onClose = () => {
  emit('update:activeSheetIsShow', false)
}
</script>

<style scoped lang="less">
:deep(.van-tabs__content) {
  padding: 10px;
}
.levelOneIconBox {
  display: flex;
  .icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    iconpark-icon {
      background-color: rgb(238, 238, 238);
    }
  }
}
</style>
