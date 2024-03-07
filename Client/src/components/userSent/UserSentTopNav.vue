<script setup lang="ts">
import { getSentMessages } from '@/services/userContact'
import { computed, nextTick, onMounted, ref } from 'vue'

const currentUrl = window.location.href
const userId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)

const userHomeRoute = computed(() => `/user-home/${userId}`)

const userName = localStorage.getItem('userName')
const userEmail = localStorage.getItem('userEmail')

const allRepairShopAnswers = ref<IUserContact[]>([])

const user = ref({
  customerName: userName,
  customerEmail: userEmail
})

async function getMessages() {
  nextTick(async () => {
    console.log(user.value)
    const response = await getSentMessages(user.value)
    allRepairShopAnswers.value = response
    console.log(allRepairShopAnswers.value)
  })
}

onMounted(() => getMessages())
</script>

<template>
  <div class="user-sent-top-nav">
    <RouterLink :to="userHomeRoute" class="btn-back"
      ><fontAwesome :icon="['fas', 'chevron-left']"
    /></RouterLink>
    <h2>Skickat och svar</h2>
  </div>
</template>
