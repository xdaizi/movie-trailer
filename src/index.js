// 入口
// 引入react
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
// 引入路由
import { BrowserRouter } from 'react-router-dom'
// 引入入口
import App from './app'

// 定义根节点
const reactElement = document.getElementById('app')

render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    reactElement
)