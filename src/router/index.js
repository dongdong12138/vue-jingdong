import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue'),
    beforeEnter(to, from, next) {
      const isLogin = JSON.parse(localStorage.getItem('isLogin'))
      isLogin ? next({ name: from.name }) : next()
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/Register/Register.vue'),
    beforeEnter(to, from, next) {
      const isLogin = JSON.parse(localStorage.getItem('isLogin'))
      isLogin ? next({ name: from.name }) : next()
    }
  },
  {
    path: '/shop/:id',
    name: 'shop',
    component: () => import(/* webpackChunkName: "shop" */ '@/views/Shop/Shop.vue')
  },
  {
    path: '/cartList',
    name: 'cartList',
    component: () => import(/* webpackChunkName: "cartList" */ '@/views/CartList/CartList.vue')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'orderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '@/views/OrderConfirmation/OrderConfirmation.vue')
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import(/* webpackChunkName: "orderList" */ '@/views/OrderList/OrderList.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search/Search.vue')
  },
  {
    path: '/searchList',
    name: 'searchList',
    component: () => import(/* webpackChunkName: "searchList" */ '@/views/SearchList/SearchList.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = JSON.parse(localStorage.getItem('isLogin'))
  const goLoginOrRegister = to.name === 'login' || to.name === 'register'
  isLogin || goLoginOrRegister ? next() : next({ name: 'login' })
})

export default router
