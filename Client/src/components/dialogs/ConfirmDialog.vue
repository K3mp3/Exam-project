<script setup lang="ts">
const props = defineProps({
  removeRequest: {
    type: Function,
    required: true
  },
  closeDialog: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div
    class="width-100 height-100vh bg-main-90 p-absolute top-0 left-0 z-index-2 padding-16 display-flex align-items-center justify-center"
  >
    <div
      class="confirmation-box-error width-100 padding-16 display-flex align-items-center justify-center flex-dir-col m-width-330px"
    >
      <p>
        <span class="font-title-bold">Vill du verkligen radera konversationen?</span> <br />
        Den kommer inte gå att återställa igen.
      </p>
      <div class="display-flex gap-16 width-100">
        <button
          class="filled-btn text-main font-text-light h-42px display-flex gap-8 align-items-center justify-center width-100"
          @click="props.removeRequest(true)"
        >
          <fontAwesome :icon="['fas', 'trash']" /> Radera
        </button>
        <button
          class="outline-btn text-main font-text-light width-100"
          @click="props.closeDialog(true)"
        >
          Tillbaka
        </button>
      </div>
    </div>
  </div>
</template>
