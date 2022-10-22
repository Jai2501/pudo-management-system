import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import AggregateDisplay from '../views/AggregateDisplay.vue'
import Backup from '../views/Backup.vue'
import BerthDisplay from '../views/BerthDisplay.vue'
import LivePudoStatus from "../views/LivePudoStatus.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/aggregate-display',
      name: 'AggregateDisplay',
      component: AggregateDisplay
    },
    {
      path: '/berth-display/:berthDisplayNumber',
      name: 'BerthDisplay',
      props: true,
      component: BerthDisplay
    },
    {
      path: '/live-pudo-status',
      name: 'LivePudoStatus',
      component: LivePudoStatus
    },
    {
      path: '/backup',
      name: 'Backup',
      component: Backup
    }
  ]
})

export default router
