import Vue from 'vue'
import VueRouter from 'vue-router'

//路由懒加载 优端：首页加载时不需要加载所有的组件，可以进行懒加载 用到哪些组件就加载哪些组件
//          弊端：如果组件不多的话使用懒加载会增加体积，组件多的话使用懒加载

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Roles from '../components/right/Roles.vue'
import Rights from '../components/right/Rights.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import Goods from '../components/goods/Goods.vue'
import Add from '../components/goods/Add.vue'
import Order from '../components/order/Order.vue'
import Report from '../components/report/Report.vue'

// const Login = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Login.vue')
// const Home = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Home.vue')
// const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Welcome.vue')
// const Users = () => import(/* webpackChunkName:"Users_Roles_Rights" */ '../components/user/Users.vue')
// const Roles = () => import(/* webpackChunkName:"Users_Roles_Rights" */ '../components/right/Roles.vue')
// const Rights = () => import(/* webpackChunkName:"Users_Roles_Rights" */ '../components/right/Rights.vue')
// const Cate = () => import(/* webpackChunkName:"Cate_Params_Goods_Add" */ '../components/goods/Cate.vue')
// const Params = () => import(/* webpackChunkName:"Cate_Params_Goods_Add" */ '../components/goods/Params.vue')
// const Goods = () => import(/* webpackChunkName:"Cate_Params_Goods_Add" */ '../components/goods/Goods.vue')
// const Add = () => import(/* webpackChunkName:"Cate_Params_Goods_Add" */ '../components/goods/Add.vue')
// const Order = () => import(/* webpackChunkName:"Order_Report" */ '../components/order/Order.vue')
// const Report = () => import(/* webpackChunkName:"Order_Report" */ '../components/report/Report.vue')

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/roles', component: Roles },
      { path: '/rights', component: Rights },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/goods', component: Goods },
      { path: '/add', component: Add },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report }
    ]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
/**
 * to:要访问的路径
 * from:从哪里跳转的路径
 * next:是一个函数 next()  放行    next('/login')  强制跳转
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  let token = window.sessionStorage.getItem('vuetoken')
  if (!token) return next('/login')
  next()
})

export default router
