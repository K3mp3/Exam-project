<script setup lang="ts">
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import { useShowRegisterDialog } from '@/stores/showRegisterDialog'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { computed, onMounted, ref } from 'vue'
import AccountDialog from '../dialogs/AccountDialog.vue'
import MagicTokenDialog from '../dialogs/MagicTokenDialog.vue'
import RegisterRepairShopDialog from '../registerRepairShop/RegisterRepairShopDialog.vue'
import RegisterDialog from '../register/RegisterDialog.vue'
import SignInDialog from '../signIn/SignInDialog.vue'
import ConsumerNavDesktop from './ConsumerNavDesktop.vue'
import ConsumerNavMobile from './ConsumerNavMobile.vue'

const navMobile = ref(true)
const navDesktop = ref(false)
const isAccountDialog = ref(false)
const isPrivateForm = ref(false)
const isRepairShopForm = ref(false)

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
  isAccountDialog.value = e
}

function showPrivateForm(e: boolean) {
  isPrivateForm.value = e
  isRepairShopForm.value = !e
  isAccountDialog.value = false
}

function showRepairShopForm(e: boolean) {
  isRepairShopForm.value = e
  isPrivateForm.value = !e
  isAccountDialog.value = false
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

  <AccountDialog v-if="isAccountDialog" :showPrivateRegisterDialog="(e: boolean) => showPrivateForm(e)" :showRepairShopRegisterDialog="(e: boolean) => showRepairShopForm(e)" />
  <RegisterDialog v-if="isPrivateForm" :closePrivateRegisterDialog="(e: boolean) => isPrivateForm = e"/> 
  <RegisterRepairShopDialog v-if="isRepairShopForm" :closeRepairShopRegisterDialog="(e: boolean) => isRepairShopForm = e"/>
  <SignInDialog v-if="isSignIn" :loadingState="isMagicTokenDialog"></SignInDialog>
</template>
