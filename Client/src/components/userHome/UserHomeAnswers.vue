<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { answerRepairShops } from '@/services/userContact'
import { onMounted, ref } from 'vue'
import UserHomeAnswerForm from './UserHomeAnswerForm.vue'
import UserHomeAnswerFormTablet from './tablet/UserHomeAnswerFormTablet.vue'

const mobile = ref(true)
const tablet = ref(false)
const desktop = ref(false)

const allRepairShopAnswers = ref<IUserContact[]>([])
const requestData = ref<IUserContact[]>([])

const customerEmail = localStorage.getItem('userEmail')

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 1481) {
    desktop.value = true
    tablet.value = false
    mobile.value = false
  }

  if (document.documentElement.clientWidth > 699 && document.documentElement.clientWidth < 1482) {
    tablet.value = true
    desktop.value = false
    mobile.value = false
  }

  if (document.documentElement.clientWidth < 700) {
    mobile.value = true
    desktop.value = false
    tablet.value = false
  }
}

async function getAnswers() {
  const allResponses = await removedAnsweredRequests()
  allRepairShopAnswers.value = allResponses

  console.log(customerEmail)

  allRepairShopAnswers.value = allRepairShopAnswers.value.filter(
    (answer) => answer.customerEmail === customerEmail && answer.answeredByRepairShop === true
  )
}

async function handleAnswer(answerData: object) {
  console.log(answerData)
  const response = await answerRepairShops(answerData as IUserContact)
}

function showRequestData(index: string | undefined) {
  console.log('index:', index)
  const foundAnswer = allRepairShopAnswers.value.find((answer) => answer._id === index)
  if (foundAnswer) {
    console.log('Found answer:', foundAnswer)
    requestData.value = [foundAnswer]
    console.log(requestData.value)
  } else {
    console.log('Answer not found!')
  }
}

onMounted(() => {
  getAnswers()
  updateScreenSize()
})
</script>

<template>
  <div class="user-sent-main">
    <form @submit.prevent="" class="user-sent-answer-form" v-if="mobile">
      <UserHomeAnswerForm
        v-for="index in allRepairShopAnswers"
        :key="index._id"
        :index="index"
        :onAnswer="handleAnswer"
      ></UserHomeAnswerForm>
    </form>
    <form @submit.prevent="" class="user-sent-answer-form" v-if="tablet">
      <div class="request-column">
        <UserHomeAnswerFormTablet
          v-for="index in allRepairShopAnswers"
          :key="index._id"
          :index="index"
          :onAnswer="handleAnswer"
          @showMore="showRequestData(index._id)"
        ></UserHomeAnswerFormTablet>
      </div>
      <div class="data-column">
        <div class="request-container-tablet" v-for="index in requestData" :key="index._id">
          <p>{{ index.repairShopName }}</p>
        </div>
      </div>
    </form>
  </div>
</template>
