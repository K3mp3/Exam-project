<script setup lang="ts">
import router from '@/router'
import { computed, nextTick, onMounted, ref } from 'vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

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

const messageArray: { message: string; name: string; date: string }[] = []

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const repairShopEmail = getCookie('email')
const repairShopName = getCookie('name')

const answerData = computed(() => {
  return {
    repairShopId: userId.value as unknown as string,
    customerName: props.index.customerName,
    customerId: props.index.customerId,
    customerEmail: props.index.customerEmail,
    customerMessage: props.index.customerMessage[0].message,
    customerMessageDate: props.index.customerMessage[0].date,
    repairShopAnswer: messageAnswer.value,
    priceOffer: priceOffer.value,
    location: props.index.location,
    registrationNumber: props.index.registrationNumber,
    troubleshootTime: props.index.troubleshootTime,
    answeredByRepairShop: true
  }
})

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

function showMessageBox() {
  isMessageBox.value = !isMessageBox.value
}

function sendAnswer() {
  props.onAnswer(answerData.value)
}

onMounted(() => {
  const flattenedMessages = props.index.customerMessage.concat(props.index.repairShopAnswer)

  // Sort the flattened array based on the date property
  flattenedMessages.sort(
    (a: { date: string }, b: { date: string }) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  // Push the sorted messages back into messageArray
  messageArray.push(...flattenedMessages)

  console.log(messageArray)
})
</script>

<template>
  <div class="request-container">
    <p class="customer-name">{{ props.index.customerName }}</p>

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
        <p v-for="index in messageArray" :key="index.date">
          <span>{{ index.name }}</span
          >{{ index.message }}
        </p>
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
