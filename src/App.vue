<template>
  <div class="app">
    <router-view/>
    <tab-bar v-if="!route.meta.hideTabbar"/>
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
