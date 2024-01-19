<script setup lang="ts">
import type { IRepairShopAnswer } from '@/models/IRepairShopAnswer'
import { removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { onMounted, ref } from 'vue'
import UserSentAnswerForm from './UserSentAnswerForm.vue'

const allRepairShopAnswers = ref<IRepairShopAnswer[]>([])
const correctRepairShopAnswers = ref<IRepairShopAnswer[]>([])

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

  console.log(allRepairShopAnswers.value)
}

function calculateTotalAnswers() {
  let count = 0

  for (let i = 0; i < allRepairShopAnswers.value.length; i++) {
    count++
  }

  return count
}

function handleAnswer() {}

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
