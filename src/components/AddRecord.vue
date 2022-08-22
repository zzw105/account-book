<template>
  <van-action-sheet :show="activeSheetIsShow" title="添加新记录" :closeable="false" :lazy-render="false" @close="onClose">
    <van-tabs v-model:active="tabsActive">
      <van-tab title="支出">
        <div class="line topLine"></div>
        <div class="levelIconBox">
          <div v-for="iconListItem in iconInfoList" :key="iconListItem.name" class="icon" @click="setLeaveOne(iconListItem.name)">
            <iconpark-icon :name="iconListItem.icon" :size="25" :class="{ choose: leaveOne === iconListItem.name }"></iconpark-icon>
            <div class="name">{{ iconListItem.name }}</div>
          </div>
        </div>
        <div v-if="leaveOne !== ''" class="levelIconBox levelTwoIconBox">
          <div v-for="iconListItem in iconInfoList.find((item) => item.name === leaveOne)!.children" :key="iconListItem.name" class="icon" @click="setLeaveTwo(iconListItem.name)">
            <iconpark-icon :name="iconListItem.icon" :size="22" :class="{ choose: leaveTwo === iconListItem.name }"></iconpark-icon>
            <div class="name">{{ iconListItem.name }}</div>
          </div>
        </div>
        <div class="line"></div>
      </van-tab>
      <van-tab title="收入">内容 2</van-tab>
      <van-tab title="转账">内容 3</van-tab>
      <van-tab title="债务">内容 4</van-tab>
      <div class="priceBox">
        <div class="price">
          <div class="priceSymbol">-</div>
          <van-field v-model="price" type="number" placeholder="请输入金额" @click="clickPrice" />
        </div>
        <div class="date" @click="() => (calendarIsShow = true)">{{ dateTime.format('YYYY-MM-DD HH:mm') }}</div>
      </div>
      <div class="line"></div>
      <div class="remark">
        <van-field v-model="remarkText" label-width="32" :colon="true" label="备注" placeholder="请输入备注" />
      </div>
      <div v-if="id !== -1" class="line"></div>
      <div v-if="id !== -1" class="util">
        <div class="calendar"></div>
        <van-button type="danger" class="delBtn" @click="del">删除记录</van-button>
      </div>
      <div class="line"></div>
      <div class="btn">
        <van-button type="default" @click="onClose">取消</van-button>
        <van-button type="primary" @click="addAccount">{{ props.recordData ? '修改' : '新增' }}</van-button>
      </div>
      <van-calendar v-model:show="calendarIsShow" :min-date="new Date(2020, 0, 1)" :max-date="new Date()" :lazy-render="true" confirm-text="确认日期" @confirm="confirmationDate" />
      <van-popup v-model:show="currentTimeIsShow" position="bottom">
        <van-datetime-picker v-model="hoursMinute" confirm-button-text=" " cancel-button-text=" " type="time" title="选择时间" />
        <van-button round color="#ee0a24" class="timeBtn" type="primary" block :swipe-duration="100" @click="confirmationTime">确认时间</van-button>
      </van-popup>
    </van-tabs>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { iconInfoList } from '@/utils'
import APIS from '@/api'
import { Notify } from 'vant'
import dayjs, { Dayjs } from 'dayjs'
import { accountProps } from '@/@types/api'
import { useGlobalStore } from '@/store/global'

interface Props {
  activeSheetIsShow: boolean
  recordData?: accountProps | null
}

const emit = defineEmits(['update:activeSheetIsShow'])
const props = withDefaults(defineProps<Props>(), {
  activeSheetIsShow: false,
  recordData: null
})

const globalStore = useGlobalStore()
const tabsActive = ref(0) // 选择的栏位
const leaveOne = ref('其他') // 一级分类
const leaveTwo = ref('其他') // 二级分类
const price = ref('0') // 金额
const calendarIsShow = ref(false) // 是否展示日历选择
const currentTimeIsShow = ref(false) // 是否展示时间选择
const dateTime = ref<Dayjs>(dayjs()) // dayjs数值
const hoursMinute = ref(dayjs().format('HH:mm')) // 小时分钟选择器数值
const remarkText = ref('') // 注释文字
const id = ref(-1)

