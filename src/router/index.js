import Vue from 'vue'
import VueRouter from 'vue-router'
import Categories from '@/views/Categories.vue'
import NotFound from '@/views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'categories',
    component: Categories
  },
  {
    path: '/category/:id/exame',
    name: 'exame',
    // route level code-splitting
    // this generates a separate chunk (exame.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "exame" */ '../views/Exame.vue')
  },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
