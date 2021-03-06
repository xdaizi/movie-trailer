// 首页入口
import React, { Component } from 'react'

// 封装的网络请求
import { request } from '../../lib/index.js'

// 引入默认视图模板
import Layout from '../../layouts/default.js'

// 引入内容组件
import Content from './content.js'

import { Menu } from 'antd'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
        selectedKey: '0',
        years: ['2026','2025', '2024', '2023', '2022', '2021', '2020', '2019'], // 电影上映年份
        type: this.props.match.params.type, // 电影类型
        year: this.props.match.params.year, // 电影年份
        movies: [] // 所搜出来的电影
    }
  }
  // 渲染中间部分
  _renderContent = () => {
    const { movies } = this.state
    if (!movies || !movies.length) return null
    return (
      <Content movies={movies} />
    )
  }

  // 组件挂载时请求 
  componentDidMount () {
    this._getAllMovies()
  }

  // 点击时,切换选择
  _selectedItem = ({key}) => {
    this.setState({
      selectedKey: key
    })
  }

  // 获取电影接口
  _getAllMovies () {
    request(window.__LOADING__)({
      method: 'get',
      url: `api/v0/movies?type=${this.state.type || ''}&year=${this.state.year || ''}`
    }).then(res => {
      console.log(2222, res)
      this.setState({
        movies: res
      })
    }).catch(() => {
      this.setState({
        movies: []
      })
    })
  }
  render () {
    // 拿到选择的年份及类型
    const { years, selectedKey } = this.state
    return (
      <Layout {...this.props}>
        <div className='flex-row full'>
          <Menu
            defaultSelectedKeys={[selectedKey]}
            mode='inline'
            inlineCollapsed={true}
            style={{ height: '100%', overflowY: 'scroll', maxWidth: 230, minWidth: 100 }}
            onSelect={this._selectedItem}
            className='align-self-start'
          >
            {
              years && years.length
                ? years.map((e, i) => (
                  <Menu.Item key={i}
                  style={{
                    maxWidth: 54
                  }}
                  >
                    <a href={`/year/${e}`}>{e} 年上映</a>
                  </Menu.Item>
                ))
                : null
            }
          </Menu>
          <div className='flex-1 scroll-y align-self-start'>
            {this._renderContent()}
          </div>
        </div>
      </Layout>
    )
  }
}