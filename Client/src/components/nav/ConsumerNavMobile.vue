<script setup lang="ts">
import { onMounted, ref } from 'vue'

const navScroll = ref(false)
const animateMenuBtn = ref(false)

const maxHeight = ref('0px')

function showMobileNav() {
  animateMenuBtn.value = !animateMenuBtn.value
  // const showMobileNavMenu = useShowMobileNavMenu()
  // showMobileNavMenu.showNavMenu(!isNavOpen.value)

  if (animateMenuBtn.value) {
    maxHeight.value = '100%' // Expand the height to full
  } else {
    maxHeight.value = '0px' // Collapse the height to 0
  }
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
  <div class="w-screen p-4">
    <div class="flex flex-col px-3 py-1 rounded-lg border-main bg-main-40 backdrop-blur-sm gap-8">
      <div class="flex items-center justify-between w-full">
        <RouterLink to="/" class="text-deco-none"
          ><h2 class="O15rem text-main font-title-black">Vibe</h2></RouterLink
        >
        <div class="nav-hamburger-icon">
          <button type="button" @click="showMobileNav">
            <span :class="animateMenuBtn && 'span-nr1'"></span>
            <span :class="animateMenuBtn && 'span-nr2'"></span>
            <span :class="animateMenuBtn && 'span-nr3'"></span>
          </button>
        </div>
      </div>
      <transition name="slide">
        <ul v-if="animateMenuBtn" class="flex flex-col gap-8" :style="{ maxHeight: maxHeight }">
          <li>
            <RouterLink to="/" class="text-main flex gap-2 items-center"
              ><fontAwesome :icon="['fas', 'house']" />
              <p>Hem</p></RouterLink
            >
          </li>
          <li>
            <RouterLink to="register" class="text-main flex gap-2 items-center"
              ><fontAwesome :icon="['fas', 'fa-pen']" />
              <p>Registrera</p></RouterLink
            >
          </li>
          <li>
            <RouterLink to="contact" class="text-main flex gap-2 items-center"
              ><fontAwesome :icon="['fas', 'address-book']" />
              <p>Kontakta oss</p></RouterLink
            >
          </li>
          <div class="blue-line mb-0"></div>
          <li>
            <RouterLink to="sign-in" class="text-main flex gap-2 items-center mb-7"
              ><fontAwesome :icon="['fas', 'right-to-bracket']" />
              <p>Logga in</p></RouterLink
            >
          </li>
        </ul>
      </transition>
    </div>
  </div>

  <ConsumerNavMobileMenu></ConsumerNavMobileMenu>
</template>
