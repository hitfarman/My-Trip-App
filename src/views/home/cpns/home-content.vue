<template>
  <div class="content">
    <div class="content">
      <h2 class="title">热门精选</h2>
      <div class="list">
        <template v-for="item in houseList" :key="item.data.houseId">
          <home-item-v9 
            v-if="item.discoveryContentType === 9" 
            :item-data="item.data"
            @click="itemClick(item.data)"
          />
          <home-item-v3 
            v-else-if="item.discoveryContentType === 3" 
            :item-data="item.data"
            @click="itemClick(item.data)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import useHomeStore from '@/store/modules/home';
import HomeItemV3 from '@/components/house-item/house-item-v3.vue'
import HomeItemV9 from '@/components/house-item/house-item-v9.vue'

const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)
const router = useRouter()
const itemClick = (item) => {
  router.push("/detail/" + item.houseId)
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px 8px;
  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>