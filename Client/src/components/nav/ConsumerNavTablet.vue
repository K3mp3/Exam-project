<script setup lang="ts">
import { useShowMobileNavMenu } from '@/stores/showMobileNavMenuStore'
import { computed, onMounted, ref } from 'vue'
import ConsumerNavMobileMenu from './ConsumerNavMobileMenu.vue'

const navScroll = ref(false)

const isNavOpen = computed(() => useShowMobileNavMenu().showMenu)

function showTabletMenu() {
  const showMobileNavMenu = useShowMobileNavMenu()
  showMobileNavMenu.showNavMenu(!isNavOpen.value)
}

window.addEventListener('scroll', changeNavColor)

function changeNavColor() {
  if (document.documentElement.scrollTop > 200) navScroll.value = true
  else {
    navScroll.value = false
  }
}

onMounted(() => {
  changeNavColor()
})
</script>

<template>
  <div
    class="nav-parent-container"
    :style="{ backgroundColor: navScroll ? '#090909de' : 'transparent' }"
  >
    <div class="nav-child-container left">
      <RouterLink to="register" class="router-link">Registrera</RouterLink>
    </div>
    <div class="nav-child-container center">
      <RouterLink to="/" class="text-deco-none"
        ><p class="text-deco-none O15rem text-main font-title-black">Vibe</p></RouterLink
      >
    </div>
    <div class="nav-child-container right">
      <div class="nav-hamburger-icon">
        <button type="button" @click="showTabletMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </div>

  <ConsumerNavMobileMenu></ConsumerNavMobileMenu>
</template>
