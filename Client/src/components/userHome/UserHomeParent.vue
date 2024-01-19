<script setup lang="ts">
import BottomNavParent from '../bottomNav/BottomNavParent.vue'
import UserContactPage from '../userHome/UserContactPage.vue'

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
</script>

<template>
  <div class="signed-in-header">
    <h2>Hej {{ firstName }}</h2>
  </div>
  <div class="signed-in-main">
    <UserContactPage></UserContactPage>
  </div>
  <BottomNavParent></BottomNavParent>
</template>