// const formatDate = (date: Date) => `${date.getMonth() + 1}月${date.getDate()}日`
const confirmationDate = (value: Date) => {
  // calendarDate.value = formatDate(value)
  dateTime.value = dayjs(value)
  currentTimeIsShow.value = true
}

const confirmationTime = () => {
  const [H, M] = hoursMinute.value.split(':')
  dateTime.value = dateTime.value.hour(+H)
  dateTime.value = dateTime.value.minute(+M)
  calendarIsShow.value = false
  currentTimeIsShow.value = false
}

const clickPrice = () => {
  if (price.value === '0') {
    price.value = ''
  }
}

// 关闭弹出框
const onClose = () => {
  emit('update:activeSheetIsShow', false)
}

const del = async () => {
  const res = await APIS.DEL_ACCOUNT({ id: id.value })
  if (res.code === 200) {
    emit('update:activeSheetIsShow', false)
    globalStore.setAccountArr()
  }
}

// 新增信息
const addAccount = async () => {
  if (+price.value === 0) {
    Notify({ type: 'warning', message: '金额不能为0' })
    return
  }
  const data = {
    leaveOne: leaveOne.value,
    leaveTwo: leaveTwo.value,
    price: -price.value,
    remarkText: remarkText.value,
    dateTime: dateTime.value.format('YYYY-MM-DD HH:mm:ss'),
    id: id.value
  }
  const res = await APIS.ADD_ACCOUNT(data)
  if (res.code === 200) {
    Notify({ type: 'success', message: '添加成功' })
    onClose()
    globalStore.setAccountArr()
  }
}

// 设置一级分类
const setLeaveOne = (name: string) => {
  leaveOne.value = name
  leaveTwo.value = iconInfoList.find((item) => item.name === name)!.children[0].name
}

// 设置二级分类
const setLeaveTwo = (name: string) => {
  leaveTwo.value = name
}

watch(
  () => props.recordData,
  (newData) => {
    if (newData) {
      leaveOne.value = newData.leaveOne
      leaveTwo.value = newData.leaveTwo
      price.value = -newData.price + ''
      remarkText.value = newData.remarkText
      dateTime.value = dayjs(newData.dateTime)
      id.value = newData.id
    } else {
      leaveOne.value = '其他'
      leaveTwo.value = '其他'
      price.value = '0'
      remarkText.value = ''
      dateTime.value = dayjs()
      id.value = -1
    }
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="less">
:deep(.van-tabs__content) {
  padding: 0 3px 3px 3px;
}
.levelIconBox {
  display: flex;
  flex-wrap: wrap;

  .icon {
    display: flex;
    width: 20%;
    margin: 5px 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    iconpark-icon {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: rgb(238, 238, 238);
    }
    .choose {
      background-color: rgb(222, 221, 255);
    }
  }
  .name {
    font-size: 14px;
  }
}
.levelTwoIconBox {
  margin: 3px;
  padding: 5px;
  border-radius: 15px;
  background-color: rgb(247, 247, 247);
  .icon {
    width: 16.6666666666666%;
  }
  .name {
    font-size: 13px;
  }
}
.line {
  width: 100%;
  height: 1px;
  margin: 7px 0;
  background-color: #ccc;
}
.topLine {
  margin-top: 0;
}
.priceBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  .price {
    display: flex;
    align-items: center;
    flex: 1;
    .van-cell {
      padding: 0;
    }
  }
  .priceSymbol,
  :deep(input) {
    color: red;
    font-size: 25px;
  }
}
.remark {
  .van-cell {
    padding: 3px 15px;
  }
}
.btn {
  display: flex;
  justify-content: space-around;
  .van-button {
    width: 40%;
  }
}
.timeBtn {
  width: 90%;
  height: 40px;
  margin: 8px auto;
}
.util {
  display: flex;
  padding: 0 5px;
  .calendar {
    flex: 1;
  }
}
</style>
