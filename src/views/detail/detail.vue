<template>
  <div class="detail top_page">
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script setup>
import router from '@/router';
import { useRouter } from 'vue-router';

const route = useRouter()

// 监听返回按钮的点击
const onClickLeft = () => {
  router.back()
}
</script>

<style lang="less" scoped>
  
</style>