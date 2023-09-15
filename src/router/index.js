import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter(to, from, next) {
      const isLogin = JSON.parse(localStorage.getItem('isLogin'))
      isLogin ? next({ name: from.name }) : next()
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter (to, from, next) {
      const isLogin = JSON.parse(localStorage.getItem('isLogin'))
      isLogin ? next({ name: from.name }) : next()
    }
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
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
