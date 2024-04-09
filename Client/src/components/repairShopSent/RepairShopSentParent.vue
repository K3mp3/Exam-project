<script setup lang="ts">
import type { IRepairShopId } from '@/models/IRepairShopId'
import type { IUserContact } from '@/models/IUserContact'
import router from '@/router'
import { answerCustomerBack, answerFromRepairShop } from '@/services/RepariShopAnswer'
import { getAnswerRepairShops, getContactRepairShops } from '@/services/userContact'
import { computed, onMounted, ref } from 'vue'
import UserSentTopNav from '../userSent/UserSentTopNav.vue'
import SentRequests from './sentRequests.vue'

const isLoading = ref(false)
const isConfirmation = ref(false)
const isConfirmationError = ref(false)

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
}

function showConfirmationBox(response: number) {
  console.log(response)

  if (response === 201) {
    isConfirmation.value = true

    setTimeout(() => {
      isConfirmation.value = false
    }, 4000)
  } else if (response === 500 || response === 400) {
    isConfirmationError.value = true

    setTimeout(() => {
      isConfirmationError.value = false
    }, 4000)
  }
}

async function handleAnswer(answerData: Object) {
  isLoading.value = true

  const response = await answerFromRepairShop(answerData as IUserContact)

  const responseData = response as { status: number }

  console.log(responseData.status)

  if (responseData && responseData.status === 201) {
    isLoading.value = false
    showConfirmationBox(201)
  } else {
    setTimeout(() => {
      isLoading.value = false
      showConfirmationBox(responseData.status)
    }, 5000)
  }

  getMessages()
}

async function handleAnswerCustomerBack(answerData: Object) {
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
  <UserSentTopNav />

  <div class="display-flex flex-dir-col gap-6 padding-16 m-width-1000 margin-au w-100">
    <SentRequests
      v-for="index in answeredMessages"
      :key="index._id"
      :index="index"
      class="repair-shop-message-content-component"
      :onAnswer="handleAnswerCustomerBack"
    />
  </div>
</template>
