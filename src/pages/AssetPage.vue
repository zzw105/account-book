<template>
  <van-nav-bar title="资产" :fixed="true" :placeholder="true" />
  <van-cell-group inset class="allAsset">
    <div class="netAssets">
      <div class="title">净资产（元）</div>
      <div class="price">{{ getAllAccountPrice() }}</div>
    </div>
    <div class="assetDetails">
      <div class="assetBox">
        <div class="title">总资产：</div>
        <div class="price">{{ getAccountPrice(1) }}</div>
      </div>
      <div class="assetBox">
        <div class="title">负资产：</div>
        <div class="price">{{ getAccountPrice(0) }}</div>
      </div>
    </div>
  </van-cell-group>
  <van-cell-group inset class="capitalAccount">
    <div class="title">资金账户</div>
    <template v-for="asset in globalStore.assetArr.filter((item) => item.assetType === 1)" :key="asset.id">
      <AssetItem :asset="asset" :account-arr="globalStore.accountArrInAsset(asset.id)"></AssetItem>
    </template>
  </van-cell-group>
  <van-cell-group inset class="capitalAccount">
    <div class="title">信贷账户</div>
    <template v-for="asset in globalStore.assetArr.filter((item) => item.assetType === 0)" :key="asset.id">
      <AssetItem :asset="asset" :account-arr="globalStore.accountArrInAsset(asset.id)"></AssetItem>
    </template>
  </van-cell-group>
  <div class="addBtn" @click="toAddAssetPage"><iconpark-icon name="plus"></iconpark-icon></div>
  <BottomTabbar :now-active="2" :placeholder="true" />
</template>
<script setup lang="ts">
import AssetItem from '@/components/AssetItem.vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/store/global'

const globalStore = useGlobalStore() // 仓库
const router = useRouter()

// 获取全部账单价钱
const getAllAccountPrice = () => {
  return globalStore.accountArr.reduce((prev, item) => {
    return prev + item.price
  }, 0)
}

// 获取特定账户种类账单价钱
const getAccountPrice = (type: number) => {
  const assetArr = globalStore.assetArr.filter((item) => item.assetType === type)
  return globalStore.accountArr.reduce((prev, item) => {
    if (assetArr.find((asset) => asset.id === item.assetId)) {
      return prev + item.price
    }
    return prev
  }, 0)
}

const toAddAssetPage = () => {
  router.push({ name: 'addAsset' })
}
</script>

<style lang="less" scoped>
.allAsset {
  margin-top: 10px;
  display: flex;
  padding: 10px 20px;
  background-color: #2f88ff;
  color: #fff;

  .netAssets {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .title {
      font-size: 13px;
    }
    .price {
      font-size: 23px;
      font-weight: 700;
    }
  }
  .assetDetails {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .assetBox {
      display: flex;
      font-size: 13px;
    }
  }
}
.capitalAccount {
  margin-top: 10px;
  padding: 15px;
  padding-bottom: 0;
  .title {
    font-weight: 700;
    margin-bottom: 10px;
  }
}
.addBtn {
  background-color: #2f88ff;
  color: #fff;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 35px;
  position: absolute;
  right: 20px;
  bottom: 70px;
}
</style>
