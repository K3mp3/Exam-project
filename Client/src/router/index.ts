import ConsumerLandingViewVue from '@/views/ConsumerLandingView.vue'
import ContactViewVue from '@/views/ContactView.vue'
import LayoutVue from '@/views/Layout.vue'
import RegisterRepairShopView from '@/views/RegisterRepairShopView.vue'
import RegisterViewVue from '@/views/RegisterView.vue'
import RepairShopHomeViewVue from '@/views/RepairShopHomeView.vue'
import SignInViewVue from '@/views/SignInView.vue'
import UserHomeView from '@/views/UserHomeView.vue'
import UserSentViewVue from '@/views/UserSentView.vue'
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
          component: ConsumerLandingViewVue,
          meta: { index: true }
        },
        {
          path: '/contact',
          name: 'contact form',
          component: ContactViewVue
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
          path: '/user-home/:id',
          name: 'user home view',
          component: UserHomeView
        },
        {
          path: '/repair-shop-home',
          name: 'repair shop home view',
          component: RepairShopHomeViewVue
        },
        {
          path: '/user-sent',
          name: 'user sent view',
          component: UserSentViewVue
        }
      ]
    }
  ]
})

export default router
