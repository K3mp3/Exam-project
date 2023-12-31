import { createRouter, createWebHistory } from 'vue-router'
import ConsumerLandingView from '@/views/ConsumerLandingView.vue'
import LayoutVue from '@/views/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: LayoutVue,
      children: [
        {
          path: '/',
          name: "landing page",
          component: ConsumerLandingView,
          meta: {index: true}
        }
      ]
    },
  ]
})

export default router
