<script setup lang="ts">
import type { IRepairShopId } from '@/models/IRepairShopId'
import type { IUserContact } from '@/models/IUserContact'
import router from '@/router'
import { answerFromRepairShop } from '@/services/RepariShopAnswer'
import { getAnswerRepairShops, getContactRepairShops } from '@/services/userContact'
import { computed, onMounted, ref } from 'vue'
import RepairShopMessageContent from './RepairShopMessageContent.vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const unansweredMessages = ref<IUserContact[]>([])

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const repairShopEmail = localStorage.getItem('userEmail')
const repairShopName = localStorage.getItem('userName')

const repairShopId = {
  repairShopId: userId.value
}

async function getMessages() {
  if (userId.value) {
    const response = await getContactRepairShops(repairShopId as IRepairShopId)
    unansweredMessages.value = response
    console.log(response)
  }
}

async function getAnsweredMessages() {
  const response = await getAnswerRepairShops()
  console.log('response:', response)
}

async function handleAnswer(answerData: Object) {
  console.log(answerData)

  const response = await answerFromRepairShop(answerData as IUserContact)

  getMessages()
}

onMounted(() => {
  getMessages()
  getAnsweredMessages()
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
  </form>

  <div class="blue-line"></div>
</template>
