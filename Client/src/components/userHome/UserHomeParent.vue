<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BottomNavParent from '../bottomNav/BottomNavParent.vue'
import SideNavParent from '../sideNav/SideNavParent.vue'
import UserContactPage from '../userHome/UserContactPage.vue'

const isSideNav = ref(false)

let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width > 899) {
    isSideNav.value = true
  } else {
    isSideNav.value = false
  }
}

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const fullname = getCookie('name')

const firstName = fullname ? fullname.split(' ')[0] : ''

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <SideNavParent v-if="isSideNav"></SideNavParent>
  <div class="signed-in-header">
    <h2>Hej {{ firstName }}</h2>
  </div>
  <div class="signed-in-main">
    <UserContactPage></UserContactPage>
  </div>
  <BottomNavParent v-if="!isSideNav"></BottomNavParent>
</template>
