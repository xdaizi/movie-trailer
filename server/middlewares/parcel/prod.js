// 生产环境配置 --- 不用配置打包

// 提供打包后模板页面的访问能力
const views = require('koa-views')

// 静态资源的中间件
// 提供静态资源的访问能力
const serve = require('koa-static')

const { resolve } = require('path')

const r = path => resolve(__dirname, path)

// 暴露配置

export const dev = async app => {
    // 起静态资源服务
    app.use(serve(r('../../../dist')))

    // 起页面访问的能力
    app.use(views(r('../../../dist'), {
        extension: 'html' // 模板的后缀名
    }))

    // 渲染
    app.use(async ctx => {
        await ctx.render('index.html')
    })
}