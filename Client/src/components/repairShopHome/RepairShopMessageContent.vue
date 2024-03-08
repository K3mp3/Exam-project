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

console.log('hejsan')

const messageAnswer = ref('')
const priceOffer = ref('')

const isMessageBox = ref(false)
const isMessageAnswer = ref(false)
const isBtnDisabled = ref(true)

const inputsArray: { key: string; value: boolean }[] = [{ key: 'isMessageAnswer', value: false }]

const messageArray: { message: string; name: string; date: string }[] = []

const repairShopName = localStorage.getItem('userName')

const answerData = computed(() => {
  return {
    repairShopId: userId.value as unknown as string,
    customerName: props.index.customerName,
    customerId: props.index.customerId,
    messageId: props.index.messageId,
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

  flattenedMessages.sort(
    (a: { date: string }, b: { date: string }) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  messageArray.push(...flattenedMessages)
})
</script>

<template>
  <div class="request-container">
    <p class="customer-name">{{ props.index.customerName }}</p>

    <div class="message-content-parent-container">
      <div class="message-content-top-nav">
        <p><span>Registreringsnummer: </span>{{ props.index.registrationNumber }}</p>
        <button v-if="!isMessageBox" type="button" class="show-more-btn" @click="showMessageBox">
          <fontAwesome :icon="['fas', 'chevron-down']" />
        </button>
        <button v-if="isMessageBox" type="button" class="show-more-btn" @click="showMessageBox">
          <fontAwesome :icon="['fas', 'chevron-up']" />
        </button>
      </div>
      <div class="message-content-text" v-if="isMessageBox">
        <p v-for="index in messageArray" :key="index.date">
          <span :class="repairShopName === index.name ? 'text-active-blue' : ''">{{
            repairShopName === index.name ? 'Du' : index.name
          }}</span
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
    <hr />
  </div>
  <!-- <RepairShopCustomerContent v-if="isMessageBox"></RepairShopCustomerContent> -->
</template>
