import ConsumerLandingView from '@/views/ConsumerLandingView.vue'
import LayoutVue from '@/views/Layout.vue'
import RegisterRepairShopView from '@/views/RegisterRepairShopView.vue'
import RegisterViewVue from '@/views/RegisterView.vue'
import RepairShopHomeViewVue from '@/views/RepairShopHomeView.vue'
import SignInViewVue from '@/views/SignInView.vue'
import UserHomeLandingViewVue from '@/views/UserHomeHomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
          name: 'landing page',
          component: ConsumerLandingView,
          meta: { index: true }
        },
        {
          path: '/register',
          name: 'register form',
          component: RegisterViewVue
        },
        {
          path: '/register-repair-shop',
          name: 'register repair shop form',
          component: RegisterRepairShopView
        },
        {
          path: '/sign-in',
          name: 'sign in form',
          component: SignInViewVue
        },
        {
          path: '/user-home',
          name: 'user home view',
          component: UserHomeLandingViewVue
        },
        {
          path: '/repair-shop-home',
          name: 'repair shop home view',
          component: RepairShopHomeViewVue
        }
      ]
    }
  ]
})

export default router
