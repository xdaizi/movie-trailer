// 体验事件循环
// 
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
Promise.resolve()
    .then(() => {
        process.nextTick(()=>{
            console.log('切入阶段，process回调1')
        })
        console.log('promise的回调')
    })
process.nextTick(()=>{
    console.log('切入阶段，process回调')
})