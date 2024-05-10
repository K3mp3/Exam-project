<script setup lang="ts">
import { useShowMobileNavMenu } from '@/stores/showMobileNavMenuStore'
import { computed, ref } from 'vue'

const isMenuOpen = computed(() => useShowMobileNavMenu().showMenu)
const contact = ref(false)

function closeNavMenu() {
  const showMobileNavMenu = useShowMobileNavMenu()
  showMobileNavMenu.showNavMenu(!isMenuOpen.value)
}

function getCurrentUrl() {
  return window.location.href
}

console.log(getCurrentUrl())

function getClassNames() {
  const url = getCurrentUrl()
  switch (true) {
    case url.includes('contact'):
      return { bg: 'bg-light-gray', text: 'text-active-blue' }
    case url.includes('sign-in'):
      return { bg: 'bg-light-gray', text: 'text-active-blue' }
    case url.includes('register'):
      return { bg: 'bg-light-gray', text: 'text-active-blue' }
    default:
      return { bg: '', text: 'text-main' }
  }
}
</script>

<template>
  <div
    class="absolute w-screen h-screen top-0 left-0 bg-main-90 flex justify-end"
    v-if="isMenuOpen"
  >
    <ul class="w-screen flex flex-col gap-8 py-4 h-screen bg-gray">
      <div class="mt-16 flex flex-col gap-8">
        <li
          :class="[
            'flex items-center justify-between py-3 px-4 w-[94%] rounded-r-lg',
            getClassNames().bg
          ]"
        >
          <RouterLink
            to="/"
            :class="['flex gap-2 items-center', getClassNames().text]"
            @click="closeNavMenu"
            ><fontAwesome :icon="['fas', 'house']" />
            <p>hem</p></RouterLink
          >
          <fontAwesome :icon="['fas', 'chevron-right']" :class="getClassNames().text" />
        </li>

        <li
          :class="[
            'flex items-center justify-between py-3 px-4 w-[94%] rounded-r-lg',
            getClassNames().bg
          ]"
        >
          <RouterLink
            to="sign-in"
            :class="['flex gap-2 items-center', getClassNames().text]"
            @click="closeNavMenu"
            ><fontAwesome :icon="['fas', 'right-to-bracket']" />
            <p>Logga in</p></RouterLink
          >
          <fontAwesome :icon="['fas', 'chevron-right']" :class="getClassNames().text" />
        </li>

        <li
          :class="[
            'flex items-center justify-between py-3 px-4 w-[94%] rounded-r-lg',
            getClassNames().bg
          ]"
        >
          <RouterLink
            to="register"
            :class="['flex gap-2 items-center', getClassNames().text]"
            @click="closeNavMenu"
            ><fontAwesome :icon="['fas', 'fa-pen']" />
            <p>Registera</p></RouterLink
          >
          <fontAwesome :icon="['fas', 'chevron-right']" :class="getClassNames().text" />
        </li>

        <li
          :class="[
            'flex items-center justify-between py-3 px-4 w-[94%] rounded-r-lg',
            getClassNames().bg
          ]"
        >
          <RouterLink
            to="contact"
            :class="['flex gap-2 items-center', getClassNames().text]"
            @click="closeNavMenu"
            ><fontAwesome :icon="['fas', 'address-book']" />
            <p>Kontakta oss</p></RouterLink
          >
          <fontAwesome :icon="['fas', 'chevron-right']" :class="getClassNames().text" />
        </li>
        <!-- <div class="blue-line mb-0"></div> -->
      </div>
    </ul>
  </div>
</template>
