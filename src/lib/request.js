// 封装请求,并且做请求的拦截及统一的错误处理
// 引入 axios
import axios from 'axios'
import { message } from 'antd'

// 定义axios的配置
const defaultAxiosConf = {
    timeout: 10000 // 延时
}

// 定义请求函数
const _request = (param = {}, fn = () => {}) => {
    return axios({
        ...defaultAxiosConf,
        ...param
    }).then(res => { // 统一处理请求异常情况
        const { success, data, err, code } = res.data
        // code: 401 没有权限访问,返回首页
        if (code === 401) {
            window.location.href = '/'
            return
        }
        if(success) {
            fn(false) // 关闭loading
            return data
        }
        throw err
    }).catch(err => { // 捕捉错误
        fn(false)
        message.error(String(err || '网络错误'))
    })
}

// 导出
export default param => {
    const type = typeof param
    if (type === 'function') {
        param(true)
        return obj => _request(obj, param)
    }
    if (type === 'object' && type !== null) {
        return _request(param)
    }
}