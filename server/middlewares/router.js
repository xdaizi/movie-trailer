// 路由中间件

// 引入装饰器js
const {Route} = require('../lib/decorators.js')
const {resolve} = require('path')

export const router = app => {
    const apiPath = resolve(__dirname, '../routes')
    const router = new Route({app, apiPath})
    router.init()
} 
