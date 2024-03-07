<template>
  <div class="detail top_page" ref="detailRef">
    <tab-control
      v-show="showTabControl"
      class="tabs"
      :titles="names"
      @tab-item-click="tabClick"
      ref="tabControlRef"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-info
        name="描述"
        :ref="getSectionRef"
        :top-infos="mainPart.topModule"
      />
      <detail-facility
        name="设施"
        :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <detail-landlord
        name="房东"
        :ref="getSectionRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <detail-comment
        name="评论"
        :ref="getSectionRef"
        :comment="mainPart.dynamicModule.commentModule"
      />
      <detail-notice
        name="须知"
        :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <detail-map
        name="地图"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule"
      />
      <detail-intro :price-intro="mainPart.introductionModule" />
      <detail-action :current-house="currentHouse" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">途家旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import TabControl from "@/components/tab-control/tab-control.vue";
import DetailSwipe from "./cpns/detail_01-swipe.vue";
import detailInfo from "./cpns/detail_02-info.vue";
import detailFacility from "./cpns/detail_03-facility.vue";
import detailLandlord from "./cpns/detail_04-landlord.vue";
import detailComment from "./cpns/detail_05-comment.vue";
import detailNotice from "./cpns/detail_06-notice.vue";
import detailMap from "./cpns/detail_07-map.vue";
import detailIntro from "./cpns/detail_08-intro.vue";
import detailAction from "./cpns/detail_09-action.vue";

import { getDetailInfos } from "@/service";
import useScroll from "@/hooks/useScroll";

const route = useRoute();
const houseId = route.params.id;

// 发送网络请求获取数据
const detailInfos = ref({});
const mainPart = computed(() => detailInfos.value.mainPart);
const currentHouse = computed(() => detailInfos.value.currentHouse);
getDetailInfos(houseId).then((res) => {
  detailInfos.value = res.data;
});

// 监听返回按钮的点击
const router = useRouter();
const onClickLeft = () => {
  router.back();
};

// tab-control相关的操作
const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const showTabControl = computed(() => {
  return scrollTop.value >= 300;
});

// const landlordRef = ref()
// const sectionEls = []
// const getSectionRef = (value) => {
//   console.log("----------")
//   sectionEls.push(value.$el)
// }
// const tabClick = (index) => {
//   let distance = sectionEls[index].offsetTop
//   if (index !== 0) {
//     distance -= 44
//   }
//   detailRef.value.scrollTo({
//     top: distance,
//     behavior: "smooth"
//   })
// }

const sectionEls = ref({});
const names = computed(() => {
  return Object.keys(sectionEls.value);
});
const getSectionRef = (value) => {
  if (!value) return;
  const name = value.$el.getAttribute("name");
  sectionEls.value[name] = value.$el;
};

// 如果是点击,不需要修改currentIndex
let isClick = false;
let currentDistance = -1;
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index];
  const el = sectionEls.value[key];
  let distance = el.offsetTop;
  if (index !== 0) {
    distance -= 44;
  }

  isClick = true;
  currentDistance = distance;

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth",
  });
};

// 页面滚动, 滚动时匹配对应的tabControl的索引
// 根据当前scrollTop匹配index
const getIndex = (values, scrollTop) => {
  let index = values.length - 1;
  for (let i = 0; i < values.length; i++) {
    if (values[i] > scrollTop + 44) {
      index = i - 1;
      break;
    }
  }
  return index;
};

// 使用watchEffect, 只获取一次6个子组件的offsetTop数组values
let values = [];
const tabControlRef = ref();
watchEffect(() => {
  values = Object.values(sectionEls.value).map((item) => item.offsetTop);
  // console.log(values)
});

watch(scrollTop, (newValue) => {
  // 如果这个组件已经滚动到 点击时记录的currentDistance 位置了,说明点击滚动完成了
  if (newValue === currentDistance) {
    isClick = false;
  }
  // 如果是点击,不设置currentIndex
  if (isClick) return;

  // values = Object.values(sectionEls.value).map(item => item.offsetTop)
  const index = getIndex(values, newValue);
  tabControlRef.value?.setCurrentIndex(index);
});
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
  background-color: #fff;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
