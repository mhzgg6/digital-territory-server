const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const staticServer = require('koa-static')

const { check_token } = require('./utils/token')
const routes = require('./routes/index')

const app = new Koa()

// 错误和异常处理
onerror(app)

app.use(bodyParser())
app.use(json())
app.use(logger())
app.use(staticServer(__dirname + '/public'))

app.use(check_token)

// app.use(async ctx => {
//   ctx.body = 'Hello World, Koa!'
// })

app.use(routes.routes(), routes.allowedMethods())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})