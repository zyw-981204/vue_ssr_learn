const createApp = require('/path/to/built-server-bundle.js')
const express = require("express")
const server = express();

const { createRenderer } = require("vue-server-renderer");

const template = fs.readFileSync(path.join(__dirname, "../index.html"), "utf-8");
// 获取渲染器实例vue-server-renderer

const renderer = createRenderer({
  template
})

server.get('*', (req, res) => {
  // 构建context对象，用于进行路由处理
  const context = { url: req.url };
  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end("Page not found")
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(html)
      }
    })
  })
})
server.listen(3000)