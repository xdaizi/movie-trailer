// http://api.douban.com//v2/movie/subject/1764796?apikey=0df993c66c0c636e29ecbb5344252a4a
// http://api.douban.com/v2/movie/1308807?apikey=0df993c66c0c636e29ecbb5344252a4a
// 拿到请求模块
const rp = require('request-promise-native')
// 引入db
const mongoose = require('mongoose')
// 获取Movie及Category数据模型
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

// 请求的基本url
// 简要接口
// const BASE_URL = 'http://api.douban.com//v2/movie/subject/' 
// 详细接口
const BASE_URL = 'http://api.douban.com//v2/movie/'
const API_KEY = 'apikey=0df993c66c0c636e29ecbb5344252a4a'

// 获取详情的信息
async function fetchMovie(item) {
    const url = `${BASE_URL}${item.doubanId}?${API_KEY}`;
    const res = await rp(url)
    // 接口返回的是字符串,需要转换下
    let body
    try {
        body = JSON.parse(res)
    } catch (error) {
        console.log(error)
    }
    return body
}
;(async ()=> {
    // 1.从数据库中查出之前入库的电影数据
    let movies = await Movie.find({
        // $or: 满足查询条件其中之一就可以
        $or: [  
            {summary: {$exists: false}}, // 简介不存在
            {summary: null},
            {summary: ''},
            {title: ''}, // 标题为空
            {year: {$exists: false}}, // 年份不存在
            {category: {$exists: false}}, // 分类不存在
        ]
    })
    // let movieList = [movies[0]]
    let movieList = movies
    // 处理电影详细信息
    async function handerMovieDetail(movies) {
        for (let i = 0; i < movies.length; i++) {
            let movie = movies[i]
            // 根据id请求详细数据
            let movieData = await fetchMovie(movie)
            if (movieData) {
                // 拿到对应数据
                let tags = movieData.tags || []
                movie.tags = movie.tags || []
                movie.summary = movieData.summary || ''
                movie.title = movieData.alt_title || movieData.title || ''
                movie.rawTitle = movieData.title || ''

                if (movieData.attrs) {
                    movie.movieTypes = movieData.attrs.movie_type || []
                    movie.year = movieData.attrs.year[0] || 2500
                    let movieTypes = movie.movieTypes
                    // 处理电影类别及分类
                    for (let i = 0; i < movieTypes.length; i++) {
                        let item = movieTypes[i]
                        // 查询分类
                        let cat = await Category.findOne({
                            name: item
                        })
                        // 不存在则先创建再存入,否则直接存入
                        if(!cat) {
                            cat = new Category({
                                name: item,
                                movies: [movie._id]
                            })
                        } else {
                            // 没有存过啊则push进入数组
                            if (cat.movies.indexOf(movie._id) < 0) {
                                cat.movies.push(movie._id)
                            }
                        }
                        // 保存分类
                        cat.save()

                        // 电影关联分类
                        if(!movie.category) { // 不存在 -- 创造
                            movie.category = [cat._id]
                        } else {
                            // 没存过则存进去
                            if (movie.category.indexOf(cat._id) < 0) {
                                movie.category.push(cat._id)
                            }
                        }

                    }

                    // 处理上映时间 
                    let dates = movieData.attrs.pubdate || []
                    let pubdates = []
                    dates.forEach(item => {
                        if (item && item.split('(').length > 0) {
                            let parts = item.split('(')
                            let date = parts[0]
                            // 国家
                            let country = '未知'
                            if(parts[1]) {
                                country = parts[1].split(')')[0]
                            }
                            pubdates.push({
                                date: new Date(date),
                                country
                            })
                        }
                    })
                    movie.pubdates = pubdates
                }
                // 处理标签
                tags.forEach(tag => {
                    movie.tags.push(tag.name)
                })
                // console.log(movie, 'movie------movie')
                movie.save()
            }
        }
    }

    handerMovieDetail(movieList)
})()