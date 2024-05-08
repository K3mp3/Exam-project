<script setup lang="ts">
import { useShowMobileNavMenu } from '@/stores/showMobileNavMenuStore'
import { computed, onMounted, ref } from 'vue'
import ConsumerNavMobileMenu from './ConsumerNavMobileMenu.vue'

const navScroll = ref(false)
const animateMenuBtn = ref(false)

const isNavOpen = computed(() => useShowMobileNavMenu().showMenu)

function showMobileNav() {
  animateMenuBtn.value = !animateMenuBtn.value
  const showMobileNavMenu = useShowMobileNavMenu()
  showMobileNavMenu.showNavMenu(!isNavOpen.value)
}

window.addEventListener('scroll', changeNavColor)

function changeNavColor() {
  if (document.documentElement.scrollTop > 70) navScroll.value = true
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
      <RouterLink to="/" class="text-deco-none"
        ><h2 class="O15rem text-main font-title-black">Vibe</h2></RouterLink
      >
    </div>
    <div class="nav-child-container right">
      <div class="nav-hamburger-icon">
        <button type="button" @click="showMobileNav">
          <span :class="animateMenuBtn && 'span-nr1'"></span>
          <span :class="animateMenuBtn && 'span-nr2'"></span>
          <span :class="animateMenuBtn && 'span-nr3'"></span>
        </button>
      </div>
    </div>
  </div>

  <ConsumerNavMobileMenu></ConsumerNavMobileMenu>
</template>
