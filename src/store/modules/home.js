import { getHomeCategories, getHomeHotSuggests, getHomeHouseList } from "@/service";
import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],
    houseList: [],
    currentPage: 1
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    // async默认返回Promise
    async fetchHouseListData() {
      const res = await getHomeHouseList(this.currentPage++)
      this.houseList.push(...res.data)
    }
  }
})

export default useHomeStore