const Koa = require("koa")
const fs = require("fs");
const path = require("path");

// 整合koa框架
const server = new Koa();
const Router = require('@koa/router');
const router = new Router()

server.use(router.routes()).use(router.allowedMethods())

const Vue = require("vue");
// 获取所有路径，返回对应的url
router.all("(.*)", async (ctx, next) => {
  ctx.body = await next()
}, async (ctx, next) => {
  // 创建vue实例
  const app = new Vue({
    data() {
      return {
        url: ctx.url
      }
    },
    template: "<div>你即将要访问的url为 {{ url }}</div>"
  })

  const template = fs.readFileSync(path.join(__dirname, "../index.html"), "utf-8");
  // 获取渲染器实例vue-server-renderer
  const { createRenderer } = require("vue-server-renderer");
  const renderer = createRenderer({
    template
  })

  const context = {
    title: 'vue ssr',
    metas: `
      <meta name="keyword" content="vue,ssr">
      <meta name="description" content="vue srr demo">
    `
  }


  // 渲染vue实例为html字符串
  const html = await renderer.renderToString(app, context);
  return html
})

server.listen(3000)




