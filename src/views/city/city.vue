<template>
  <div class="city top_page">
    <div class="top">
      <!-- 1.搜索框 -->
      <van-search 
        v-model="searchValue" 
        placeholder="城市/区域/位置" 
        shape="round"
        show-action
        @cancel="cancelClick"
      />
      <!-- 2.tab的切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!-- <city-group :groupData="currentGroup"/> -->
      <template v-for="(value, key, index) in allCities">
        <city-group v-show="key === tabActive" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import useCityStore from '@/store/modules/city';
import cityGroup from './cpns/city-group.vue'

const router = useRouter()

/** 搜索框功能 */
const searchValue = ref("")
const cancelClick = () => {
  router.back()
}

/** tab的切换 */
const tabActive = ref()

/** 从store中获取城市数据 */
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

/** 目的: 获取选中标签后的数据 
 * 1. 获取正确的key: 将tabs中绑定的tabActive正确的绑定 (在van-tab 增加name属性,绑定key)
 * 2. 根据key从allCities中获取数据, 但是, 默认获取的数据不是响应式的, 所以,必须包裹computed
*/
const currentGroup = computed(() => allCities.value[tabActive.value])

</script>

<style lang="less" scoped>
.city {
  // top固定定位方案
  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }
  // .content {
  //   margin-top: 98px;
  // }

  // 局部滚动方案
  .content {
    height: calc(100vh - 98px);
    overflow-y: scroll;
  }

}
</style>