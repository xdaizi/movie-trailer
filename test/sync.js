// 同步
const doSync = (sth, time) => new Promise(resolve => {
    setTimeout(()=> {
        console.log(sth + '用了' + time + '毫秒')
        resolve()
    }, time)
})
// 异步
const doAsync = (sth, time, cb) => {
    setTimeout(()=> {
        console.log(sth + '用了' + time + '毫秒')
        cb && cb()
    }, time)
}
const doElse = sth => {
    console.log(sth)
}
const Ming = {
    doSync,
    doAsync
}
const Hong = {
    doSync,
    doAsync,
    doElse
}
;(async ()=> {
    console.log('case1: 小红来到门口');
    await Ming.doSync('小华刷牙', 1000)
    console.log('啥也没干一直等')
    await Hong.doSync('小红洗澡', 2000)
    Hong.doElse('小红去忙别的了')

    console.log('case3: 小红来到门口按下通知开关');
    await Ming.doAsync('小华刷牙', 1000, () => {
        console.log('卫生间通知小红来洗澡')
        Hong.doAsync('小红洗澡', 2000)
    })
    Hong.doElse('小红去忙别的了')
})()