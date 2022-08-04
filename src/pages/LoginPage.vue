<template>
  <div>
    <van-nav-bar :title="isLogin ? '登陆' : '注册'" :fixed="true" :placeholder="true" />
    <div class="main">
      <van-cell-group inset>
        <van-field v-model="userName" placeholder="请输入用户名">
          <template #left-icon>
            <iconpark-icon name="people"></iconpark-icon>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group inset>
        <van-field v-model="password" type="password" placeholder="请输入密码">
          <template #left-icon>
            <iconpark-icon name="lock"></iconpark-icon>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group inset>
        <van-button type="primary" block @click="login">{{ isLogin ? '登陆' : '注册' }}</van-button>
      </van-cell-group>
      <div class="bottom">
        <div @click="changeLogin">{{ !isLogin ? '前往登陆' : '前往注册' }}</div>
        <div v-show="isLogin">忘记密码</div>
      </div>
      <div class="checkBox"><van-checkbox v-model="checked" icon-size="15px">已阅读并同意</van-checkbox><a href="JavaScript:;" @click="read">《用户协议》</a></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, Notify } from 'vant'
import APIS from '@/api'
import { checkStr } from '@/utils/index'
import router from '@/router/index.js'

const userName = ref('')
const password = ref('')
const checked = ref(false)
const isLogin = ref(true)

// 查看用户协议
const read = () => {
  Dialog.alert({
    title: '用户协议',
    message: '壹零伍的项目全得听壹零伍的'
  })
}

// 切换登陆注册状态
const changeLogin = () => {
  isLogin.value = !isLogin.value
}

// 登陆注册
const login = async () => {
  // 处理空格
  userName.value = userName.value.trim()
  password.value = password.value.trim()
  const data = { userName: userName.value, password: password.value }

  if (isLogin.value) {
    // 登陆规则处理
    if (userName.value === '' || password.value === '') {
      Notify({ type: 'warning', message: '用户名和密码不能为空' })
      return
    }

    const res = await APIS.LOGIN(data)
    if (res.code === 200) {
      Notify({ type: 'success', message: '登陆成功' })
      localStorage.setItem('token', res.token)
      router.push({ name: 'home' })
    }
  } else {
    // 注册规则处理
    if (!checkStr(userName.value, 'userName')) {
      Notify({ type: 'warning', message: '用户名长度在2~18之间，只能包含字母、数字' })
      return
    }
    if (!checkStr(password.value, 'pwd')) {
      Notify({ type: 'warning', message: '密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线' })
      return
    }
    if (checked.value === false) {
      Notify({ type: 'warning', message: '请阅读并同意《用户协议》' })
      return
    }
    const res = await APIS.REGISTER(data)
    if (res.code === 200) {
      Notify({ type: 'success', message: '注册成功' })
      isLogin.value = true
      userName.value = ''
      password.value = ''
    }
  }
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
      :deep(.van-field__left-icon),
      :deep(.van-field__right-icon) {
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
