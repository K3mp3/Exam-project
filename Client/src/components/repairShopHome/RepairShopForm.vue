<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { answerFromRepairShop, removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { getContactRepairShops } from '@/services/userContact'
import { onMounted, ref } from 'vue'

const unansweredMessages = ref<IUserContact[]>([])
const answeredMessages = ref<IUserContact[]>([])
const filteredMessages = ref<IUserContact[]>([])

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const repairShopEmail = getCookie('email')
const repairShopName = getCookie('name')

async function getMessages() {
  const response = await getContactRepairShops()
  unansweredMessages.value = response

  const answeredResponse = await removedAnsweredRequests()
  answeredMessages.value = answeredResponse

  const filtered = unansweredMessages.value.filter((unansweredMessage) => {
    const matchingAnswer = answeredMessages.value.find(
      (answeredMessage) =>
        unansweredMessage.customerId === answeredMessage.customerId &&
        repairShopEmail === answeredMessage.repairShopEmail &&
        repairShopName === answeredMessage.repairShopName
    )

    return !matchingAnswer
  })

  filteredMessages.value = filtered
}

async function handleAnswer(answerData: Object) {
  const castedAnswerData = answerData as IUserContact
  const response = await answerFromRepairShop(castedAnswerData)

  getMessages()
}

onMounted(() => {
  getMessages()
})
</script>

<template>
  <h3>
    Här är det än så länge tomt. Men ora dig inte, inom snar framtid kommer du att kunna se alla
    förfrågningar här.<br />
    Tillsvidare ser du dom på din mail!
  </h3>
  <!-- <h3>Dina förfrågningar</h3>

  <form @submit.prevent="handleAnswer" class="repair-shop-requests-form">
    <RepairShopMessageContent
      v-for="index in filteredMessages"
      :key="index._id"
      :index="index"
      class="repair-shop-message-content-component"
      :onAnswer="handleAnswer"
    ></RepairShopMessageContent>
  </form> -->

  <div class="blue-line"></div>
</template>
