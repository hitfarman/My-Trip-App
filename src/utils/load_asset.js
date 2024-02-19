export const getAssetUrl = (image) => {
  /* vite直接用的是ESModule的, esmodule找资源的话, 必须通过url去找, 所以, 这里要new URL()
    这里是: 根据参数二相对路径, 去找到参数一的相对路径(相对的是base)
  */
  // 参数一: 相对路径
  // 参数二: import.meta.url: 当前文件路径的url
  return new URL(`../assets/img/${image}`, import.meta.url).href
}