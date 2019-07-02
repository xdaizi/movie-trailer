// 使用爬虫获取电影的播放地址
// 申明爬取的地址
const base = 'https://movie.douban.com/subject/'
const doubanId = '6850547'
// const videoBase = 'https://movie.douban.com/trailer/247424'
const puppeteer = require('puppeteer');
const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})
;(async () => {
    console.log('Start visit the target page')
    // 申明一个浏览器
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'], // 启动非沙箱模式
        dumpio: false
    })
    // 开启一个新页面
    const page = await browser.newPage()
    // 等待
    await page.goto(base + doubanId, {
        waitUntil: 'networkidle2' // 网络空闲时
    })
    // 等待3000ms
    await sleep(1000)

    const result = await page.evaluate(() => {
        // 回调函数即为页面上所执行的脚本
        // 拿到JQ的$
        var $ = window.$;
        // 拿到预告片封面图
        var it = $('.related-pic-video');
        if (it && it.length > 0) {
            it = it
            // 跳转地址
            var link = it.attr('href')
            // 封面图
            // var cover = it.find('img').attr('src')
            var cover = it.css('backgroundImage').split('"')[1]
            return {
                link,
                cover
            }
        }
        return {}
    })
    let video
    // 如果有预告片的地址，则跳转过去
    if (result.link) {
        await page.goto(result.link, {
            waitUntil: 'networkidle2'
        })
        await sleep(2000)
        video = await page.evaluate(() => {
            var $ = window.$;
            // 拿到视频的DOM节点
            var it = $('source')
            // 如果预告片存在
            if (it && it.length > 0) {
                return it.attr('src')
            }
            return ''
        })
    }
    const data = {
        video,
        doubanId,
        cover: result.cover,
    }
    browser.close()
    // console.log(result)
    // 子进程发送事件
    process.send(data)
    // 进程退出
    process.exit(0)
})()