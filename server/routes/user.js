// 路由层, 处理user路由

// 用户相关的接口入口
const mongoose = require('mongoose')
const { controller, get, post} = require('../lib/decorators.js')
const { 
    checkPassword
  } = require('../service/user')
// 利用装饰器来拆分处理路由
@controller('/admin')
export class UserController {
    @post('/login')
    async login (ctx, next) { // 登录
        const { email, password } = ctx.request.body
        const matchData = await checkPassword(email, password)
        if (!matchData.user) {
          return (ctx.body = {
            success: false,
            err: '用户不存在'
          })
        }
    
        if (matchData.match) {
          return (ctx.body = {
            success: true
          })
        }
        
        return (ctx.body = {
          success: false,
          err: '密码不正确'
        })
    }
}
