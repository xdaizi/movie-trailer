// 电影模型
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// 拿到建模工具
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed // 适用于数据类型或者数据结构变化比较平凡的场景
// 生命盐值的权重
const SALT_WORK_FACTOR = 10
// 最大的登录失败次数
const MAX_LOGIN_ATTEMPTS = 5
// 超过登录失败后锁定用户时间 
const LOCK_TIME = 2 * 60 * 60 * 1000


// 创建实例
const userSchema = new Schema({
    username: { // 用户名
        unique: true, // 代表用户名是唯一的，不会有重复
        required: true, // require:表示必填
        type: String
    },
    email: { // 邮箱
        unique: true, // 代表用户名是唯一的，不会有重复
        required: true, // require:表示必填
        type: String
    },
    password: { // 密码
        unique: true, // 代表用户名是唯一的，不会有重复
        required: true, // require:表示必填
        type: String
    },
    lockUntil: Number, // 密码输入错误后被锁定的时间
    loginAttempts: { // 表示尝试登录次数
        type: Number,
        required: true,
        default: 0
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

// 用户是否锁定用虚拟键来判断virtual
userSchema.virtual('isLocked').get(() => {
    return !!(this.lockUntil && this.lockUntil > Date.now())
})


// 使用前置钩子来作为中间件实现更新数据的时候自动更新创建的时间及更新的时间
userSchema.pre('save', function(next) {
    // 首次保存则创建时间，更新时间都要赋值
    if (this.isNew) {
        this.mate.createdAt = this.mate.updatedAt = Date.now()
    } else { // 否则只给更新时间赋值
        this.mate.updatedAt = Date.now()
    }
    next()
})

// 对密码进行加盐
userSchema.pre('save', function(next) {
    // 密码没有被修改过,则直接return
    if (!this.isModified('password')) return next()

    // 加密,加盐:第一个参数:权重值(权重越大,消耗性能越大)
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        // 有错误直接返回
        if (err) return next(err)

        // 拿到盐值,加密
        bcrypt.hash(this.password, salt, (err, hash) => {
            // 有错误直接返回
            if (err) return next(err)
            // 将hash值赋值给密码
            this.password = hash
            next()
        })
    })
    next()
})

// 给userSchema加上实例方法,如比对密码等
userSchema.methods = {
    // 比对密码
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password), (err, isMatch) => {
                // isMatch: 表示密码是否比对成功 
                if(!err) resolve(isMatch)
                else reject(err)
            }
        })
    },
    // 记录登录尝试
    incLoginAttepts: user => {
        return new Promise((resolve, reject) => {
            // 如果锁定了,且锁定时间小于当前时间 --- 用户可以重新尝试
            if(this.lockUntil && this.lockUntil < Date.now()) {
                let updates = {
                    $set: {
                        loginAttempts: 1 // 尝试次数置为1
                    },
                    $once: {
                        lockUntil: 1 // 删除锁定时间数
                    }
                }
                this.update(updates, err => {
                    if(!err) resolve(true)
                    else reject(err)
                })
            } else { // 没有锁定 1.尝试次数加1 2.判断是否到达最大尝试次数 --- 从而盼盼锁定
                let updates = {
                    $inc: {
                        loginAttempts: 1 // 尝试此时加1
                    }
                }
                // 判断是否到达最大尝试次数
                if(this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
                    updates.$set = {
                        lockUntil: Date.now() + LOCK_TIME // 将锁定时间存入
                    }
                }

                this.update(updates, err => {
                    if(!err) resolve(true)
                    else reject(err)
                })

            }
        })
    }
}




// 创建模型
mongoose.model('User',userSchema)
