const Koa = require('koa')
const { connect, initSchemas } = require('./database/init.js')
const { resolve, join } = require('path');
// 函数式编程库
const R = require('ramda')

// 定义中间件的集合
const MIDDLEWARES = ['router', 'parcel']

// 定义中间件的使用方法
// R.compose: 将方法合并,从右往左执行
const useMiddlewares = app => {
  R.map(
    R.compose(
      R.forEachObjIndexed(initWith => initWith(app)), // 执行方法
      require, // 引入
      name => join(__dirname, `./middlewares/${name}`) // 到中间件目录拿到中间件路径集合
    )
  )(MIDDLEWARES)
}

// 连接数据库，且等数据库连接成功之后再启动其他服务
;(async () => {
  try {
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
    const app = new Koa();
    await useMiddlewares(app)
    // app.use(async (ctx, next) => {
    //   ctx.body = 'hi koa'
    //   next()
    // })
    app.listen(4455)
  } catch (error) {
    console.log(error)
  }
})()