// 电影相关的接口入口
const mongoose = require('mongoose')
const { controller, get} = require('../lib/decorators.js')

// 利用装饰器来拆分处理路由
@controller('api/v0/movies')
export class MovieController {
    @get('/')
    async getMovies(ctx, next) { // 获取全部电影
        // 获取电影模型
        const Movie = mongoose.model('Movie')
        // 查询全部电影数据并按创建的顺序倒序排列
        const movies = await Movie.find({}).sort({
            'meta.createdAt': -1
        })

        ctx.body = {
            movies
        }
        next()
    }

    @get('/:id') 
    async getMovieDetail(ctx, next) { // 获取单个电影的详情
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
        next()
    }
}
