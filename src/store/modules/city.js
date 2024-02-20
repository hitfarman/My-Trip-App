import { getCityAll } from "@/service";
import { defineStore } from "pinia";

/** 这里返回的是一个函数 */
const useCityStore = defineStore("city", {
  state: () => ({
    allCities: {},
    currentCity: { cityName: "广州" }
  }),
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll()
      this.allCities = res.data
    }
  }
})

export default useCityStore