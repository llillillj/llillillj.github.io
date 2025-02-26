import { createRouter, createWebHashHistory } from 'vue-router'
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
    // component: SnakeGame
  },
  {
    path: '/boid-algorithm',
    name: 'BoidAlgorithm',
    component: () => import(/* webpackChunkName: "boid" */ '../views/BoidAlgorithm.vue')
  }
  // {
  //   path: "/:catchAll(.*)*",
  //   component: () => import('../views/NotFound.vue'),
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
