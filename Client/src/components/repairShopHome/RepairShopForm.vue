<script setup lang="ts">
import type { IRepairShopId } from '@/models/IRepairShopId'
import type { IUserContact } from '@/models/IUserContact'
import router from '@/router'
import { answerCustomerBack, answerFromRepairShop } from '@/services/RepariShopAnswer'
import { getAnswerRepairShops, getContactRepairShops } from '@/services/userContact'
import { computed, onMounted, ref } from 'vue'
import RepairShopAnsweredContent from './RepairShopAnsweredContent.vue'
import RepairShopMessageContent from './RepairShopMessageContent.vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const unansweredMessages = ref<IUserContact[]>([])
const answeredMessages = ref<IUserContact[]>([])

// const repairShopEmail = localStorage.getItem('userEmail')
// const repairShopName = localStorage.getItem('userName')

const repairShopId = {
  repairShopId: userId.value
}

const repairShopName = localStorage.getItem('userName')

async function getMessages() {
  if (userId.value) {
    const response = await getContactRepairShops(repairShopId as IRepairShopId)
    const responseArray: IUserContact[] = Array.isArray(response) ? response : []

    const filteredResponse = responseArray.filter((message: IUserContact) => {
      return (
        !message.repairShopAnswers || // If repairShopAnswers is not defined
        message.repairShopAnswers.every((answer) => answer.repairShop !== repairShopName)
      )
    })

    unansweredMessages.value = filteredResponse
  }
}

async function getAnsweredMessages() {
  const response = await getAnswerRepairShops()
  answeredMessages.value = response

  answeredMessages.value = answeredMessages.value.filter(
    (answer) => answer.answeredByRepairShop === false
  )

  console.log('answeredMessages.value:', answeredMessages.value)
}

async function handleAnswer(answerData: Object) {
  console.log(answerData)

  const response = await answerFromRepairShop(answerData as IUserContact)

  getMessages()
}

async function handleAnswerCustomerBack(answerData: Object) {
  console.log(answerData)

  const response = await answerCustomerBack(answerData as IUserContact)

  getMessages()
}

onMounted(() => {
  getMessages()
  getAnsweredMessages()
  console.log(unansweredMessages.value)
})
</script>

<template>
  <h3></h3>
  <h3>Dina förfrågningar</h3>

  <form @submit.prevent="" class="repair-shop-requests-form">
    <RepairShopMessageContent
      v-for="index in unansweredMessages"
      :key="index._id"
      :index="index"
      class="repair-shop-message-content-component"
      :onAnswer="handleAnswer"
    ></RepairShopMessageContent>
    <RepairShopAnsweredContent
      v-for="index in answeredMessages"
      :key="index._id"
      :index="index"
      class="repair-shop-message-content-component"
      :onAnswer="handleAnswerCustomerBack"
      :hideAnswerInput="true"
    >
    </RepairShopAnsweredContent>
  </form>

  <div class="blue-line"></div>
</template>
