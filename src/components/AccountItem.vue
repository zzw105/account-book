<template>
  <div class="accountBox">
    <div class="icon"><iconpark-icon size="24px" :name="findIcon()"></iconpark-icon></div>
    <div class="text">
      <div class="title">
        {{ account.leaveOne }} <template v-if="account.type === 0"> -{{ account.leaveTwo }} </template>
      </div>
      <div class="remarkText">{{ account.remarkText }}</div>
    </div>
    <div class="priceTime">
      <div v-if="account.price >= 0" class="price priceGreen">+{{ account.price }}</div>
      <div v-else class="price">{{ account.price }}</div>
      <div class="time">{{ day.format('YYYY-MM-DD HH:mm') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { accountProps } from '@/@types/api'
import { expenditureIconInfoList, incomeIconInfoList } from '@/utils'
import dayjs from 'dayjs'
import { ref } from 'vue'

const props = defineProps<{
  account: accountProps
}>()

const day = ref(dayjs(props.account.dateTime))

const findIcon = () => {
  let iconName = ''
  const { leaveTwo, leaveOne, price } = props.account
  if (price < 0) {
    expenditureIconInfoList.forEach((item) => {
      item.children.forEach((info) => {
        if (info.name === leaveTwo) iconName = info.icon
      })
    })
  } else {
    incomeIconInfoList.forEach((info) => {
      if (info.name === leaveOne) iconName = info.icon
    })
  }

  return iconName
}
</script>

<style scoped lang="less">
.accountBox {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #fff;
  margin: 8px 0;
  border-radius: 10px;
  .icon {
    margin: 0 10px;
  }
  .text {
    flex: 1;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-evenly;
    .title {
      font-size: 17px;
    }
    .remarkText {
      font-size: 15px;
    }
  }
  .priceTime {
    margin-right: 10px;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-evenly;
    .price {
      text-align: right;
      color: red;
      font-size: 18px;
    }
    .priceGreen {
      color: green;
    }
    .time {
      font-size: 14px;
      color: rgb(121, 121, 121);
    }
  }
}
</style>
