import { createApp } from './app'

// 客户端特定引导逻辑……
const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 异步组件，需要等待加载完成才可以挂载

router.onReady(() => {
  app.$mount('#app', true)
})