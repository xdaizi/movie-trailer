// 路由层 --- 接受请求
// 电影相关的接口入口
const mongoose = require('mongoose')
const { controller, get} = require('../lib/decorators.js')
const {gettAllMovies, getMovieDetail, getRelativeMovies} = require('../service/movie.js')
// 利用装饰器来拆分处理路由
@controller('api/v0/movies')
export class MovieController {
    @get('/')
    async getMovies(ctx, next) { // 获取全部电影
        const {type, year} = ctx.query
        const movies = await gettAllMovies(type,year)
        ctx.body = {
            movies
        }
        // next()
    }

    @get('/:id') 
    async getMovieDetail(ctx, next) { // 获取单个电影的详情
        // 拿到参数id
        const id = ctx.params.id
        const movie = await getMovieDetail(id)
        const relativeMovies = await getRelativeMovies(movie)
        ctx.body = {
            data: {
                movie,
                relativeMovies
            },
            success: true
        }
        // next()
    }
}
