// 懒加载处理

import React, {Component} from 'react'

export default (loadComponent, placeholder = '正在加载中') => {
    return class AsyncComponent extends Component {
        constructor () {
            super()
            this.unmount = false // 是否销毁
            this.state = {
                Child: null // 子组件
            }
        }
        // 组件即将销毁
        componentWillUnmount() {
            this.unmount = true
        }
        // 组件已经挂载
        async componentDidMount() {
            // 加载完组件
            const {default: Child} = await loadComponent()
            // 销毁时则return
            if(this.unmount) return
            this.setState({
                Child
            })
        }
        render() {
            const { Child } = this.state
            console.log(111,Child)
            return (
                // 没有加载完成时则显示占位符
                Child ? <Child {...this.props}/> : placeholder
            )
        }
    }
}