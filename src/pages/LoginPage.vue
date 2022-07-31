<template>
  <div>
    <van-nav-bar title="登陆" :fixed="true" :placeholder="true" />
    <div class="main">
      <van-cell-group inset>
        <van-field v-model="userName" placeholder="请输入用户名">
          <template #left-icon>
            <iconpark-icon name="people"></iconpark-icon>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group inset>
        <van-field v-model="password" placeholder="请输入密码">
          <template #left-icon>
            <iconpark-icon name="lock"></iconpark-icon>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group inset>
        <van-button type="primary" block @click="login">登陆</van-button>
      </van-cell-group>
      <div class="bottom">
        <div>忘记密码</div>
        <div>注册</div>
      </div>
      <div class="checkBox"><van-checkbox v-model="checked" icon-size="15px">已阅读并同意</van-checkbox><a href="JavaScript:;" @click="read">《用户协议》</a></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from 'vant'
import APIS from '@/api'
const userName = ref('')
const password = ref('')
const checked = ref(false)
const read = () => {
  Dialog({
    title: '用户协议',
    message: '壹零伍的项目全得听壹零伍的'
  })
}
const login = async () => {
  console.log(userName.value, password.value, checked.value)
  const a = await APIS.login({ userName: userName.value, password: password.value })
  console.log(a)
}
</script>

<style lang="less" scoped>
.main {
  padding-top: 10px;
  .van-cell-group {
    margin-bottom: 15px;
    &:first-child {
      margin-top: 20px;
    }
    .van-cell {
      :deep(.van-field__left-icon) {
        width: 20px;
        display: flex;
        justify-content: center;
      }
    }
    :deep(.van-cell__value) {
      margin-left: 5px;
    }
    .van-button {
      height: 40px;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    color: rgb(134, 134, 134);
    margin: 0 20px;
    font-size: 14px;
  }
  .checkBox {
    display: flex;
    justify-content: center;
    font-size: 14px;
    margin-top: 25px;
  }
}
</style>
