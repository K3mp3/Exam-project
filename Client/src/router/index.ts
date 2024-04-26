import AboutUsView from '@/views/AboutUsView.vue'
import ConsumerLandingViewVue from '@/views/ConsumerLandingView.vue'
import ContactViewVue from '@/views/ContactView.vue'
import LayoutVue from '@/views/Layout.vue'
import RegisterRepairShopView from '@/views/RegisterRepairShopView.vue'
import RegisterViewVue from '@/views/RegisterView.vue'
import RepairShopHomeViewVue from '@/views/RepairShopHomeView.vue'
import RepairShopSentView from '@/views/RepairShopSentView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import SignInViewVue from '@/views/SignInView.vue'
import UserHomeNewRequestViewVue from '@/views/UserHomeNewRequestView.vue'
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
          name: '/contact',
          component: ContactViewVue,
          meta: { index: true }
        },
        {
          path: '/register',
          name: 'register form',
          component: RegisterViewVue,
          meta: { index: true }
        },
        {
          path: '/register-repair-shop',
          name: 'register repair shop form',
          component: RegisterRepairShopView,
          meta: { index: true }
        },
        {
          path: '/sign-in',
          name: 'sign in form',
          component: SignInViewVue,
          meta: { index: true }
        },
        {
          path: '/user-home/:userId',
          name: 'user home view',
          component: UserHomeView,
          meta: { index: true }
        },
        {
          path: '/user-home-new-request/:userId',
          name: 'user home new request',
          component: UserHomeNewRequestViewVue,
          meta: { index: true }
        },
        {
          path: '/repair-shop-home/:userId',
          name: 'repair shop home view',
          component: RepairShopHomeViewVue,
          meta: { index: true }
        },
        {
          path: '/user-sent/:id',
          name: 'user sent view',
          component: UserSentViewVue,
          meta: { index: true }
        },
        {
          path: '/repair-shop-sent/:id',
          name: 'repair shop sent view',
          component: RepairShopSentView,
          meta: { index: true }
        },
        {
          path: '/about-us',
          name: 'about us view',
          component: AboutUsView,
          meta: { index: true }
        },
        {
          path: '/reset-password',
          name: 'resept password view',
          component: ResetPasswordView,
          meta: { index: true }
        }
      ]
    }
  ]
})

export default router
