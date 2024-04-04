<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from 'vue'

defineProps<{
  signOutFunction: (payload: MouseEvent) => void
  closeMenu: (payload: MouseEvent) => void
}>()

const isHoverColor = ref(false)
const isRepairShop = ref(false)

const currentUrl = window.location.href
const userId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)
const userSentRoute = computed(() =>
  isRepairShop.value ? `/repair-shop-sent/${userId}` : `/user-sent/${userId}`
)

onMounted(() => {
  isRepairShop.value = !!localStorage.getItem('isRepairShop')
})
</script>

<template>
  <div class="user-settings-background">
    <div class="user-settings-parent-container">
      <div class="user-settings-container z-index-2">
        <button
          type="button"
          :class="[
            'display-flex align-end text-main bg-tran b-n p-absolute top-0 right-0 padding-16',
            isHoverColor ? 'All-02-e-i-o text-active-blue-hover pointer' : 'All-02-e-i-o text-main'
          ]"
          @click="closeMenu"
          @mouseover="isHoverColor = true"
          @mouseleave="isHoverColor = false"
        >
          <fontAwesome :icon="['fas', 'fa-x']" />
        </button>
        <ul
          class="padding-0 display-flex flex-dir-col justify-center align-items-center gap-32 h-100p"
        >
          <li class="list-style-none">
            <RouterLink :to="userSentRoute" class="text-deco-none text-main font-text-light">
              <fontAwesome :icon="['fas', 'paper-plane']" /> Skickat</RouterLink
            >
          </li>
          <li class="activeUrl list-style-none">
            <RouterLink
              :to="isRepairShop ? `/repair-shop-home/${userId}` : `/user-home/${userId}`"
              class="text-deco-none font-text-light text-active-blue"
            >
              <fontAwesome :icon="['fas', 'house']" /> Hem</RouterLink
            >
          </li>
          <!-- <li>
        <RouterLink to="/user-profile" class="side-nav-router-link">
          <fontAwesome :icon="['fas', 'user']" /> Profil</RouterLink
        >
      </li> -->
        </ul>

        <div class="sign-out-btn-container">
          <button type="button" class="outline-btn text-main p-4-y" @click="signOutFunction">
            <fontAwesome :icon="['fas', 'gear']" />
            Logga ut
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
