<script setup lang="ts">
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import { useShowRegisterDialog } from '@/stores/showRegisterDialog'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { computed, nextTick, onMounted, ref } from 'vue'
import { handleAutomaticSignIn } from '../signIn/automaticSignIn.ts'

const navScroll = ref(false)

const isRegister = computed(() => useShowRegisterDialog().isRegisterDialog)
const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)

function showRegisterForm() {
  const showRegisterDialog = useShowRegisterDialog()
  showRegisterDialog.showRegisterDialogForm(!isRegister.value)
}

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const userEmail = getCookie('email') || ''

async function showSignInForm() {
  if (await handleAutomaticSignIn()) {
    const showMagicTokenDialog = useShowMagicTokenDialog()
    showMagicTokenDialog.showMagicTokenInput(true, userEmail)
  } else {
    const showSignInDialog = useShowSignInDialog()
    showSignInDialog.showSignInDialogForm(!isSignIn.value)
  }
}

window.addEventListener('scroll', changeNavColor)

function changeNavColor() {
  if (document.documentElement.scrollTop > 200) navScroll.value = true
  else {
    navScroll.value = false
  }
}

function scrollToFaqSection() {
  if (faqSection) {
    console.log('qawbejid')
    faqSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  changeNavColor()

  nextTick(() => {
    const faqSection = document.getElementById('faq-component')
    console.log(faqSection)
  })
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
      <RouterLink to="contact" class="router-link"
        ><fontAwesome :icon="['fas', 'address-book']" /> Kontakt</RouterLink
      >
      <RouterLink to="register" class="router-link"
        ><fontAwesome :icon="['fas', 'address-card']" /> Om oss</RouterLink
      >
    </div>
    <div class="nav-child-container right">
      <button type="button" class="btn-register" @click="showRegisterForm">Registrera</button>
      <button type="button" class="btn-sign-in" @click="showSignInForm">Logga in</button>
    </div>
  </div>
</template>
../signIn/automaticSignIn.ts
