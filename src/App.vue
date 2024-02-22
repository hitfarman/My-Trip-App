<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>

    <!-- <keep-alive include="home">
      <router-view/>
    </keep-alive> -->
    
    <tab-bar v-show="!route.meta.hideTabbar"/>
    <loading/>
    <!-- <tab-bar/> -->
  </div>
</template>

<script setup>

import { useRoute } from 'vue-router';
import TabBar from './components/tab-bar/tab-bar.vue'
import Loading from '@/components/loading/loading.vue'

const route = useRoute()


</script>

<style scoped>

</style>
