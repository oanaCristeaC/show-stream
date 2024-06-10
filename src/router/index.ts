import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('../components/layouts/main-layout.vue'),
      redirect: 'home',
      children: [
        {
          name: 'home',
          path: '/',
          component: () => import('../views/shows-view.vue')
        }
      ]
    }
  ]
})

export default router
