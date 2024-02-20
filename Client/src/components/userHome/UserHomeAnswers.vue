<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { getCorrectAnswer, removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { answerRepairShops } from '@/services/userContact'
import { onMounted, ref } from 'vue'
import UserHomeAnswerForm from './UserHomeAnswerForm.vue'
import UserHomeMessages from './UserHomeMessages.vue'
import UserHomeAnswerFormTablet from './tablet/UserHomeAnswerFormTablet.vue'

const mobile = ref(true)
const tablet = ref(false)
const desktop = ref(false)
const isData = ref(false)

const allRepairShopAnswers = ref<IUserContact[]>([])
const requestData = ref<IUserContact[]>([])
const messageArray = ref<{ message: string; name: string; date: string }[]>([])

const customerEmail = localStorage.getItem('userEmail')

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 1481) {
    desktop.value = true
    tablet.value = false
    mobile.value = false
  }

  if (document.documentElement.clientWidth > 699 && document.documentElement.clientWidth < 1482) {
    tablet.value = true
    desktop.value = false
    mobile.value = false
  }

  if (document.documentElement.clientWidth < 700) {
    mobile.value = true
    desktop.value = false
    tablet.value = false
  }
}

async function getAnswers() {
  const allResponses = await removedAnsweredRequests()
  allRepairShopAnswers.value = allResponses

  // console.log(customerEmail)

  allRepairShopAnswers.value = allRepairShopAnswers.value.filter(
    (answer) => answer.customerEmail === customerEmail && answer.answeredByRepairShop === true
  )
}

async function handleAnswer(answerData: object) {
  console.log(answerData)
  const response = await answerRepairShops(answerData as IUserContact)
}

async function showRequestData(
  customerMessage: { message: string; name: string; date: string }[],
  repairShopAnswer: { message: string; name: string; date: string }[],
  index: any
) {
  const foundAnswer = allRepairShopAnswers.value.find((answer) => answer._id === index)
  if (foundAnswer) {
    requestData.value = [foundAnswer]

    const request = {
      customerId: foundAnswer.customerId,
      messageId: foundAnswer.messageId
    }

    const correctResponse = await getCorrectAnswer(request)

    // console.log(customerMessage)
    // console.log(repairShopAnswer)

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

  console.log(messageArray.value)
  console.log(flattenedMessages)

  isData.value = true
}

onMounted(() => {
  getAnswers()
  updateScreenSize()
})
</script>

<template>
  <div class="user-sent-main">
    <form @submit.prevent="" class="user-sent-answer-form" v-if="mobile">
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
          <p>{{ index.repairShopName }}</p>
          <p><span>Registreringsnummer: </span>{{ index.registrationNumber }}</p>

          <div class="data-column-message-container">
            <UserHomeMessages
              v-for="index in messageArray"
              :key="index.date"
              :index="index"
            ></UserHomeMessages>

            <textarea
              name="message-input"
              v-model="messageAnswer"
              class="text-editor-answer"
              placeholder="Svar"
              @input="checkInputDataAnswer"
            ></textarea>

            <label for="priceOffer">Prisförslag</label>
            <input
              type="text"
              name="priceOffer"
              placeholder="500 kr"
              v-model="priceOffer"
              maxlength="7"
              class="price-offer-input"
            />

            <!-- <button
              type="submit"
              :disabled="isBtnDisabled"
              :class="{
                'repair-shop-home-send-btn-disabled': isBtnDisabled,
                'repair-shop-home-send-btn': !isBtnDisabled
              }"
              @click="sendAnswer"
            >
              Skicka
            </button> -->
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
