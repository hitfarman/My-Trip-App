<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <template #icon>
            <img :src="imageUrl(index, item)" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

// tabbar数据不会变化,没必要变成响应式
import tabbarData from '@/assets/data/tabbar'
import { getAssetUrl } from "@/utils/load_asset"
import { useRouter } from 'vue-router';

const currentIndex = ref(0)

const imageUrl = computed(() => {
  return function(index, item) {
    const imageUlr = index === currentIndex.value ? item.imageActive : item.image
    return getAssetUrl(imageUlr)
  }
} )

// 监听路由的改变时,找到对应的索引,设置currentIndex
const router = useRouter()
router.beforeEach((to, from) => {
  const index = tabbarData.findIndex(item => item.path === to.path)
  if (index === -1) return
  currentIndex.value = index
})

</script>

<style lang="less" scoped>
  .tab-bar {
    img {
      height: 26px;
    }


  }
</style>