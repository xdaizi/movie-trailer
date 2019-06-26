const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const {resolve} = require('path')
app.use(views(resolve(__dirname, 'pug-views'), {
    extension: 'pug'
}))
app.use(async (ctx, next) => {
    await ctx.render('index', {
        user: 'lucker',
        ower: 'test'
    })
})
app.listen(3333)