<script setup lang="ts">
import { removeUserRequest } from '@/services/removeRequest'
import { computed, nextTick, onMounted, ref } from 'vue'
import ConfirmDialog from '../dialogs/ConfirmDialog.vue'
import UserHomeMessages from './UserHomeMessages.vue'

const props = defineProps({
  index: {
    type: Object,
    required: true
  },
  onAnswer: {
    type: Function,
    required: true
  },
  reFetch: {
    type: Function,
    required: true
  }
})

const messageAnswer = ref('')

const isMessageBox = ref(false)
const isMessageAnswer = ref(false)
const isBtnDisabled = ref(true)
const isConfirmDialog = ref(false)

const inputsArray: { key: string; value: boolean }[] = [{ key: 'isMessageAnswer', value: false }]
const messageArray: { message: string; name: string; date: string }[] = []

const userName = localStorage.getItem('userName')

const answerData = computed(() => {
  return {
    customerAnswer: messageAnswer.value,
    customerId: props.index.customerId,
    messageId: props.index.messageId,
    answeredByRepairShop: false
  }
})

function showMessageBox() {
  isMessageBox.value = !isMessageBox.value
}

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
}

function checkInputDataAnswer() {
  nextTick(() => {
    if (messageAnswer.value === '') {
      return
    } else {
      isMessageAnswer.value = true

      const index = inputsArray.findIndex((field) => field.key === 'isMessageAnswer')

      if (index !== -1) {
        inputsArray[index].value = isMessageAnswer.value
      } else {
        inputsArray.push({ key: 'isMessageAnswer', value: isMessageAnswer.value })
      }

      checkInputData()
    }
  })
}

function sendAnswer() {
  console.log(answerData.value)
  props.onAnswer(answerData.value)
}

onMounted(() => {
  console.log(props.index.priceOffer)
  const flattenedMessages = props.index.customerMessage.concat(props.index.repairShopAnswer)

  flattenedMessages.sort(
    (a: { date: string }, b: { date: string }) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  messageArray.push(...flattenedMessages)
  console.log(messageArray.length)
})

async function removeRequest() {
  const response = await removeUserRequest(answerData.value as object)
  isConfirmDialog.value = false
  props.reFetch(true)
}
</script>

<template>
  <div class="display-flex flex-dir-col margin-tp-16 m-width-100">
    <p>{{ props.index.repairShopName }}</p>

    <div class="user-sent-message-content-container">
      <div class="user-sent-message-content-top-nav p-relative">
        <p class="text-main font-text-light">
          <span class="font-title-bold">Registreringsnummer: </span
          >{{ props.index.registrationNumber }}
        </p>
        <button type="button" class="show-more-btn" @click="showMessageBox">
          <fontAwesome :icon="['fas', 'chevron-down']" v-if="!isMessageBox" />
          <fontAwesome :icon="['fas', 'chevron-up']" v-if="isMessageBox" />
        </button>
        <button
          v-if="isMessageBox"
          type="button"
          class="margin-tp-4 remove-btn text-main display-flex text-main gap-8 align-items-center p-absolute"
          @click="() => (isConfirmDialog = true)"
        >
          <fontAwesome :icon="['fas', 'trash']" />
        </button>
      </div>
      <div class="width-100 margin-tp-32 display-flex flex-dir-col gap-4" v-if="isMessageBox">
        <div
          v-for="index in messageArray"
          :key="index.date"
          class="display-flex flex-dir-col gap-4 margin-bm-4 text-main font-text-light bg-third b-r-10"
        >
          <UserHomeMessages :index="index" :amount="messageArray"></UserHomeMessages>
        </div>
      </div>
      <div class="width-100 margin-tp-8 margin-bm-8">
        <textarea
          v-if="isMessageBox"
          name="message-input"
          v-model="messageAnswer"
          class="textarea-input h-300 margin-tp-8"
          placeholder="Svar"
          @input="checkInputDataAnswer"
        ></textarea>
      </div>
    </div>
    <label for="user-sent-priceOffer" class="margin-bm-4" v-if="isMessageBox">Prisförslag</label>
    <input
      v-if="isMessageBox"
      type="text"
      name="priceOffer"
      :value="props.index.priceOffer === '' ? 'Ej angivet' : props.index.priceOffer"
      maxlength="7"
      class="text-input padding-10 margin-bm-32"
      disabled
    />

    <button
      v-if="isMessageBox"
      type="submit"
      :disabled="isBtnDisabled"
      :class="{
        'main-btn-disabled margin-bm-16': isBtnDisabled,
        'main-btn w-full margin-bm-16': !isBtnDisabled
      }"
      @click="sendAnswer"
    >
      Skicka
    </button>
  </div>
  <div class="line-inactive"></div>
  <ConfirmDialog
    :removeRequest="removeRequest"
    :closeDialog="() => (isConfirmDialog = false)"
    v-if="isConfirmDialog"
  ></ConfirmDialog>
</template>
