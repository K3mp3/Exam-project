<script setup lang="ts">
import type { IRepairShopAnswer } from '@/models/IRepairShopAnswer'
import { removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { answerRepairShops, getAnswerRepairShops } from '@/services/userContact'
import { onMounted, ref } from 'vue'
import UserSentAnswerForm from './UserSentAnswerForm.vue'

const allRepairShopAnswers = ref<IRepairShopAnswer[]>([])
const userAnswers = ref<IRepairShopAnswer[]>([])
const filteredMessages = ref<IRepairShopAnswer[]>([])

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const customerEmail = getCookie('email')

async function getAnswers() {
  const allResponses = await removedAnsweredRequests()
  allRepairShopAnswers.value = allResponses

  const userAnswer = await getAnswerRepairShops()
  userAnswers.value = userAnswer

  // const filtered = allRepairShopAnswers.value.filter(
  //   (answer) => answer.customerEmail === customerEmail
  // )

  const filtered = allRepairShopAnswers.value.filter((answeredMessage) => {
    const matchingAnswer = userAnswers.value.find(
      (answer) => answeredMessage.customerId === answer.customerId
    )
  })

  console.log(allRepairShopAnswers.value)
}

function calculateTotalAnswers() {
  let count = 0

  for (let i = 0; i < allRepairShopAnswers.value.length; i++) {
    count++
  }

  return count
}

async function handleAnswer(answerData: Object) {
  const castedAnswerData = answerData as IRepairShopAnswer
  const response = await answerRepairShops(castedAnswerData)

  const answeredMessageIndex = allRepairShopAnswers.value.findIndex(
    (message) => message.customerId === castedAnswerData.customerId
  )

  if (answeredMessageIndex !== -1) {
    const [answeredMessage] = allRepairShopAnswers.value.splice(answeredMessageIndex, 1)
  }
}

onMounted(() => {
  getAnswers()
})
</script>

<template>
  <div class="user-sent-main">
    <p>{{ `Du har ${calculateTotalAnswers()} svar` }}</p>

    <form @submit.prevent="handleAnswer" class="user-sent-answer-form">
      <UserSentAnswerForm
        v-for="index in allRepairShopAnswers"
        :key="index.customerId"
        :index="index"
        :onAnswer="handleAnswer"
      ></UserSentAnswerForm>
    </form>
  </div>
</template>
