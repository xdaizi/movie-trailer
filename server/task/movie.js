// 通过脚本获取电影数据
// 拿到子进程
const cp = require('child_process')
const { resolve } = require('path')
;(async () => {
    // 拿到执行脚本
    const script = resolve(__dirname, '../crawler/trailer-list.js');
    const child = cp.fork(script, []);
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
        invoked = false
        let err = code === 0 ? null: new Error('exit code' + code)
        console.log(err)
    })
    // 监听message事件
    child.on('message', data => {
        let result = data.result
        console.log(result)
    })
})()