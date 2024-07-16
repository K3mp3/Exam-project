<script setup lang="ts">
import router from '@/router'

const props = defineProps({
  userId: {
    type: [String, Array],
    required: true
  }
})

function handleReturnClick() {
  router.push(`/user-home/${props.userId}`)
}
</script>

<template>
  <div class="new-request-top-nav">
    <button type="button" class="btn-back" @click="handleReturnClick">
      <fontAwesome :icon="['fas', 'chevron-left']" />
    </button>
    <h2 class="text-xl sm:text-2xl">Kontakta verkstäder</h2>
  </div>
</template>
