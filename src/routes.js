// 管理路由
// 路由懒加载 --- import
import AC from './components/async_load'

export default [
  {
    name: '首页',
    icon: 'home',
    path: '/',
    component: AC(() => import('./views/home'))
  },
  {
    name: '详情页',
    path: '/detail/:ids',
    component: AC(() => import('./views/movie/detail'))
  },
]