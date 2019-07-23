// 服务层 --- 查询数据(与数据库交互)
// 用户数据

const mongoose = require('mongoose')
const User = mongoose.model('User')

export const checkPassword = async (email, password) => {
    let match = false
        //   查询对应数据
    const user = await User.findOne({ email }).exec()
    console.log(111, user)
    if (user) {
        //  利用实例上的方法comparePassword比较密码
        match = await user.comparePassword(password, user.password)
        console.log(11111, match)
    }
    return {
        match,
        user
    }
}