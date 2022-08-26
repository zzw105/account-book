<template>
  <van-action-sheet :show="activeSheetIsShow" title="添加新记录" :closeable="false" :lazy-render="false" @close="onClose">
    <van-tabs v-model:active="tabsActive" :before-change="beforeChange">
      <van-tab title="支出">
        <div class="line topLine"></div>
        <div class="levelIconBox">
          <div v-for="iconListItem in expenditureIconInfoList" :key="iconListItem.name" class="icon" @click="setLeaveOne(iconListItem.name, expenditureIconInfoList)">
            <iconpark-icon :name="iconListItem.icon" :size="25" :class="{ choose: leaveOne === iconListItem.name }"></iconpark-icon>
            <div class="name">{{ iconListItem.name }}</div>
          </div>
        </div>
        <div v-if="leaveOne !== '' && tabsActive === 0" class="levelIconBox levelTwoIconBox">
          <div
            v-for="iconListItem in expenditureIconInfoList.find((item) => item.name === leaveOne)!.children"
            :key="iconListItem.name"
            class="icon"
            @click="setLeaveTwo(iconListItem.name)"
          >
            <iconpark-icon :name="iconListItem.icon" :size="22" :class="{ choose: leaveTwo === iconListItem.name }"></iconpark-icon>
            <div class="name">{{ iconListItem.name }}</div>
          </div>
        </div>
        <div class="line"></div>
      </van-tab>
      <van-tab title="收入">
        <div class="levelIconBox">
          <div v-for="iconListItem in incomeIconInfoList" :key="iconListItem.name" class="icon" @click="setLeaveOne(iconListItem.name, incomeIconInfoList)">
            <iconpark-icon :name="iconListItem.icon" :size="25" :class="{ choose: leaveOne === iconListItem.name }"></iconpark-icon>
            <div class="name">{{ iconListItem.name }}</div>
          </div>
        </div>
        <div class="line"></div>
      </van-tab>
      <van-tab v-if="id === -1" title="转账">
        <div class="transfer">
          <van-cell-group inset :border="true">
            <van-field v-model="expensesAsset.assetName" readonly placeholder="请选择转出账户" @click="chooseAsset(1)">
              <template #left-icon>
                <iconpark-icon name="expenses"></iconpark-icon>
              </template>
            </van-field>
          </van-cell-group>
          <van-cell-group inset>
            <van-field v-model="incomeAsset.assetName" readonly placeholder="请选择转入账户" @click="chooseAsset(2)">
              <template #left-icon>
                <iconpark-icon name="income-6c01kjhc"></iconpark-icon>
              </template>
            </van-field>
          </van-cell-group>
        </div>
        <div class="line"></div>
      </van-tab>

      <div class="priceBox">
        <div :class="['price', { priceGreen: tabsActive === 1 }]">
          <div class="priceSymbol">{{ tabsActive === 0 ? '-' : '+' }}</div>
          <van-field v-model="price" type="number" placeholder="请输入金额" @click="clickPrice" />
        </div>
        <div class="date" @click="() => (calendarIsShow = true)">{{ dateTime.format('YYYY-MM-DD HH:mm') }}</div>
      </div>
      <div class="line"></div>
      <div class="remark">
        <van-field v-model="remarkText" label-width="32" :colon="true" label="备注" placeholder="请输入备注" />
      </div>
      <div v-if="tabsActive !== 2" class="line"></div>
      <div v-if="tabsActive !== 2" class="util">
        <div class="calendar">
          <van-field v-model="asset.assetName" readonly name="picker" label="账户" :colon="true" label-width="32" placeholder="点击选择账户" @click="chooseAsset(0)" />
        </div>
        <van-button v-if="id !== -1" type="danger" class="delBtn" @click="del">删除记录</van-button>
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
  <van-popup v-model:show="showAssetPicker" position="bottom">
    <van-picker
      :columns="globalStore.assetArr"
      :columns-field-names="{
        text: 'assetName'
      }"
      @confirm="onConfirmAsset"
      @cancel="showAssetPicker = false"
    />
  </van-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { expenditureIconInfoList, incomeIconInfoList } from '@/utils'
import APIS from '@/api'
import { Notify } from 'vant'
import dayjs, { Dayjs } from 'dayjs'
import { accountProps, assetProps } from '@/@types/api'
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

const globalStore = useGlobalStore() // 仓库
const tabsActive = ref(0) // 选择的栏位
const leaveOne = ref('其他') // 一级分类
const leaveTwo = ref('其他') // 二级分类
const price = ref('0') // 金额
const calendarIsShow = ref(false) // 是否展示日历选择
const currentTimeIsShow = ref(false) // 是否展示时间选择
const dateTime = ref<Dayjs>(dayjs()) // dayjs数值
const hoursMinute = ref(dayjs().format('HH:mm')) // 小时分钟选择器数值
const remarkText = ref('') // 注释文字
const id = ref(-1) // 账单id
const showAssetPicker = ref(false) // 是否展示账本选择器
const asset = ref<assetProps>({ id: -1, userName: '', assetName: '', assetType: -1 }) // 当前账本
const expensesAsset = ref<assetProps>({ id: -1, userName: '', assetName: '', assetType: -1 }) // 转出账本
const incomeAsset = ref<assetProps>({ id: -1, userName: '', assetName: '', assetType: -1 }) // 转入账本
const currentAsset = ref(-1)

