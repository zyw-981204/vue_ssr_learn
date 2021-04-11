import { createApp } from './app'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    router.push(context.url)
    // 异步组件
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // 没有匹配到
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // 数据预拉取，等到vuex中的数据都加载好了进入下一步
      Promise.all(matchedComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData({
            route: router.currentRoute, store
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state

        resolve(app)
      }).catch(reject)
    }, reject)
  })
}