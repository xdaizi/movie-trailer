// 体验事件循环
// 1.初始化的时候肯那个还没检测到定时器的回调，所以有时会先执行setImmediate，有时会先执行setTimeout
setImmediate(() => {
    console.log('[阶段3.check阶段.immediate] immediate回调1')
})
setImmediate(() => {
    console.log('[阶段3.check阶段.immediate] immediate回调2')
})
setImmediate(() => {
    console.log('[阶段3.check阶段.immediate] immediate回调3')
})
setTimeout(()=>{
    console.log('[阶段1.timer阶段.timer] timer回调1')
}, 0)