<script setup lang="ts">
import { useShowRegisterDialog } from '@/stores/showRegisterDialog'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { computed, onMounted, ref } from 'vue'

const navScroll = ref(false)

const isRegister = computed(() => useShowRegisterDialog().isRegisterDialog)
const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)

function showRegisterForm() {
  const showRegisterDialog = useShowRegisterDialog()
  showRegisterDialog.showRegisterDialogForm(!isRegister.value)
}

function showSignInForm() {
  const showSignInDialog = useShowSignInDialog()
  showSignInDialog.showSignInDialogForm(!isSignIn.value)
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
      <RouterLink to="/" class="text-deco-none"
        ><p class="text-deco-none O15rem text-main font-title-black">Ways</p></RouterLink
      >
    </div>
    <div class="nav-child-container center">
      <RouterLink to="/" class="router-link"
        ><fontAwesome :icon="['fas', 'house']" /> Hem</RouterLink
      >
      <RouterLink to="register" class="router-link"
        ><fontAwesome :icon="['fas', 'address-book']" /> Kontakt</RouterLink
      >
      <RouterLink to="register" class="router-link"
        ><fontAwesome :icon="['fas', 'address-card']" /> Om oss</RouterLink
      >
      <RouterLink to="register" class="router-link"
        ><fontAwesome :icon="['fas', 'question']" /> FAQ</RouterLink
      >
    </div>
    <div class="nav-child-container right">
      <button type="button" class="btn-register" @click="showRegisterForm">Registrera</button>
      <button type="button" class="btn-sign-in" @click="showSignInForm">Logga in</button>
    </div>
  </div>
</template>
