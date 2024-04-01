<script setup lang="ts">
import router from '@/router'

function handleReturnClick() {
  router.push('/')
}
</script>

<template>
  <div class="new-request-top-nav">
    <button type="button" class="btn-back" @click="handleReturnClick">
      <fontAwesome :icon="['fas', 'chevron-left']" />
    </button>
    <h3>Kontakta verkstäder</h3>
  </div>
</template>
