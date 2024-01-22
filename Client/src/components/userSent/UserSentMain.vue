<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import {
  answerRepairShops,
  getAnswerRepairShops,
  getContactRepairShops
} from '@/services/userContact'
import { onMounted, ref } from 'vue'
import UserSentAnswerForm from './UserSentAnswerForm.vue'

const allRepairShopAnswers = ref<IUserContact[]>([])
const userAnswers = ref<IUserContact[]>([])
const filteredMessages = ref<IUserContact[]>([])

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
  const allResponses = await getContactRepairShops()
  allRepairShopAnswers.value = allResponses

  const userAnswer = await getAnswerRepairShops()
  userAnswers.value = userAnswer

  console.log(allRepairShopAnswers)

  const filtered = allRepairShopAnswers.value.filter((unansweredMessage) => {
    return unansweredMessage.answeredByCustomer === false
  })

  filteredMessages.value = filtered
}

function calculateTotalAnswers() {
  let count = 0

  for (let i = 0; i < filteredMessages.value.length; i++) {
    count++
  }

  return count
}

async function handleAnswer(answerData: Object) {
  const castedAnswerData = answerData as IUserContact
  const response = await answerRepairShops(castedAnswerData)

  getAnswers()
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
        v-for="index in filteredMessages"
        :key="index._id"
        :index="index"
        :onAnswer="handleAnswer"
      ></UserSentAnswerForm>
    </form>
  </div>
</template>
