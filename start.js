// 运行时执行脚本
// 注册
require('babel-core/register')()
// 引入polyfill
require('babel-polyfill')
// require('./test/des.js')
require('./server/index.js')