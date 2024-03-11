<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'

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

const inputsArray: { key: string; value: boolean }[] = [{ key: 'isMessageAnswer', value: false }]
const messageArray: { message: string; name: string; date: string }[] = []

const userName = localStorage.getItem('userName')

const answerData = computed(() => {
  return {
    customerId: props.index.customerId,
    messageId: props.index.messageId,
    answeredByRepairShop: false
  }
})

function showMessageBox() {
  console.log('hejsan')
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
      </div>
      <div class="width-100 margin-tp-10 display-flex flex-dir-col gap-4" v-if="isMessageBox">
        <p
          v-for="index in messageArray"
          :key="index.date"
          class="padding-8-16 display-flex flex-dir-col gap-4 margin-bm-4 text-main font-text-light bg-third b-r-10"
        >
          <span
            :class="userName === index.name ? 'text-active-blue' : 'text-third font-text-light'"
            >{{ userName === index.name ? 'Du' : index.name }}</span
          >{{ index.message }}
        </p>
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
  <div class="line-inactive"></div>
</template>
