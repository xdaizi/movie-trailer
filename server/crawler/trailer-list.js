// 申明爬取的地址
const url = 'https://movie.douban.com/tag/#/?sort=U&range=6,10&tags='
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
    await page.goto(url, {
        waitUntil: 'networkidle2' // 网络空闲时
    })
    // 等待3000ms
    await sleep(3000)

    // 等待出现加载更多的标签
    await page.waitForSelector('.more')

    for(let i = 0; i < 1; i++) {
        await sleep(3000)
        await page.click('.more')
    }
    const result = await page.evaluate(() => {
        // 回调函数即为页面上所执行的脚本
        // 拿到JQ的$
        var $ = window.$;
        // 拿到电影列表的节点
        var items = $('.list-wp a');
        var links = []
        if (items.length >= 1) {
            items.each((index, item)=>{
                // 遍历拿到节点
                let it = $(item);
                // 拿到id
                let doubanId = it.find('div').data('id');
                // 拿到title
                let title = it.find('.title').text()
                // 拿到评级
                let rate = Number(it.find('.rate').text())
                // 拿到海报(用大图替换小图)
                let poster = it.find('img').attr('src').replace('s_ratio_poster', 'l_ratio_poster')
                links.push({
                    doubanId,
                    title,
                    rate,
                    poster
                })
            })
        }
        return links
    })
    browser.close()
    // console.log(result)
    // 子进程发送事件
    process.send({result})
    // 进程退出
    process.exit(0)
})()