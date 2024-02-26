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

const answerData = computed(() => {
  return {
    customerId: props.index.customerId,
    messageId: props.index.messageId,
    customerAnswer: messageAnswer.value,
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
  props.onAnswer(answerData.value)
}
</script>

<template>
  <div class="display-flex flex-dir-col gap-16 margin-tp-16 m-width-100">
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
        <p v-if="isShortMessage">
          {{ `${props.index.customerMessage[0].message.slice(0, 100)}...` }}
        </p>
        <p v-if="!isShortMessage">{{ props.index.customerMessage[0].message }}</p>
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
        <p>{{ props.index.repairShopAnswer[0].message }}</p>
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
    <label for="user-sent-priceOffer" v-if="isMessageBox">Prisförslag</label>
    <input
      v-if="isMessageBox"
      type="text"
      name="priceOffer"
      placeholder="500 kr"
      v-model="priceOffer"
      maxlength="7"
      class="user-sent-price-offer-input"
    />

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
