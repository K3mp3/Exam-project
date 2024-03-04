<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UserSentTopNav from './UserSentTopNav.vue'
const desktop = ref(false)

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 1639) desktop.value = true
  else desktop.value = false
}

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <SideNavParent v-if="desktop" :signOutFunction="changeUserSignInStatus"></SideNavParent>
  <UserSentTopNav></UserSentTopNav>
</template>
