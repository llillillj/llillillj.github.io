import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  },
  {
    path: '/works',
    name: 'works',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkView.vue')
  },
  {
    path: '/works/admin',
    name: 'wordAdmin',
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkAdmin.vue')
  },
  {
    path: '/coderef',
    name: 'coderef',
    component: () => import(/* webpackChunkName: "about" */ '../views/CodeRef.vue')
  },
  {
    path: '/coderef/admin',
    name: 'codeAdmin',
    component: () => import(/* webpackChunkName: "about" */ '../views/CodeRefAdmin.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
