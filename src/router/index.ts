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
          component: () => import('@/views/show-list/shows-view.vue')
        },
        {
          name: 'show-details',
          path: '/shows/:showId',
          component: () => import('@/views/show-details/show-details-view.vue')
        },
        {
          name: 'shows-genera',
          path: '/shows/genera/:genera',
          component: () => import('@/views/shows-genera-view.vue')
        },
        {
          name: 'not-found',
          path: '/:pathMatch(.*)*',
          component: () => import('@/views/not-fount.vue')
        }
      ]
    }
  ]
})

export default router
