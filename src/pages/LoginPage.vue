<template>
  <div>
    <van-nav-bar title="登陆" :fixed="true" :placeholder="true" />
    <div class="main">
      <van-cell-group inset>
        <van-field v-model="count" left-icon="user-o" placeholder="请输入用户名" />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref('')
</script>

<style lang="less">
body {
  background-color: rgb(247, 248, 250);
}
</style>
<style lang="less" scoped>
.main {
  padding-top: 10px;
  .van-cell {
    :deep(.van-icon) {
      &::before {
        width: 20px;
        display: flex;
        justify-content: center;
      }
    }
  }
  :deep(.van-cell__value) {
    margin-left: 5px;
  }
}
</style>
