// 通过脚本获取电影数据
// 拿到子进程
const cp = require('child_process')
const { resolve } = require('path')
// 引入mongoose 让电影列表数的户数入库
const mongoose = require('mongoose')
// 拿到电影模型
const Movie = mongoose.model('Movie')
;(async () => {
    // 拿到执行脚本
    const script = resolve(__dirname, '../crawler/trailer-list.js');
    const child = cp.fork(script, []);
    // 定义变量标志是否已调用
    let invoked = false;
    // 监听error事件
    child.on('error', err => {
        if(invoked) return
        invoked = true
        console.log(err)
    })
    // 监听进程退出事件
    child.on('exit', code => {
        if(invoked) return
        invoked = true
        let err = code === 0 ? null: new Error('exit code' + code)
        console.log(err)
    })
    // 监听message事件
    child.on('message', data => {
        let result = data.result
        // console.log(result)
        result.forEach( async v =>{
            // 查询为异步
            let movie = await Movie.findOne({
                doubanId: v.doubanId
            })

            // 没有存过则存进去
            if(!movie) {
                movie = new Movie(v)
                await movie.save()
            }
        })

    })
})()