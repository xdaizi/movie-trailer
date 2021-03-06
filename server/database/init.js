// 初始化脚本
const mongoose = require('mongoose')
const { resolve } = require('path')
// 定义要连接的数据库
// const DB = 'mongodb://localhost/douban-trailer'
// 匹配资源
const DB = 'mongodb://localhost/douban-test'

const glob = require('glob')
// 定义最多连接次数
const MAX_CONNECT_TIME = 5

// 指定promise
mongoose.Promise = global.Promise

// 初始化Schema的方法(初始化数据模型)

exports.initSchemas = () => {
    // 匹配schema所有的js ==> 所有建立数据模型的脚本
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

// 暴露一个连接数据库的方法
exports.connect = () => {
    let connectTime = 0
    return new Promise((resolve, reject) => {
        // 生产环境开启报错
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug',true)
        }
    
        // 连接到数据库
        mongoose.connect(DB);
    
        // 监听数据库断开连接事件
        mongoose.connection.on('disconnected', () => {
            console.log('数据库断开连接')
            connectTime++
            // 小于最大连接次数则重连，否则抛出错误
            if (connectTime < MAX_CONNECT_TIME) {
                // 尝试重新连接
                mongoose.connect(DB);
            } else {
                throw new Error('数据库挂了吧')
            }
        })
    
        // 监听数据库连接发生错误时
        mongoose.connection.on('err', (err) => {
            throw new Error('数据库挂了吧')
            // console.log('连接发生错误', err)
        })
    
        // 监听数据库连接打开
        mongoose.connection.once('open', () => {
            // 测试存入数据
            // 1.创建模型 --- Dog 集合
            // const Dog = mongoose.model('Dog', {name: String})
            // // 2.创建实例 -- 数据
            // const dog = new Dog({name: '旺财'})
            // // 存储到数据库 --- 返回一个promise
            // dog.save().then((res) => {
            //     console.log('存储成功', res)
            // })
            resolve()
            console.log('MongoDB Connected successfully')
        })
    })
}

// 初始化一个管理员
exports.initAdmin = async () => {
    const User = mongoose.model('User')
    let user = await User.findOne({
        username: 'rex'
    })
    if (!user) {
        const user = new User({
            username: 'rex',
            email: 'rex@163.com',
            password: '123456'
        })
        await user.save()
    }
}
  