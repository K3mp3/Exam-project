<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import router from '@/router'
import { getSentMessages } from '@/services/userContact'
import { nextTick, onMounted, ref } from 'vue'
import UserSentRequestsVue from './UserSentRequests.vue'
import UserSentTopNav from './UserSentTopNav.vue'

const desktop = ref(false)
const isRepairShop = ref<string | null>('')

const userId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

const userName = localStorage.getItem('userName')
const userEmail = localStorage.getItem('userEmail')

const allRequests = ref<IUserContact[]>([])

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 1399) desktop.value = true
  else desktop.value = false
}

const user = ref({
  customerName: userName,
  customerEmail: userEmail
})

async function getMessages() {
  nextTick(async () => {
    console.log(user.value)
    const response = await getSentMessages(user.value)
    allRequests.value = response
    console.log(allRequests.value)
  })
}

onMounted(() => {
  updateScreenSize()
  getMessages()

  isRepairShop.value = localStorage.getItem('isRepairShop')

  if (isRepairShop.value === 'true') router.push(`/repair-shop-sent/${userId}`)
})
</script>

<template>
  <UserSentTopNav />

  <div class="display-flex flex-dir-col gap-6 padding-16 m-width-1000 margin-au w-100">
    <UserSentRequestsVue
      v-for="index in allRequests"
      :key="index._id"
      :requests="index"
      :onFilter="getMessages"
    />
  </div>
</template>
