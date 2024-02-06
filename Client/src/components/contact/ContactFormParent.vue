<script setup lang="ts">
import type { IMessage } from '@/models/IMessage'
import { contactVibe } from '@/services/contactVibe'
import { onMounted, ref } from 'vue'
import ContactFormMobile from './ContactFormMobile.vue'
import ContactFormTablet from './ContactFormTablet.vue'

const TABLET_BREAKPOINT = 699
const DESKTOP_BREAKPOINT = 1481

const mobile = ref(true)
const tablet = ref(false)
const desktop = ref(false)
const isConfirmation = ref(false)
const isConfirmationError = ref(false)

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > DESKTOP_BREAKPOINT) {
    desktop.value = true
    tablet.value = false
    mobile.value = false
  } else if (
    document.documentElement.clientWidth > TABLET_BREAKPOINT &&
    document.documentElement.clientWidth < DESKTOP_BREAKPOINT
  ) {
    tablet.value = true
    desktop.value = false
    mobile.value = false
  } else if (document.documentElement.clientWidth < TABLET_BREAKPOINT + 1) {
    mobile.value = true
    desktop.value = false
    tablet.value = false
  }
}

async function handleMessage(messageData: Object) {
  const castedMessage = messageData as IMessage
  const response = await contactVibe(castedMessage)

  if (response === 201) {
    isConfirmation.value = true

    setTimeout(() => {
      isConfirmation.value = false
    }, 4000)
  } else if (response === 500) {
    isConfirmationError.value = true

    setTimeout(() => {
      isConfirmationError.value = false
    }, 4000)
  }
}

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <ContactFormMobile v-if="mobile" :userMessage="handleMessage"></ContactFormMobile>
  <ContactFormTablet v-if="tablet || desktop" :userMessage="handleMessage"></ContactFormTablet>

  <div class="confirmation-box-background" v-if="isConfirmation || isConfirmationError">
    <div class="confirmation-box" v-if="isConfirmation">
      <fontAwesome :icon="['fas', 'check']" class="text-main font-title-bold O35rem" />
      <p class="text-main font-title-bold O1rem">Email skickat!</p>
    </div>

    <div class="confirmation-box-error" v-if="isConfirmationError">
      <fontAwesome :icon="['fas', 'x']" class="text-main font-title-bold O35rem" />
      <p class="text-main font-title-bold O1rem">Email kunde ej skickas!</p>
    </div>
  </div>
</template>
