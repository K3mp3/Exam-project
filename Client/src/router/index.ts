import { createRouter, createWebHistory } from 'vue-router'
import ConsumerLandingView from '@/views/ConsumerLandingView.vue'
import LayoutVue from '@/views/Layout.vue'
import RegisterViewVue from '@/views/RegisterView.vue'
import SignInViewVue from '@/views/SignInView.vue'

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
        },
        {
          path: '/register',
          name: "register form",
          component: RegisterViewVue,
        },
        {
          path: '/sign-in',
          name: "sign in form",
          component: SignInViewVue,
        },
      ]
    },
  ]
})

export default router
