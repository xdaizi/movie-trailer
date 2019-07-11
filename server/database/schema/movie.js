// 电影模型
const mongoose = require('mongoose')
// 拿到建模工具
const Schema = mongoose.Schema
const {Mixed, ObjectId} = Schema.Types // Mixed适用于数据类型或者数据结构变化比较平凡的场景
// 创建实例
const movieSchema = new Schema({
    doubanId: {
        unique: true, // 代表id是唯一的，不会有重复
        required: true, // require:表示必填
        type: String
    }, // 豆瓣id
    rate: Number, // 评分
    title: String, // 标题
    summary: String, // 简介
    video: String, // 视频地址
    poster: String, // 海报图
    cover: String, // 封面图

    category: [{ // 电影分类
        type: ObjectId, // id
        ref: 'Category' // ref: 应用指向Category的模型
    }],

    videoKey: String, // 图床文件视频id
    posterKey: String, // 图床文件海报id
    coverKey: String, // 图床文件封面图id

    rawTitle: String, // 原始标题
    movieTypes: [String], // 电影的类别
    pubdate: Mixed, // 上映日期
    year: Number, // 年份

    tags: Mixed, // 标签
    
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
movieSchema.pre('save', function(next){
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
mongoose.model('Movie',movieSchema)
