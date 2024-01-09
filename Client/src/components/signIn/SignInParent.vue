<script setup lang="ts">
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import { computed, onMounted, ref } from 'vue'
import MagicTokenDialog from '../dialogs/MagicTokenDialog.vue'
import SignInFormMobile from './SignInFormMobile.vue'
import SignInFormTablet from './SignInFormTablet.vue'

const isMobileForm = ref(false)
const isTabletForm = ref(false)

let width = document.documentElement.clientWidth

const isMagicTokenDialog = computed(() => useShowMagicTokenDialog().showMagicTokenDialog)

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width < 700) {
    isMobileForm.value = true
    isTabletForm.value = false
  } else {
    isMobileForm.value = false
    isTabletForm.value = true
  }
}

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <MagicTokenDialog v-if="isMagicTokenDialog"></MagicTokenDialog>
  <SignInFormMobile v-if="isMobileForm"></SignInFormMobile>
  <SignInFormTablet v-if="isTabletForm"></SignInFormTablet>
</template>
