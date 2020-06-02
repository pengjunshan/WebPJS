import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '@/views/Home.vue'
import Pressure from '@/views/Pressure.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/home', name: 'home', component: Home,
    meta: {
      keepAlive: true
    }
  },
  { path: '/pressure', name: 'pressure', component: Pressure }

]

const router = new VueRouter({
  routes
})

export default router
