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
  {
    name: '后台入口',
    icon: 'admin',
    path: '/admin',
    component: AC(() => import('./views/admin/login'))
  },
  {
    name: '定影管理',
    icon: 'admin',
    path: '/list',
    component: AC(() => import('./views/admin/list'))
  },
]