<script setup lang="ts">
const props = defineProps({
  hideDialog: Boolean
})

const emits = defineEmits<{
  (e: 'cookieDialogClosed', open: Boolean): void
}>()

function acceptCookies() {
  document.cookie = `accept=${true}`
  emits('cookieDialogClosed', false)
}

function declineCookies() {
  document.cookie = `accept=${false}`
  emits('cookieDialogClosed', false)
}
</script>

<template>
  <div class="cookie-dialog-background">
    <div class="cookie-dialog-container">
      <div class="cookie-dialog-text-container">
        <h3 class="text-main font-title-bold">Cookies</h3>
        <p class="text-main font-text-light">
          Vi använder cookies för att personifera innehåll och tillhandahålla en bättre upplevelse.
          Genom att klicka på acceptera godkänner du att vi använder oss av cookies.
        </p>
      </div>
      <div class="cookie-dialog-button-container">
        <button type="button" class="filled-btn font-text-light padding-6" @click="acceptCookies">
          Tillåt
        </button>
        <button
          type="button"
          class="outline-btn text-main font-text-light padding-6"
          @click="declineCookies"
        >
          Tillåt inte
        </button>
      </div>
    </div>
  </div>
</template>
