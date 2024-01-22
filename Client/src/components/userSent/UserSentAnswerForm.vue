<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

const props = defineProps({
  index: {
    type: Object,
    required: true
  },
  onAnswer: {
    type: Function,
    required: true
  }
})

const messageAnswer = ref('')
const priceOffer = ref('')

const isMessageBox = ref(false)
const isShortMessage = ref(true)
const isMessageAnswer = ref(false)
const isBtnDisabled = ref(true)

const inputsArray: { key: string; value: boolean }[] = [{ key: 'isMessageAnswer', value: false }]

console.log(props.index)

const answerData = computed(() => {
  return {
    customerName: props.index.name,
    customerId: props.index._id,
    customerEmail: props.index.email,
    repairShopEmail: props.index.repairShopEmail,
    repairShopName: props.index.repairShopName,
    customerMessage: props.index.message,
    repairShopAnswer: messageAnswer.value,
    priceOffer: priceOffer.value,
    registrationNumber: props.index.registrationNumber
  }
})

function showMessageBox() {
  isMessageBox.value = !isMessageBox.value
}

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
  console.log(isBtnDisabled.value)
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
</script>

<template>
  <div class="user-sent-answer-form-container">
    <p>{{ props.index.repairShopName }}</p>

    <div class="user-sent-message-content-container">
      <div class="user-sent-message-content-top-nav">
        <p>
          <span v-if="isMessageBox">Registreringsnummer: </span>{{ props.index.registrationNumber }}
        </p>
        <button type="button" class="show-more-btn" @click="showMessageBox">
          <fontAwesome :icon="['fas', 'chevron-down']" />
        </button>
      </div>
      <div class="user-sent-old-message-content-text" v-if="isMessageBox">
        <p v-if="isShortMessage">{{ `${props.index.customerMessage.slice(0, 100)}...` }}</p>
        <p v-if="!isShortMessage">{{ props.index.customerMessage }}</p>
        <button
          v-if="isShortMessage"
          type="button"
          class="old-message-show-btn"
          @click="isShortMessage = !isShortMessage"
        >
          <fontAwesome :icon="['fas', 'chevron-down']" /> Se mer
        </button>
        <button
          v-if="!isShortMessage"
          type="button"
          class="old-message-show-btn"
          @click="isShortMessage = !isShortMessage"
        >
          <fontAwesome :icon="['fas', 'chevron-up']" /> stäng
        </button>
        <hr />
      </div>
      <div class="repair-shop-sent-message-content-text" v-if="isMessageBox">
        <p>{{ props.index.repairShopAnswer }}</p>
        <hr />
      </div>
      <div class="user-sent-message-content-answer">
        <textarea
          v-if="isMessageBox"
          name="message-input"
          v-model="messageAnswer"
          class="user-sent-text-editor-answer"
          placeholder="Svar"
          @input="checkInputDataAnswer"
        ></textarea>
      </div>
    </div>
    <button
      v-if="isMessageBox"
      type="submit"
      :disabled="isBtnDisabled"
      :class="{
        'user-sent-btn-disabled': isBtnDisabled,
        'user-sent-btn': !isBtnDisabled
      }"
      @click="sendAnswer"
    >
      Skicka
    </button>
  </div>
</template>
