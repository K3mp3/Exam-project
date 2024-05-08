<script setup lang="ts">
const props = defineProps({
  isConfirmationSuccess: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div
    class="w-full h-full radius-10 bg-main-90 z-50 absolute flex flex-col gap-12 text-main p-8 items-center justify-center"
  >
    <div class="confirmation-box" v-if="props.isConfirmationSuccess">
      <fontAwesome :icon="['fas', 'check']" class="text-main font-title-bold O35rem" />
      <p class="text-main font-title-bold O1rem">Ditt konto är nu skapat!</p>
    </div>
  </div>
</template>
