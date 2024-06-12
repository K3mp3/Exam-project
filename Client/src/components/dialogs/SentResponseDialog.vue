<script setup lang="ts">
const props = defineProps({
  isConfirmationSuccess: {
    type: Boolean,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div
    class="w-screen h-screen bg-main-90 z-50 fixed flex text-main p-4 sm:p-8 md:p-16 items-center justify-center fixed top-0 left-0"
  >
    <div class="confirmation-box z-[60]">
      <fontAwesome :icon="['fas', 'check']" class="text-main font-title-bold O35rem" />
      <p class="text-main font-title-bold O1rem">{{ props.text }}</p>
    </div>
  </div>
</template>