// 完成日期选择
const confirmationDate = (value: Date) => {
  dateTime.value = dayjs(value)
  currentTimeIsShow.value = true
}

// 完成时间选择
const confirmationTime = () => {
  const [H, M] = hoursMinute.value.split(':')
  dateTime.value = dateTime.value.hour(+H)
  dateTime.value = dateTime.value.minute(+M)
  calendarIsShow.value = false
  currentTimeIsShow.value = false
}

// 点击金额输入，优化体验
const clickPrice = () => {
  if (price.value === '0') {
    price.value = ''
  }
}

// 关闭整体弹出框
const onClose = () => {
  emit('update:activeSheetIsShow', false)
}

// 删除当前账单
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
    id: id.value,
    assetId: asset.value.id,
    type: tabsActive.value
  }
  if (tabsActive.value === 2) {
    data.leaveOne = '其他'
    data.leaveTwo = '其他'
    data.assetId = expensesAsset.value.id
    if (data.remarkText === '') data.remarkText = `${expensesAsset.value.assetName} 到 ${incomeAsset.value.assetName} 转账记录`
    await APIS.ADD_ACCOUNT(data)
    data.leaveTwo = ''
    data.price = Math.abs(data.price)
    data.assetId = incomeAsset.value.id
    const res = await APIS.ADD_ACCOUNT(data)
    if (res.code === 200) {
      Notify({ type: 'success', message: '添加成功' })
      onClose()
      globalStore.setAccountArr()
    }
  } else {
    if (tabsActive.value === 1) {
      data.price = -data.price
      data.leaveTwo = ''
    }
    const res = await APIS.ADD_ACCOUNT(data)
    if (res.code === 200) {
      Notify({ type: 'success', message: '添加成功' })
      onClose()
      globalStore.setAccountArr()
    }
  }
}

// 设置一级分类
const setLeaveOne = (name: string, infoList: any[]) => {
  leaveOne.value = name

  if (infoList[0].children.length > 0) {
    leaveTwo.value = infoList.find((item: { name: string }) => item.name === name)!.children[0].name
  }
}

// 设置二级分类
const setLeaveTwo = (name: string) => {
  leaveTwo.value = name
}

// 完成账本选择器
const onConfirmAsset = (value: assetProps) => {
  switch (currentAsset.value) {
    case 0:
      asset.value = value
      break
    case 1:
      expensesAsset.value = value
      break
    case 2:
      incomeAsset.value = value
      break
    default:
      break
  }
  showAssetPicker.value = false
}

// 不同tabs切换前置函数
const beforeChange = (name: number) => {
  switch (name) {
    case 0:
      leaveOne.value = '其他'
      leaveTwo.value = '其他'
      break
    case 1:
      leaveOne.value = '其他'
      break
    default:
      break
  }
  return true
}

// 打开账本选择器
const chooseAsset = (type: number) => {
  showAssetPicker.value = true
  currentAsset.value = type
}

// 监听传入的账本数据
watch(
  () => props.recordData,
  (newData) => {
    if (newData) {
      if (newData.type === 1) tabsActive.value = 1
      else tabsActive.value = 0
      leaveOne.value = newData.leaveOne
      leaveTwo.value = newData.leaveTwo
      price.value = Math.abs(newData.price) + ''
      remarkText.value = newData.remarkText
      dateTime.value = dayjs(newData.dateTime)
      id.value = newData.id
      asset.value = globalStore.getAssetById(newData.assetId)
    } else {
      leaveOne.value = '其他'
      leaveTwo.value = '其他'
      price.value = '0'
      remarkText.value = ''
      dateTime.value = dayjs()
      id.value = -1
      asset.value = { id: -1, userName: '', assetName: '', assetType: -1 }
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
    .priceSymbol {
      width: 17px;
      text-align: center;
    }
    .van-cell {
      padding: 0;
    }
    .priceSymbol,
    :deep(input) {
      color: red;
      font-size: 25px;
    }
  }

  .priceGreen {
    .priceSymbol,
    :deep(input) {
      color: green;
      font-size: 25px;
    }
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
  // padding: 0 5px;
  .calendar {
    flex: 1;
    .van-cell {
      padding: 3px 15px;
    }
  }
  .van-button {
    height: 30px;
  }
}

.transfer {
  padding-top: 10px;
  .van-cell-group {
    margin-bottom: 15px;
    border: 1px solid #ccc;
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
}
</style>
