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
