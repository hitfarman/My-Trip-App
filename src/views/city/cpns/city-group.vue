<template>
  <div class="city-group">
    <van-index-bar highlight-color="#ff9854" :index-list="indexList" :sticky="true">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="city in groupData.hotCities" :key="city.cityId">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>
      <template v-for="(group, index, kex) in groupData.cities" :key="kex">
        <van-index-anchor :index="group.group" />
        <template v-for="(city, indey, key) in group.cities" :key="key">
          <van-cell :title="city.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>

    <!-- <template v-for="(group, index, key) in groupData.cities" :key="key">
      <h2 class="title">标题: {{ group.group }}</h2>
      <template v-for="(city, indey, kex) in group.cities" :key="kex">
        <div class="city">{{ city.cityName }}</div>
      </template>
    </template> -->
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import useCityStore from '@/store/modules/city';

  /** 定义props */
  const { groupData } = defineProps({
    groupData: {
      type: Object,
      default: () => ({})
    }
  })

  /** 动态获取索引 */
  const indexList = computed(() => {
    const list = groupData.cities.map(item => item.group)
    list.unshift("#")
    return list
  })

  /** 监听城市的点击 */
  const router = useRouter()
  const cityStore = useCityStore()
  const cityClick = (city) => {
    // 选中当前城市
    cityStore.currentCity = city

    // 返回上一级
    router.back()
  }

</script>

<style lang="less" scoped>
  .city-group {
    --van-index-bar-index-font-size: 12px;
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 10px;
      padding-right: 25px;

      .city {
        width: 70px;
        height: 28px;
        border-radius: 14px;
        margin: 6px 0;
        font-size: 12px;
        color: #000;
        text-align: center;
        line-height: 28px;
        background-color: #fff4ec;
      }
    }
  }
</style>