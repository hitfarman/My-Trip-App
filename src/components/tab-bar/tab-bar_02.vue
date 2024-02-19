<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabbarData" :key="index">
        <div 
          class="tab-bar-item" 
          :class="{active: index === currentIndex }"
          @click="itemClick(index, item)"
        >
          <img :src="imageUrl(index, item)" alt="">
          <span class="text">{{ item.text }}</span>
        </div>
    </template>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';

  // tabbar数据不会变化,没必要变成响应式
  import tabbarData from '@/assets/data/tabbar'
  import { getAssetUrl } from "@/utils/load_asset"

  const currentIndex = ref(0)

  const imageUrl = computed(() => {
    return function(index, item) {
      const imageUlr = index === currentIndex.value ? item.imageActive : item.image
      return getAssetUrl(imageUlr)
    }
  } )

  const router = useRouter()
  function itemClick(index, item) {
    currentIndex.value = index
    router.push(item.path)
  }

</script>

<style lang="less" scoped>
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    border-top: 1px solid #f3f3f3;

    .tab-bar-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &.active {
        color: var(--primary-color);
      }

      img {
        width: 36px;
      }
      .text {
        font-size: 12px;
        margin-top: 2px;
      }


    }
  }
</style>