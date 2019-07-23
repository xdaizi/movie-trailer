// koa-bodyparser: 解析请求体
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'

export const addBodyParser = app => {
  app.use(bodyParser())
}

export const addLogger = app => {
  app.use(logger())
}