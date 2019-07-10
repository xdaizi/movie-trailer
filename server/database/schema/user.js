// 电影模型
const mongoose = require('mongoose')
// 拿到建模工具
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed // 适用于数据类型或者数据结构变化比较平凡的场景
// 创建实例
const userSchema = new Schema({
    username: { // 用户名
        unique: true, // 代表用户名是唯一的，不会有重复
        type: String
    },
    email: { // 邮箱
        unique: true, // 代表用户名是唯一的，不会有重复
        type: String
    },
    password: { // 密码
        unique: true, // 代表用户名是唯一的，不会有重复
        type: String
    },
    meta: { // 描述
        createdAt: { // 数据创建的时间
            type: Date,
            default: Date.now()
        },
        updatedAt: { // 数据更新的时间
            type: Date,
            default: Date.now()
        }
    }
})

// 使用前置钩子来作为中间件实现更新数据的时候自动更新创建的时间及更新的时间
userSchema.pre('save', (next) => {
    // 首次保存则创建时间，更新时间都要赋值
    if (this.isNew) {
        this.mate.createdAt = this.mate.updatedAt = Date.now()
    } else { // 否则只给更新时间赋值
        this.mate.updatedAt = Date.now()
    }
    next()
})


// 创建模型
mongoose.model('User',userSchema)
