<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RegisterFormMobile from './RegisterFormMobile.vue'
import RegisterFormTablet from './RegisterFormTablet.vue'

const isMobileForm = ref(false)
const isTabletForm = ref(false)

let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width < 640) {
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
  <RegisterFormMobile v-if="isMobileForm"></RegisterFormMobile>
  <RegisterFormTablet v-if="isTabletForm"></RegisterFormTablet>
</template>
