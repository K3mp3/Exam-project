<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { getCorrectAnswer, removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { answerRepairShops } from '@/services/userContact'
import { onMounted, ref } from 'vue'
import UserHomeAnswerForm from './UserHomeAnswerForm.vue'
import UserHomeAnswerFormTablet from './tablet/UserHomeAnswerFormTablet.vue'

const mobile = ref(true)
const tablet = ref(false)
const desktop = ref(false)

const allRepairShopAnswers = ref<IUserContact[]>([])
const requestData = ref<IUserContact[]>([])
const messageArray: { message: string; name: string; date: string }[] = []

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

  console.log(customerEmail)

  allRepairShopAnswers.value = allRepairShopAnswers.value.filter(
    (answer) => answer.customerEmail === customerEmail && answer.answeredByRepairShop === true
  )
}

async function handleAnswer(answerData: object) {
  console.log(answerData)
  const response = await answerRepairShops(answerData as IUserContact)
}

async function showRequestData(index: any) {
  console.log('index:', index)
  const foundAnswer = allRepairShopAnswers.value.find((answer) => answer._id === index)
  if (foundAnswer) {
    requestData.value = [foundAnswer]

    const request = {
      customerId: foundAnswer.customerId,
      messageId: foundAnswer.messageId
    }

    const correctResponse = await getCorrectAnswer(request)
    messageArray.push(correctResponse)

    console.log(correctResponse.customerMessage)

    sortRequestData(correctResponse.customerMessage, correctResponse.repairShopAnswer)
  } else {
    console.log('Answer not found!')
  }
}

function sortRequestData(
  customerMessage: { message: string; date: string }[],
  repairShopAnswer: { message: string; date: string }[]
) {
  const flattenedMessages = customerMessage.concat(repairShopAnswer)

  flattenedMessages.sort(
    (a: { date: string }, b: { date: string }) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  )
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
          @showMore="showRequestData(index._id)"
        ></UserHomeAnswerFormTablet>
      </div>
      <div class="data-column">
        <div class="data-container-tablet" v-for="index in requestData" :key="index._id">
          <p>{{ index.repairShopName }}</p>
          <p><span>Registreringsnummer: </span>{{ index.registrationNumber }}</p>
        </div>
      </div>
    </form>
  </div>
</template>
