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

async function showSignInForm() {
  const showSignInDialog = useShowSignInDialog()
  showSignInDialog.showSignInDialogForm(!isSignIn.value)
}

window.addEventListener('scroll', changeNavColor)

function changeNavColor() {
  if (document.documentElement.scrollTop > 135) navScroll.value = true
  else {
    navScroll.value = false
  }
}

onMounted(() => {
  changeNavColor()
})
</script>

<template>
  <div class="w-screen p-8">
    <div class="flex flex-row px-8 py-4 rounded-lg border-main bg-main-40 backdrop-blur-sm gap-4">
      <div class="w-full">
        <RouterLink to="/" class="text-deco-none"
          ><p class="text-deco-none O15rem text-main font-title-black">Vibe</p></RouterLink
        >
      </div>
      <div class="w-full text-main flex gap-8 items-center justify-center">
        <RouterLink to="/" class="router-link"
          ><fontAwesome :icon="['fas', 'house']" /> Hem</RouterLink
        >
        <RouterLink to="contact" class="router-link"
          ><fontAwesome :icon="['fas', 'address-book']" /> Kontakt</RouterLink
        >
      </div>
      <div class="w-full flex gap-4 items-center justify-end">
        <button type="button" class="outline-btn text-main px-8 h-8" @click="showRegisterForm">
          Registrera
        </button>
        <button type="button" class="main-btn text-main px-8 h-8" @click="showSignInForm">
          Logga in
        </button>
      </div>
    </div>
  </div>
</template>
