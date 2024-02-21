import axios from "axios"
import { BASE_URL, TIMEOUT } from "./config"
import useMainStore from "@/store/modules/main"

const mainStore = useMainStore()
class HYRequest {
  constructor(baseURL, timeout = TIMEOUT) {

    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use((config) => {
      mainStore.isLoading = true
      return config
    }, (err) => {
      return err
    })

    this.instance.interceptors.response.use((res) => {
      mainStore.isLoading = false
      return res.data
    }, (err) => {
      mainStore.isLoading = false
      return err
    })
  }
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({...config, method: "get"})
  }

  post(config) {
    return this.request({...config, method: "post"})
  }
}

export default new HYRequest(BASE_URL, TIMEOUT)