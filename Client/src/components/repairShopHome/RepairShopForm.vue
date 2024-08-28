<script setup lang="ts">
import type { IRepairShopAnswer } from '@/models/IRepairShopAnswer'
import type { IUserContact } from '@/models/IUserContact'
import router from '@/router'
import { answerFromRepairShop } from '@/services/RepariShopAnswer'
import { getContactRepairShops } from '@/services/userContact'
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
const selectedWork = repairShopSelectedJobs()

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
    const response = await getContactRepairShops()
    console.log(response)
    const responseArray: IUserContact[] = Array.isArray(response) ? response : [response]

    console.log(responseArray)

    unansweredMessages.value = responseArray.filter((message: IUserContact) => {
      const flattenedMessages = message.customerMessage.flat()

      const hasUnansweredMessage = flattenedMessages.some((customerMessage) => {
        return customerMessage.answeredByRepairShop === false
      })

      return hasUnansweredMessage
    })
    console.log('unansweredMessages:', unansweredMessages.value) // Add this line for debugging
  }
}

function removeSelectedJob(jobType: string, price: number) {
  selectedWork.filterSelectedWork(jobType, price)
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

async function handleAnswer() {
  console.log(selectedJobsArray.value)
  answerFromRepairShop(selectedJobsArray.value)

  getMessages()
}

onMounted(() => {
  getMessages()
})
</script>

<template>
  <div class="max-w-[350px] xl:max-w-[500px] w-full p-4 flex flex-col gap-2 md:p-8 margin-auto">
    <div
      class="flex flex-col gap-2 w-full rounded-lg p-3 border-main text-main mb-6"
      v-if="selectedJobsArray.length > 0"
    >
      <div class="flex flex-col gap-2 relative" v-for="job in selectedJobsArray" :key="job.work">
        <h2>{{ job.type }}</h2>
        <p>{{ `${job.priceOffer} kr` }}</p>
        <div class="h-[2px] w-full gray-line-horizontal"></div>
        <button
          type="button"
          class="absolute right-0"
          @click="() => removeSelectedJob(job.type, job.priceOffer)"
        >
          <fontAwesome :icon="['fas', 'trash']" />
        </button>
      </div>
      <h2>
        Totalt:
        {{ totalPrice }} kr
      </h2>
      <button type="button" class="text-center px-6 text-main mt-4 main-btn" @click="handleAnswer">
        <p>Skicka</p>
      </button>
    </div>

    <form @submit.prevent="" class="flex flex-col gap-6 md:gap-8">
      <h2 class="text-text-lg sm:text-xl">Dina förfrågningar</h2>

      <div
        class="flex flex-col gap-4 md:gap-6"
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

<style></style>
