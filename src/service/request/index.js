import axios from "axios"
import { BASE_URL, TIMEOUT } from "./config"

// 方法一: 封装一个函数
// export default function request() { }

// 方法二: 封装一个类
class HYRequest {
  constructor(baseURL, timeout = TIMEOUT) {
    // axios.defaults.baseURL = xxxx //给默认实例配置baseUrl,一般不这么做

    this.instance = axios.create({
      baseURL,
      timeout
    })
  }
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
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