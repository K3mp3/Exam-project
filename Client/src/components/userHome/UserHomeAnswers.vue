<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { answerRepairShops } from '@/services/userContact'
import { onMounted, ref } from 'vue'
import UserHomeAnswerForm from './UserHomeAnswerForm.vue'
import UserHomeMessages from './UserHomeMessages.vue'
import UserHomeAnswerFormTablet from './tablet/UserHomeAnswerFormTablet.vue'

const mobile = ref(true)
const tablet = ref(false)
const isData = ref(false)

const isActive = ref('')

let activeMessageId = ''

const allRepairShopAnswers = ref<IUserContact[]>([])
const requestData = ref<IUserContact[]>([])
const messageArray = ref<{ message: string; name: string; date: string }[]>([])

const customerEmail = localStorage.getItem('userEmail')

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 699) {
    tablet.value = true
    mobile.value = false
  }

  if (document.documentElement.clientWidth < 700) {
    mobile.value = true
    tablet.value = false
  }
}

async function getAnswers() {
  const allResponses = await removedAnsweredRequests()
  allRepairShopAnswers.value = allResponses.map((response: []) => ({
    ...response,
    isLineActive: false
  }))

  console.log(allRepairShopAnswers.value)

  allRepairShopAnswers.value = allRepairShopAnswers.value.filter(
    (answer) => answer.customerEmail === customerEmail && answer.answeredByRepairShop === true
  )
}

async function handleAnswer(answerData: object) {
  console.log(answerData)
  const response = await answerRepairShops(answerData as IUserContact)
}

function activeLine(messageId: string) {
  if (activeMessageId) {
    const activeAnswer = allRepairShopAnswers.value.find((answer) => answer._id === activeMessageId)
    if (activeAnswer) {
      activeAnswer.isLineActive = false
    }
  }

  const clickedAnswer = allRepairShopAnswers.value.find((answer) => answer._id === messageId)
  if (clickedAnswer) {
    clickedAnswer.isLineActive = true
    activeMessageId = messageId // Update the active messageId
  }
}

async function showRequestData(
  customerMessage: { message: string; name: string; date: string }[],
  repairShopAnswer: { message: string; name: string; date: string }[],
  index: any
) {
  const foundAnswer = allRepairShopAnswers.value.find((answer) => answer._id === index)
  if (foundAnswer) {
    requestData.value = [foundAnswer]

    sortRequestData(customerMessage, repairShopAnswer)
  } else {
    console.log('Answer not found!')
  }
}

function sortRequestData(
  customerMessage: { message: string; name: string; date: string }[],
  repairShopAnswer: { message: string; name: string; date: string }[]
) {
  const flattenedMessages = customerMessage.concat(repairShopAnswer)

  flattenedMessages.sort(
    (a: { date: string }, b: { date: string }) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  messageArray.value = flattenedMessages

  isData.value = true
}

onMounted(() => {
  getAnswers()
  updateScreenSize()
})
</script>

<template>
  <div class="request-form-main">
    <form @submit.prevent="" class="user-sent-answer-form-mobile" v-if="mobile">
      <UserHomeAnswerForm
        v-for="index in allRepairShopAnswers"
        :key="index._id"
        :index="index"
        :onAnswer="handleAnswer"
      ></UserHomeAnswerForm>
    </form>
    <form @submit.prevent="" class="user-sent-answer-form" v-if="tablet">
      <div class="request-column">
        <UserHomeAnswerFormTablet
          v-for="index in allRepairShopAnswers"
          :key="index._id"
          :index="index"
          :onAnswer="handleAnswer"
          :onActive="activeLine"
          @showMore="showRequestData"
        ></UserHomeAnswerFormTablet>
      </div>
      <div class="data-column">
        <div
          class="data-container-tablet"
          v-for="index in requestData"
          :key="index._id"
          v-if="isData"
        >
          <p class="text-main font-text-light">{{ index.repairShopName }}</p>
          <p class="text-main font-text-light">
            <span class="text-main font-title-bold">Registreringsnummer: </span
            >{{ index.registrationNumber }}
          </p>

          <div class="data-column-message-container">
            <UserHomeMessages
              v-for="index in messageArray"
              :key="index.date"
              :index="index"
              :amount="messageArray"
            ></UserHomeMessages>

            <textarea
              name="message-input"
              v-model="messageAnswer"
              class="text-editor-answer"
              placeholder="Svar"
              @input="checkInputDataAnswer"
            ></textarea>

            <label for="priceOffer" class="text-main font-text-light">Prisförslag</label>
            <input
              type="text"
              name="priceOffer"
              maxlength="7"
              class="price-offer-input"
              :value="index.priceOffer"
              disabled
            />

            <button
              type="submit"
              :disabled="isBtnDisabled"
              :class="{
                'main-btn-disabled': isBtnDisabled,
                'main-btn': !isBtnDisabled
              }"
              @click="sendAnswer"
            >
              Skicka
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
