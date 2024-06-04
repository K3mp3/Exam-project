<script setup lang="ts">
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import { useShowRegisterDialog } from '@/stores/showRegisterDialog'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { computed, onMounted, ref } from 'vue'
import AccountDialog from '../dialogs/AccountDialog.vue'
import MagicTokenDialog from '../dialogs/MagicTokenDialog.vue'
import RegisterRepairShopDialog from '../registerRepairShop/RegisterRepairShopDialog.vue'
import SignInDialog from '../signIn/SignInDialog.vue'
import ConsumerNavDesktop from './ConsumerNavDesktop.vue'
import ConsumerNavMobile from './ConsumerNavMobile.vue'

const navMobile = ref(true)
const navDesktop = ref(false)
const isRepairShopDialog = ref(false)

const isRegister = computed(() => useShowRegisterDialog().isRegisterDialog)
const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)
const isMagicTokenDialog = computed(() => useShowMagicTokenDialog().showMagicTokenDialog)
let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width > 1279) {
    navDesktop.value = true
    navMobile.value = false
    return
  } else {
    navDesktop.value = false
    navMobile.value = true
  }
}

function showAccountDialog(e: boolean) {
  console.log(e)
}

// v-if="navDesktop"

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <MagicTokenDialog v-if="isMagicTokenDialog"></MagicTokenDialog>
  <ConsumerNavMobile v-if="navMobile"></ConsumerNavMobile>
  <ConsumerNavDesktop :isAccountDialogOpen="(e: boolean) => showAccountDialog(e)" />

  <AccountDialog v-if="isRegister" />
  <!-- <RegisterDialog /> -->
  <RegisterRepairShopDialog v-if="isRepairShopDialog"></RegisterRepairShopDialog>
  <SignInDialog v-if="isSignIn" :loadingState="isMagicTokenDialog"></SignInDialog>
</template>
