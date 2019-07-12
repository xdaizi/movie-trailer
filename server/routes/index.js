// 路由入口
const Router = require('koa-router')
const mongoose = require('mongoose')
// 创建路由实例: 处理不同的http请求
// const router = new Router({
//     prefix: '/movies'
// })
const router = new Router()

// 定义请求路由

// 获取全部电影
router.get('/movies', async (ctx, next) => {
    // 获取电影模型
    const Movie = mongoose.model('Movie')
    // 查询全部电影数据并按创建的顺序倒序排列
    const movies = await Movie.find({}).sort({
        'meta.createdAt': -1
    })

    ctx.body = {
        movies
    }
    // next()
})

// 获取某个电影的详情
router.get('/movies/:id', async (ctx, next) => {
    // 获取电影模型
    const Movie = mongoose.model('Movie')
    // 拿到参数id
    const id = ctx.params.id
    // 查询全部电影数据并按创建的顺序倒序排列
    const movie = await Movie.findOne({
        _id: id
    })

    ctx.body = {
        movie
    }
    // next()
})

// 导出路由
module.exports = router