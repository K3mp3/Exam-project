<script setup lang="ts">
import { onMounted, ref } from 'vue'

const mobile = ref(true)
const tablet = ref(false)

let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width < 700) {
    mobile.value = true
    tablet.value = false
  } else {
    mobile.value = false
    tablet.value = true
  }
}

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <h2 class="text-xl sm:text-2xl text-center">Öka antalet kunder som verkstad</h2>

  <div class="graph-container">
    <div class="graph graph-1"></div>
    <div class="graph graph-2"></div>
    <div class="graph graph-3"></div>
    <div class="graph graph-4"></div>
    <div class="graph graph-5"></div>
  </div>
</template>
