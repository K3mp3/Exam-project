<script setup lang="ts">
import type { IRepairShopAnswer } from '@/models/IRepairShopAnswer'
import type { IUserContact } from '@/models/IUserContact'
import { answerFromRepairShop } from '@/services/RepariShopAnswer'
import { getContactRepairShops } from '@/services/userContact'
import { onMounted, ref } from 'vue'
import RepairShopMessageContent from './RepairShopMessageContent.vue'

const messages = ref<IUserContact[]>([])

async function getMessages() {
  const response = await getContactRepairShops()
  messages.value = response

  console.log(response)
}

async function handleAnswer(answerData: Object) {
  const castedAnswerData = answerData as IRepairShopAnswer

  console.log('Answer received from child:', castedAnswerData)

  // Now you can pass castedAnswerData to the service function
  const response = await answerFromRepairShop(castedAnswerData)
}

onMounted(() => {
  console.log(messages.value)
  getMessages()
})
</script>

<template>
  <h3>Dina förfrågningar</h3>

  <form @submit.prevent="handleAnswer" class="repair-shop-requests-form">
    <RepairShopMessageContent
      v-for="index in messages"
      :key="index._id"
      :index="index"
      class="repair-shop-message-content-component"
      :onAnswer="handleAnswer"
    ></RepairShopMessageContent>
  </form>

  <div class="blue-line"></div>
</template>
