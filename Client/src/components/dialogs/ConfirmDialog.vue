<script setup lang="ts">
const props = defineProps({
  removeRequest: {
    type: Function,
    required: true
  },
  closeDialog: {
    type: Function,
    required: true
  },
  heading: {
    type: String,
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
    class="w-full h-screen bg-main-90 absolute top-0 left-0 z-index-2 p-4 flex items-center justify-center"
  >
    <div
      class="confirmation-box-error w-full p-4 flex items-center justify-center flex-col max-w-[330px]"
    >
      <p class="text-center">
        <span class="font-title-bold">{{ props.heading }}</span> <br />
        {{ props.text }}
      </p>

      <div class="flex gap-5">
        <button
          class="main-btn-white px-5 text-main font-text-light h-42px flex gap-2 items-center justify-center w-full"
          @click="props.removeRequest(true)"
        >
          <fontAwesome :icon="['fas', 'trash']" /> Radera
        </button>
        <button
          class="outline-btn px-5 text-main font-text-light w-full"
          @click="props.closeDialog(true)"
        >
          Tillbaka
        </button>
      </div>
    </div>
  </div>
</template>
