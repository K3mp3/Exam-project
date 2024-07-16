<script setup lang="ts">
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import { computed, ref } from 'vue'
import MagicTokenDialog from '../dialogs/MagicTokenDialog.vue'
import SignInFormMobile from './SignInFormMobile.vue'

const isMobileForm = ref(false)

const isMagicTokenDialog = computed(() => useShowMagicTokenDialog().showMagicTokenDialog)
</script>

<template>
  <MagicTokenDialog v-if="isMagicTokenDialog"></MagicTokenDialog>
  <SignInFormMobile />
</template>
