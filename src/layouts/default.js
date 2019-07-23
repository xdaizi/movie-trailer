// 默认模板布局
import React, { Component } from 'react'
import {Menu, Spin} from 'antd'
// 导航
import navRoutes from '../nav.js'

// 获得菜单内容
const getMenuContent = ({path, name}) =>{
    return <a href={path ? path : '/'} style={{color: '#fff2e8'}}>
        {name}
    </a>
}

// 导出默认模板
export default class LayoutDefault extends Component {

    constructor(props) {
        // props
        super(props)
        this.state = {
            loading: true, // loading 状态
            tip: '正在加载中....' // loading的提示语
        }
    }

    // 组件完成挂载
    componentDidMount () {
        // loading 切换
        window.__LOADING__ = this.toggleLoading
    }

    // 组件将要注销时
    componentWillUnmount() {
        window.__LOADING__ = null
    }

    // loading切换函数
    toggleLoading = (stats = false, tip = "在等一下哦") => {
        this.setState({
            tip,
            loading: stats
        })
    }

    // 匹配的路由
    matchRouteName = this.props.match
        ? navRoutes.find(e => e.name === this.props.match.params.type)
            ? navRoutes.find(e => e.name === this.props.match.params.type).name
            : '全部'
        : navRoutes[0].name

    render() {
        // 拿到子组件
        const { children } = this.props
        // 拿到loading的状态
        const { loading, tip } = this.state

        return (
            <div className='flex-column' style={{ width: '100%', height: '100%' }}>
            <Menu
              style={{ fontSize: 13.5, backgroundColor: '#000' }}
              mode='horizontal'
              defaultSelectedKeys={[this.matchRouteName]}
            >
              <Menu.Item
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  fontSize: 12,
                  textAlign: 'center',
                  color: '#fff !important',
                  float: 'left'
                }}
              >
                <a href={'/'} className='hover-scale logo-text' style={{color: '#fff2e8'}}>黑骑预告片网站</a>
              </Menu.Item>
              {
                navRoutes.map((e, i) => (
                  <Menu.Item key={e.name}
                  style={{
                    paddingLeft: 6,
                    paddingRight: 6,
                  }}
                  >
                    { getMenuContent({ ...e }) }
                  </Menu.Item>
                ))
              }
            </Menu>
            <Spin
              spinning={loading}
              wrapperClassName='content-spin full'
              tip={tip}
            >
              {children}
            </Spin>
          </div>
        )
    }

}



