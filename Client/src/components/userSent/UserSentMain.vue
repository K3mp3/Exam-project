<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { answerRepairShops } from '@/services/userContact'
import { onMounted, ref } from 'vue'
import UserSentAnswerForm from './UserSentAnswerForm.vue'

const allRepairShopAnswers = ref<IUserContact[]>([])
const correctRepairShopAnswers = ref<IUserContact[]>([])

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

  allRepairShopAnswers.value = allRepairShopAnswers.value.filter(
    (answer) => answer.customerEmail === customerEmail
  )
}

function calculateTotalAnswers() {
  let count = 0

  for (let i = 0; i < allRepairShopAnswers.value.length; i++) {
    count++
  }

  return count
}

async function handleAnswer(answerData: object) {
  const response = await answerRepairShops(answerData as IUserContact)
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
        :key="index._id"
        :index="index"
        :onAnswer="handleAnswer"
      ></UserSentAnswerForm>
    </form>
  </div>
</template>
