<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName}}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom-gray-line" @click="showCanlendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
    <van-calendar 
      v-model:show="showCanlendar" 
      type="range" 
      color="#ff9854"
      :round="false"
      @confirm="onConfirm" 
    />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggest">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div class="item" 
          :style="{color:item.tagText.color, background: item.tagText.background.color}"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

import useCityStore from '@/store/modules/city';
import { formatMonthDay, getDiffDays } from '@/utils/formatDate';
import useHomeStore from '@/store/modules/home';

const router = useRouter()

// const fetchLocationName = async (lat,lng) => {
//     await fetch(
//       'https://www.mapquestapi.com/geocoding/v1/reverse?key=`SUA CHAVE`&location='+lat+'%2C'+lng+'&outFormat=json&thumbMaps=false',
//     )
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.log(
//           'ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson),
//         );
//       });
//   };

  // 位置/城市
  const cityClick = () => {
    router.push('/city')
  }
  const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
      console.log("获取位置成功:", res)
    }, err => {
      console.log("获取位置失败:", err)
    })
  }
  const cityStore = useCityStore()
  const { currentCity } = storeToRefs(cityStore)

  // 日期范围的处理
  const nowDate = new Date()
  const newDate = new Date()
  newDate.setDate(nowDate.getDate() + 1)

  const startDate = ref(formatMonthDay(nowDate))
  const endDate = ref(formatMonthDay(newDate))
  const stayCount = ref(getDiffDays(nowDate, newDate))

  const showCanlendar = ref(false)
  const onConfirm = (values) => {
    startDate.value = formatMonthDay(values[0])
    endDate.value = formatMonthDay(values[1])
    stayCount.value = getDiffDays(values[0], values[1])
    showCanlendar.value = false
  }

  // 热门建议
  const { hotSuggests } = storeToRefs(useHomeStore())

</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    color: #333;
    font-size: 15px;
  }
  .position {
    width: 74px;
    display: flex;
    align-items: center;

    .text {
      color: #666;
      font-size: 12px;
    }

    img {
      width: 18px;
      height: 18px;
      margin-left: 5px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid #f2f2f2;
  }
}

.bottom-gray-line {
  border-bottom: 1px solid var(--line-color);
}

.hot-suggest {
  margin: 10px 0;
  .item {
    padding: 4px 8px;
    margin: 3px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

</style>