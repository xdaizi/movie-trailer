// 电影模型
const mongoose = require('mongoose')
// 拿到建模工具
const Schema = mongoose.Schema
const {Mixed, ObjectId} = Schema.Types // Mixed适用于数据类型或者数据结构变化比较平凡的场景
// 创建实例
const categorySchema = new Schema({
    name: { // 分类名称
        unique: true,
        type: String
    },
    movies: [{ // 电影数
        type: ObjectId, // id
        ref: 'Movie' // ref: 应用指向Movie的模型
    }], // 电影
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
// 1.给 document 定义一个前置钩子 (pre hook)
// 2.给 document 定义一个后置钩子 (post hook)
categorySchema.pre('save', function(next) {
    // 首次保存则创建时间，更新时间都要赋值
    // Document.prototype.isNew
    // Boolean flag specifying if the document is new.
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else { // 否则只给更新时间赋值
        this.meta.updatedAt = Date.now()
    }
    next()
})


// 创建模型
mongoose.model('Category',categorySchema)
