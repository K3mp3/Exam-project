<script setup lang="ts">
import type { IMessage } from '@/models/IMessage'
import { contactVibe } from '@/services/contactVibe'
import { onMounted, ref } from 'vue'
import ContactFormMobile from './ContactFormMobile.vue'
import ContactFormTablet from './ContactFormTablet.vue'

const RESPONSE_SUCCESS = 201
const RESPONSE_ERROR = 500

const mobile = ref(true)
const tablet = ref(false)
const desktop = ref(false)
const isConfirmation = ref(false)
const isConfirmationError = ref(false)

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 1281) {
    desktop.value = true
    tablet.value = false
    mobile.value = false
  } else if (
    document.documentElement.clientWidth > 699 &&
    document.documentElement.clientWidth < 1482
  ) {
    tablet.value = true
    desktop.value = false
    mobile.value = false
  } else if (document.documentElement.clientWidth < 700) {
    mobile.value = true
    desktop.value = false
    tablet.value = false
  }
}

async function handleMessage(messageData: IMessage) {
  const response = await contactVibe(messageData)

  if (response === RESPONSE_SUCCESS) {
    isConfirmation.value = true

    setTimeout(() => {
      isConfirmation.value = false
    }, 4000)
  } else if (response === RESPONSE_ERROR) {
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
