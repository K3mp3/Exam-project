<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { answerRepairShops } from '@/services/userContact'
import { nextTick, onMounted, ref } from 'vue'
import UserHomeAnswerForm from './UserHomeAnswerForm.vue'
import UserHomeMessages from './UserHomeMessages.vue'
import UserHomeAnswerFormTablet from './tablet/UserHomeAnswerFormTablet.vue'

const props = defineProps({
  numberOfAnswers: {
    type: Function,
    required: true
  }
})

const mobile = ref(true)
const tablet = ref(false)
const isData = ref(false)
const isMessageAnswer = ref(false)
const isBtnDisabled = ref(true)

const customerMessage = ref('')

const storedRequestData = ref<Object[]>([])
const allRepairShopAnswers = ref<IUserContact[]>([])
const requestData = ref<IUserContact[]>([])
const messageArray = ref<{ message: string; name: string; date: string }[]>([])
const inputsArray: { key: string; value: boolean }[] = [{ key: 'isMessageAnswer', value: false }]

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

  allRepairShopAnswers.value = allRepairShopAnswers.value.filter(
    (answer) => answer.customerEmail === customerEmail && answer.answeredByRepairShop === true
  )

  props.numberOfAnswers(allRepairShopAnswers.value.length)
}

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
}

function checkInputDataAnswer() {
  nextTick(() => {
    if (customerMessage.value === '') {
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

let customerData = {}

function handleAnswer(answerData: IUserContact) {
  customerData = answerData

  console.log(storedRequestData.value)
}

async function handleAnswerMobile(answerData: IUserContact) {
  await answerRepairShops(answerData as IUserContact)
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

async function sendAnswer() {
  console.log(customerData)

  customerData = {
    ...customerData,
    customerAnswer: customerMessage.value
  }

  console.log(customerData)

  await answerRepairShops(customerData as IUserContact)
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
        :onAnswer="handleAnswerMobile"
      ></UserHomeAnswerForm>
    </form>
    <form @submit.prevent="" class="user-sent-answer-form" v-if="tablet">
      <div class="request-column">
        <UserHomeAnswerFormTablet
          v-for="index in allRepairShopAnswers"
          :key="index._id"
          :index="index"
          :onAnswer="handleAnswer"
          :onFilter="getAnswers"
          @showMore="showRequestData"
        >
        </UserHomeAnswerFormTablet>
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
              v-model="customerMessage"
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
                'main-btn-disabled m-h-42': isBtnDisabled,
                'main-btn m-h-42': !isBtnDisabled
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
