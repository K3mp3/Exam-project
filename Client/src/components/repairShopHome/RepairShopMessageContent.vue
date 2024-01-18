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
const isMessageAnswer = ref(false)
const isBtnDisabled = ref(true)
const showDialog = ref(false)

const inputsArray: { key: string; value: boolean }[] = [{ key: 'isMessageAnswer', value: false }]

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const repairShopEmail = getCookie('email')

const answerData = computed(() => {
  return {
    customerName: props.index.name,
    customerId: props.index._id,
    customerEmail: props.index.email,
    repairShopEmail: repairShopEmail,
    customerMessage: messageAnswer.value,
    priceOffer: priceOffer.value,
    registrationNumber: props.index.registrationNumber
  }
})

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

function showMessageBox() {
  isMessageBox.value = !isMessageBox.value
}

function sendAnswer() {
  console.log(answerData.value)
  props.onAnswer(answerData.value)
}
</script>

<template>
  <div class="request-container">
    <p class="customer-name">{{ props.index.name }}</p>

    <div class="message-content-parent-container">
      <div class="message-content-top-nav">
        <p>
          <span v-if="isMessageBox">Registreringsnummer: </span>{{ props.index.registrationNumber }}
        </p>
        <button v-if="!showDialog" type="button" class="show-more-btn" @click="showMessageBox">
          <fontAwesome :icon="['fas', 'chevron-down']" />
        </button>
      </div>
      <div class="message-content-text" v-if="isMessageBox">
        <p>{{ props.index.message }}</p>
        <hr />
      </div>
      <div class="message-content-answer">
        <textarea
          v-if="isMessageBox"
          name="message-input"
          v-model="messageAnswer"
          class="text-editor-answer"
          placeholder="Svar"
          @input="checkInputDataAnswer"
        ></textarea>
      </div>
    </div>

    <label for="priceOffer" v-if="isMessageBox">Prisförslag</label>
    <input
      v-if="isMessageBox"
      type="text"
      name="priceOffer"
      placeholder="500 kr"
      v-model="priceOffer"
      maxlength="7"
      class="price-offer-input"
    />

    <button
      v-if="isMessageBox"
      type="submit"
      :disabled="isBtnDisabled"
      :class="{
        'repair-shop-home-send-btn-disabled': isBtnDisabled,
        'repair-shop-home-send-btn': !isBtnDisabled
      }"
      @click="sendAnswer"
    >
      Skicka
    </button>
  </div>
</template>
