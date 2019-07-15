// 服务层 --- 查询数据(与数据库交互) 

// 电影接口

const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')


// 获得全部电影
export const gettAllMovies = async (type, year) => {
  let query = {}
  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }
  if (year) {
    query.year = year
  }
  const movies = await Movie.find(query)
  return movies
}

// 获得电影详情
export const getMovieDetail = async (id) => {
  const movie = await Movie.findOne({ _id: id })
  return movie
}

// 获取相关电影
export const getRelativeMovies = async (movie) => {
  const movies = await Movie.find({
    movieTypes: {
      $in: movie.movieTypes
    }
  })
  return movies
}

