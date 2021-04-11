const createApp = require('./app')
const express = require("express")
const server = express();
const { createRenderer } = require("vue-server-renderer");

const template = fs.readFileSync(path.join(__dirname, "../index.html"), "utf-8");
// 获取渲染器实例vue-server-renderer
const renderer = createRenderer({
  template
})
server.get('*', (req, res) => {


  const context = { url: req.url }

  const app = createApp(context)
  renderer.renderToString(app, (err, html) => {
    res.end(html)
  })
})
server.listen(3000)