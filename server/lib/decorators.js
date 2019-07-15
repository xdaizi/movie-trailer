// 装饰器来拆分和处理路由
// 引入路由
const Router = require('koa-router')
const {resolve} = require('path')
// 定义储存path的属性名,Symbol
const symbolPrefix = Symbol('prefix')

// 引入glob
const glob = require('glob')

// 利用map来存储router对象集合,且集合的key,value没有限制
const routerMap = new Map()
// 引入lodash
const _ = require('lodash')
const isArray = c => _.isArray(c) ? c : [c]
export class Route {
    constructor({app, apiPath}) {
        this.app = app // 将app 挂载到 实例上
        this.apiPath = apiPath // api路由相关文件路径
        this.router = new Router() // 路由实例
    }
    // 初始化方法
    init() {
        // 引入所有的路由文件 --- routes下
        glob.sync(resolve(__dirname, this.apiPath, '**/*.js')).forEach(require)

        // 装饰器是编译时运行,所以 routerMap 在编译的时候就会收集集合
        // 遍历routerMap
        // let [key, value] of obj: 所以这里的conf 是 {target,path,method} ,controller是被修饰的属性或者方法 为中间件的集合
        for(let [conf, controller] of routerMap) {
            // 获取中间件的集合
            let controllers = isArray(controller)
            // 获取完整的路由路径
            let prefixPath = conf.target[symbolPrefix]
            if (prefixPath) {
                prefixPath = normalizePath(prefixPath)
            }
            const path = prefixPath + conf.path
            // 注册路由 --- router.get('/', (ctx, next) => {
            //     ctx.body = 'Hello World!';
            // })
            this.router[conf.method](path, ...controllers)
        }
        // 路由use
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
    }
}

// 将path格式化
function normalizePath(path) {
    return path.startsWith('/') ? path : `/${path}`
}

// 相关装饰器
// router修饰器
const router = conf => {
    return (target, key, decorators) => {
        // 格式化path
        conf.path = normalizePath(conf.path)
        // map.set(value,key) --- target[key]:装饰的方法
        routerMap.set({
            target,
            ...conf
        }, target[key])
    }
}

// controller修饰器
export const controller = path => {
    return target => {
        // 将path挂到原型上,利用Symbol,保证不重复,不可修改
        target.prototype[symbolPrefix] = path
    }
}


// 将koa-router常用方法用装饰器包装

// get 修饰器
export const get = path => {
    return router({
        path,
        method: 'get'
    })
}

// post 装饰器
export const post = path => {
    return router({
        path,
        method: 'post'
    })
}

// put 装饰器
export const put = path => {
    return router({
        path,
        method: 'put'
    })
}

// del 装饰器
export const del = path => {
    return router({
        path,
        method: 'del'
    })
}

// use 装饰器
export const use = path => {
    return router({
        path,
        method: 'use'
    })
}

// all 修饰器
export const all = path => {
    return router({
        path,
        method: 'all'
    })
}