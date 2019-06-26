const Koa = require('koa')
const app = new Koa()
const logger = require('koa-logger')
const sessino = require('koa-session')
// 测试中间件
// const mid1 = async (ctx, next) => {
//     ctx.body = 'Hi'
//     await next()
//     ctx.body += ' there'
// }
// const mid2 = async (ctx, next) => {
//     ctx.type = 'text/html; chartset=utf-8'
//     await next()
// }
// const mid3 = async (ctx, next) => {
//     ctx.body += ' koa'
//     await next()
// }
// use的顺序就是中间件执行的顺序，等执行完，则将控制权将给上层中间件
app.keys = ['hi koa']
app.use(logger())
app.use(sessino(app))
app.use(async (ctx, next) =>{
    if (ctx.path === '/favicon.ico') return
    if (ctx.path === '/') {
        let n = ctx.session.view || 0
        ctx.session.view = ++n
        ctx.body = `${n}次`
    } else if (ctx.path === '/hi') {
        ctx.body = 'hi koa'
    } else {
        ctx.body = '404'
    }
    await next()
})
app.listen(3333)