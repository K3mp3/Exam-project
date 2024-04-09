<script setup lang="ts">
import { removeUserRequest } from '@/services/removeRequest'
import { computed, ref } from 'vue'

const props = defineProps({
  requests: {
    type: Object,
    required: true
  },
  onFilter: {
    type: Function,
    required: true
  }
})

const isMessageBox = ref(false)

const requestData = computed(() => {
  return {
    customerId: props.requests.customerId,
    messageId: props.requests.messageId,
    customerName: props.requests.customerName,
    answeredByRepairShop: false
  }
})

function showMessageBox() {
  isMessageBox.value = !isMessageBox.value
}

async function removeRequest() {
  await removeUserRequest(requestData.value as object)
  props.onFilter(true)
}
</script>

<template>
  <div class="display-flex flex-dir-col margin-tp-16 m-width-100 p-relative">
    <p class="text-main font-text-light">
      <span class="font-title-bold">Registreringsnummer: </span
      >{{ props.requests.registrationNumber }}
    </p>
    <button type="button" class="show-more-btn" @click="showMessageBox">
      <fontAwesome :icon="['fas', 'chevron-down']" v-if="!isMessageBox" />
      <fontAwesome :icon="['fas', 'chevron-up']" v-if="isMessageBox" />
    </button>
  </div>

  <div class="width-100 display-flex flex-dir-col gap-12" v-if="isMessageBox">
    <button
      type="button"
      class="remove-btn text-main width-100 display-flex"
      @click="removeRequest"
      v-if="isMessageBox"
    >
      <fontAwesome :icon="['fas', 'trash']" />
    </button>
    <div class="margin-bm-4 text-main font-text-light bg-third b-r-10">
      <p
        class="padding-8-16 display-flex flex-dir-col gap-4 margin-bm-4 text-main font-text-light bg-third b-r-10 p-relative"
      >
        {{ props.requests.customerMessage[0].message }}
      </p>
    </div>
  </div>
  <div class="line-inactive"></div>
</template>
