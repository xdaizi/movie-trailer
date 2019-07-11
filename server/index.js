const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const mongoose = require('mongoose')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init.js')
// 引入router
const router = require('./routes/index.js')


// 连接数据库，且等数据库连接成功之后再启动其他服务
;(async () => {
  await connect()
  initSchemas()
  // 引入任务脚本
  // 爬取电影
  // require('./task/movie.js')
  // 爬取电影详情信息
  // require('./task/api.js')
  // const Movie = mongoose.model('Movie')
  // const movies = await Movie.find({})
  // console.log('movie----', movies)
})()

// 路由基本用法 
app
  .use(router.routes())
  .use(router.allowedMethods());

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