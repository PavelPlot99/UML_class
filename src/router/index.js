import Vue from 'vue'
import VueRouter from 'vue-router'
import DiagrammPage from '../views/DiagrammPage.vue'
import HomePage from "@/views/HomePage";
import Register from "@/views/Register";
import Login from "@/views/Login";
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'main',
    meta:{
      requireAuth: true,
    },
    component:HomePage,
  },
  {
    path: '/diagramm',
    name: 'diagramm',
    meta:{
      requireAuth: true,
    },
    component:DiagrammPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (localStorage.getItem('JWT') === null) {
      next({ name: 'Login' })
      return 1
    }
  }
  next()
})

export default router
