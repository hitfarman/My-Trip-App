import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from 'underscore'

// export default function useScroll(reachBottomCB) {
//   const scrollListenerHandler = () => {
//     const clientHeight = Math.round(document.documentElement.clientHeight)
//     const scrollTop = Math.round(document.documentElement.scrollTop)
//     const scrollHeight = Math.round(document.documentElement.scrollHeight)
//     console.log(clientHeight, scrollTop, scrollHeight)
//     if (clientHeight + scrollTop + 1 >= scrollHeight) {
//       console.log("滚动到底部了")
//       if (reachBottomCB) reachBottomCB()
//     }
//  }

//   onMounted(() => {
//     window.addEventListener("scroll",scrollListenerHandler )
//   })
//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler)
//   })
// }

export default function useScroll() {
  const isReachBottom = ref(false)

  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 节流
  const scrollListenerHandler = throttle(() => {
    clientHeight.value = Math.round(document.documentElement.clientHeight)
    scrollTop.value = Math.round(document.documentElement.scrollTop)
    scrollHeight.value = Math.round(document.documentElement.scrollHeight)
    // console.log(clientHeight.value, scrollTop.value, scrollHeight.value)
    if (clientHeight.value + scrollTop.value + 1 >= scrollHeight.value) {
      console.log("滚动到底部了")
      isReachBottom.value = true
    }
 }, 100)

  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler )
  })
  
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}