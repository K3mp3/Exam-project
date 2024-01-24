<script setup lang="ts">
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import { useShowRegisterDialog } from '@/stores/showRegisterDialog'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { useShowRepairShopDialog } from '@/stores/useShowRepairShopDialog'
import { computed, onMounted, ref } from 'vue'
import MagicTokenDialog from '../dialogs/MagicTokenDialog.vue'
import RegisterDialog from '../register/RegisterDialog.vue'
import RegisterRepairShopDialog from '../registerRepairShop/RegisterRepairShopDialog.vue'
import SignInDialog from '../signIn/SignInDialog.vue'
import ConsumerNavDesktop from './ConsumerNavDesktop.vue'
import ConsumerNavMobile from './ConsumerNavMobile.vue'
import ConsumerNavTablet from './ConsumerNavTablet.vue'

const navMobile = ref(true)
const navTablet = ref(false)
const navDesktop = ref(false)

const isRepairShopDialog = computed(() => useShowRepairShopDialog().isRepairShopDialog)
const isRegister = computed(() => useShowRegisterDialog().isRegisterDialog)
const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)
const isMagicTokenDialog = computed(() => useShowMagicTokenDialog().showMagicTokenDialog)
let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width < 700) {
    navMobile.value = true

    navTablet.value = false
    navDesktop.value = false
    return
  }

  if (width > 1481) {
    navDesktop.value = true
    navTablet.value = false
    navMobile.value = false
    return
  } else {
    navDesktop.value = false
  }

  if (width > 699) {
    navTablet.value = true
    navMobile.value = false
  } else {
    navTablet.value = false
  }
}

onMounted(() => {
  updateScreenSize()
  console.log(isMagicTokenDialog)
})
</script>

<template>
  <MagicTokenDialog v-if="isMagicTokenDialog"></MagicTokenDialog>
  <ConsumerNavMobile v-if="navMobile"></ConsumerNavMobile>
  <ConsumerNavTablet v-if="navTablet"></ConsumerNavTablet>
  <ConsumerNavDesktop v-if="navDesktop"></ConsumerNavDesktop>

  <RegisterDialog v-if="isRegister"></RegisterDialog>
  <RegisterRepairShopDialog v-if="isRepairShopDialog"></RegisterRepairShopDialog>
  <SignInDialog v-if="isSignIn"></SignInDialog>
</template>
