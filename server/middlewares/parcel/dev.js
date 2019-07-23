// 开发环境配置

// 打包
// https://parceljs.org/api.html
const Bundler = require('parcel-bundler')

// 提供打包后模板页面的访问能力
const views = require('koa-views')

// 静态资源的中间件
// https://www.npmjs.com/package/koa-static
// https://blog.csdn.net/buppt/article/details/79277370

// 比较:
// https://blog.csdn.net/sinat_17775997/article/details/82956131
// 提供静态资源的访问能力
const serve = require('koa-static')

const { resolve } = require('path')

const r = path => resolve(__dirname, path)


// 创建构建实例
const bundler = new Bundler(r('../../../src/index.html'), {
    publicUrl: '/', // 静态资源的 url ，默认为 '/'
    watch: true, // 是否需要监听文件并在发生改变时重新编译它们，默认为 process.env.NODE_ENV !== 'production'
})

// 暴露配置

export const dev = async app => {
    // 构建
    await bundler.bundle()
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
