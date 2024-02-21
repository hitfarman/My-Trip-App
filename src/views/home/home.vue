<template>
  <div class="home">
    <home-nav-bar/>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box/>
    <home-categories/>
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar/>
    </div>
    <home-content/>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";

import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue'
import SearchBar from '@/components/search-bar/search-bar.vue'

import useHomeStore from '@/store/modules/home';
import useScroll from "@/hooks/useScroll";

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

// 监听window窗口的滚动
// 1.离开页面时,需要移除监听
// 2.如果别的页面也在类似的监听,会编写重复的代码
// useScroll(() => {
//   homeStore.fetchHouseListData()
// })
const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 搜索框显示的控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop >= 100
// })
/* 计算属性的函数里面,如果依赖了某个响应式的数据,当这个响应式数据一旦发生变化,它会根据这个变化重新计算新的值,而且,计算属性值是有缓存的
   定义的可响应式数据依赖另外一个可响应式数据,那么可使用计算属性(computed函数)
*/
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 365
})


</script>

<style lang="less" scoped>
  .home {
    padding-bottom: 60px;
  }

  .banner {
    img {
      width: 100%;
    }
  }

  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }

</style>