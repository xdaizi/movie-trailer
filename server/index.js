const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const { resolve } = require('path')
const { connect } = require('./database/init.js')


// 连接数据库，且等数据库连接成功之后再启动其他服务
;(async () => {
  await connect()
})()

app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'Scott',
    me: 'WangPeng'
  })  
})

app.listen(3333)