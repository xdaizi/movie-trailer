// 通过不同的开发环境暴露不同的编译配置

// 获取环境变量
const env = process.env.NODE_ENV === 'produtiion' ? 'prod': 'dev'

// 根据环境变量暴露不同配置
module.exports =  require(`./${env}.js`)


