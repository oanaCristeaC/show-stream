import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/components/layouts/main-layout.vue'),
      redirect: 'shows',
      children: [
        {
          name: 'shows',
          path: '/',
          component: () => import('@/views/shows-view.vue')
        },
        {
          name: 'show-details',
          path: '/shows/:showId',
          component: () => import('@/views/show-details-view.vue')
        }
      ]
    }
  ]
})

export default router
