<script setup lang="ts">
import type { IRepairShopId } from '@/models/IRepairShopId'
import type { IUserContact } from '@/models/IUserContact'
import router from '@/router'
import { answerCustomerBack } from '@/services/RepariShopAnswer'
import { getAnswerRepairShops, getContactRepairShops } from '@/services/userContact'
import { computed, onMounted, ref } from 'vue'
import RepairShopAnsweredContent from '../repairShopHome/RepairShopAnsweredContent.vue'

const isLoading = ref(false)
const isConfirmation = ref(false)
const isConfirmationError = ref(false)

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const unansweredMessages = ref<IUserContact[]>([])
const answeredMessages = ref<IUserContact[]>([])

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

async function handleAnswerCustomerBack(answerData: Object) {
  const response = await answerCustomerBack(answerData as IUserContact)

  getMessages()
}

onMounted(() => {
  getMessages()
  getAnsweredMessages()
  console.log('answeredMessages.value:', answeredMessages.value)
})
</script>

<template>
  <h3>Dina förfrågningar</h3>

  <form @submit.prevent="" class="repair-shop-requests-form">
    <RepairShopAnsweredContent
      v-for="index in answeredMessages"
      :key="index._id"
      :index="index"
      class="repair-shop-message-content-component"
      :onAnswer="handleAnswerCustomerBack"
      :hideAnswerInput="false"
    />
  </form>

  <div class="blue-line"></div>
</template>
