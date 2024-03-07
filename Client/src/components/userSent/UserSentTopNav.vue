<script setup lang="ts">
import { computed } from 'vue'

const currentUrl = window.location.href
const userId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)

const userHomeRoute = computed(() => `/user-home/${userId}`)
</script>

<template>
  <div class="user-sent-top-nav">
    <RouterLink :to="userHomeRoute" class="btn-back"
      ><fontAwesome :icon="['fas', 'chevron-left']"
    /></RouterLink>
    <h2>Skickat</h2>
  </div>
</template>
