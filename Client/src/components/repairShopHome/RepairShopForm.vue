<script setup lang="ts">
import type { IRepairShopAnswer } from '@/models/IRepairShopAnswer'
import type { IUserContact } from '@/models/IUserContact'
import { answerFromRepairShop, removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { getContactRepairShops } from '@/services/userContact'
import { onMounted, ref } from 'vue'
import RepairShopMessageContent from './RepairShopMessageContent.vue'

const unansweredMessages = ref<IUserContact[]>([])
const answeredMessages = ref<IRepairShopAnswer[]>([])

async function getMessages() {
  const response = await getContactRepairShops()
  unansweredMessages.value = response

  const answeredResponse = await removedAnsweredRequests()
  answeredMessages.value = answeredResponse

  unansweredMessages.value = unansweredMessages.value.filter((unansweredMessage) => {
    const hasAnsweredMessage = answeredMessages.value.find(
      (answeredMessage) => answeredMessage.customerId === unansweredMessage._id
    )

    const shouldInclude = !(
      hasAnsweredMessage && hasAnsweredMessage.repairShopEmail === repairShopEmail
    )

    return shouldInclude
  })

  console.log(unansweredMessages.value)
}

async function handleAnswer(answerData: Object) {
  const castedAnswerData = answerData as IRepairShopAnswer
  const response = await answerFromRepairShop(castedAnswerData)
  const answeredMessageIndex = unansweredMessages.value.findIndex(
    (message) => message._id === castedAnswerData.customerId
  )

  if (answeredMessageIndex !== -1) {
    const [answeredMessage] = unansweredMessages.value.splice(answeredMessageIndex, 1)
  }
}

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const repairShopEmail = getCookie('email')

onMounted(() => {
  getMessages()
})
</script>

<template>
  <h3>Dina förfrågningar</h3>

  <form @submit.prevent="handleAnswer" class="repair-shop-requests-form">
    <RepairShopMessageContent
      v-for="index in unansweredMessages"
      :key="index._id"
      :index="index"
      class="repair-shop-message-content-component"
      :onAnswer="handleAnswer"
    ></RepairShopMessageContent>
  </form>

  <div class="blue-line"></div>
</template>
