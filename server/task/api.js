// http://api.douban.com//v2/movie/subject/1764796?apikey=0df993c66c0c636e29ecbb5344252a4a
// 拿到请求模块
const rp = require('request-promise-native')
// 请求的基本url
const BASE_URL = 'http://api.douban.com//v2/movie/subject/'
const API_KEY = 'apikey=0df993c66c0c636e29ecbb5344252a4a'

// 获取详情的信息
async function fetchMovie(item) {
    const url = `${BASE_URL}${item.doubanId}?${API_KEY}`;
    const res = await rp(url)
    return res
}
;(async ()=> {
    let movies = [
        {
            doubanId: 1308807,
            title: '哈尔的移动城堡',
            rate: 9,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2174346180.jpg'
        },
        {
            doubanId: 1291583,
            title: '天空之城',
            rate: 9.1,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p1446261379.jpg'
        }
    ];
    movies.map(async movie => {
        let movieData = await fetchMovie(movie)
        try {
            movieData = JSON.parse(movieData)
            console.log(movieData.tags)
            console.log(movieData.summary)
        } catch(err) {
            console.log(err)
        }
        // console.log(movieData)
    })
})()