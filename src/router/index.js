import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from 'firebase'

Vue.use(VueRouter)

const routerOptions = [
  { path: '/', name: 'Home', meta: { requireAuth: true } },
  { path: '/about', name: 'About' },
  { path: '/signUp', name: 'Register' },
  { path: '/signIn', name: 'Login' },
  { path: '/records', name: 'Records', meta: { requireAuth: true } },
  { path: '/consultation', name: 'Consultation', meta: { requireAuth: true } },
  { path: '/covidcontrol', name: 'CovidControl', meta: { requireAuth: true } },
  { path: '/error', name: 'Error' },
  { path: '*', redirect: { name: 'Home' } }
]

const routes = routerOptions.map(r => {
  return {
    ...r,
    props: true,
    component: () => import(/* webpackChunkName: "[request]" */`@/views/${r.name}`)
  }
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requireAuth)) {
    auth().currentUser ? next() : next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
