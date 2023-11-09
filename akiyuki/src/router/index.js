import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import SnakeGame from "../views/SnakeGame.vue"
// import NotFound from "../views/NotFound.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/snake',
    name: 'SnakeGame',
    component: () => import(/* webpackChunkName: "snake" */ '../views/SnakeGame.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // {
  //   path: "/:catchAll(.*)*",
  //   component: () => import('../views/NotFound.vue'),
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
