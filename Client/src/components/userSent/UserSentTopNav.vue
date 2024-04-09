<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isRepairShop = ref(false)

const currentUrl = window.location.href
const userId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)

onMounted(() => {
  isRepairShop.value = !!localStorage.getItem('isRepairShop')
})
</script>

<template>
  <div class="user-sent-top-nav">
    <RouterLink
      :to="isRepairShop ? `/repair-shop-home/${userId}` : `/user-home/${userId}`"
      class="btn-back"
      ><fontAwesome :icon="['fas', 'chevron-left']"
    /></RouterLink>
    <h2>Skickat</h2>
  </div>
</template>
