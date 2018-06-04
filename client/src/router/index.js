import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Bars from '@/components/Bars'
import AddBar from '@/components/AddBar'
import ViewBar from '@/components/ViewBar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/bars',
      name: 'bars',
      component: Bars
    },
    { path: '/addbar',
      name: 'addBar',
      component: AddBar
    },
    {
      path: '/bars/:barId',
      name: 'barId',
      component: ViewBar
    }
  ]
})
