<script setup lang="ts">
import type { IRepairShopAnswer } from '@/models/IRepairShopAnswer'
import type { IRepairShopId } from '@/models/IRepairShopId'
import type { IUserContact } from '@/models/IUserContact'
import router from '@/router'
import { answerCustomerBack, answerFromRepairShop } from '@/services/RepariShopAnswer'
import { getAnswerRepairShops, getContactRepairShops } from '@/services/userContact'
import { repairShopSelectedJobs } from '@/stores/repairShopSelectedJobs'
import { computed, onMounted, ref, watch } from 'vue'
import LoadingSpinner from '../assets/LoadingSpinner.vue'
import RequestContent from './RequestContent.vue'

const isLoading = ref(false)
const isConfirmation = ref(false)
const isConfirmationError = ref(false)

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const unansweredMessages = ref<IUserContact[]>([])
const answeredMessages = ref<IUserContact[]>([])
const selectedJobsArray = ref<IRepairShopAnswer[]>([])
const selectedJobs = computed(() => repairShopSelectedJobs().selectedWork)

watch(
  selectedJobs,
  (newValue) => {
    console.log('selectedJobs updated:', newValue)
    selectedJobsArray.value = newValue
    console.log('selectedJobsArray updated:', selectedJobsArray.value)
  },
  { deep: true }
)

const repairShopId = {
  repairShopId: userId.value
}

const totalPrice = computed(() => {
  return selectedJobsArray.value.reduce((sum, job) => sum + (job.priceOffer || 0), 0)
})

async function getMessages() {
  if (userId.value) {
    console.log('verkstad')
    const response = await getContactRepairShops(repairShopId as IRepairShopId)
    console.log(response)
    const responseArray: IUserContact[] = Array.isArray(response) ? response : [response]

    console.log(responseArray)

    unansweredMessages.value = responseArray
    console.log('unansweredMessages:', unansweredMessages.value) // Add this line for debugging
  }
}

async function getAnsweredMessages() {
  const response = await getAnswerRepairShops()
  answeredMessages.value = response

  answeredMessages.value = answeredMessages.value.filter(
    (answer) => answer.answeredByRepairShop === false
  )
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
})
</script>

<template>
  <div class="p-4 flex flex-col gap-2">
    <h2 class="text-text-lg sm:text-xl">Dina förfrågningar</h2>

    <form @submit.prevent="" class="repair-shop-requests-form">
      <div
        class="flex flex-col gap-2 w-full rounded-lg p-3 border-main text-main mb-6"
        v-if="selectedJobsArray.length > 0"
      >
        <div class="flex flex-col gap-2" v-for="job in selectedJobsArray" :key="job.work">
          <h2>{{ job.type }}</h2>
          <p>{{ `${job.priceOffer} kr` }}</p>
          <div class="h-[2px] w-full gray-line-horizontal"></div>
        </div>
        <h2>
          Totalt:
          {{ totalPrice }} kr
        </h2>
      </div>

      <div
        class="flex flex-col gap-6 w-ful mb-[83px]"
        v-for="message in unansweredMessages"
        :key="message._id"
      >
        <div
          v-for="(customerMessage, index) in message.customerMessage"
          :key="`${message._id}-${index}`"
        >
          <RequestContent :customerMessage="customerMessage" :message="message" />
        </div>
      </div>
      <!-- <RepairShopMessageContent
        v-for="(message, messageIndex) in unansweredMessages"
        :key="`${message._id}-${messageIndex}`"
        :userContact="message"
        :messageData="message.customerMessage[messageIndex]"
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
      </RepairShopAnsweredContent> -->

      <div class="spinner-component" v-if="isLoading">
        <LoadingSpinner />
        <!-- Spinner by: https://codepen.io/jkantner/pen/QWrLOXW -->
      </div>
      <div class="confirmation-box-background" v-if="isConfirmation || isConfirmationError">
        <div class="confirmation-box" v-if="isConfirmation">
          <fontAwesome :icon="['fas', 'check']" class="text-main font-title-bold O35rem" />
          <p class="text-main font-title-bold O1rem">Meddelande skickat!</p>
        </div>

        <div class="confirmation-box-error" v-if="isConfirmationError">
          <fontAwesome :icon="['fas', 'x']" class="text-main font-title-bold O35rem" />
          <p class="text-main font-title-bold O1rem">Meddelande kunde ej skickas!</p>
        </div>
      </div>
    </form>
  </div>
</template>
