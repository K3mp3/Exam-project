<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { getSentMessages } from '@/services/userContact'
import { nextTick, onMounted, ref } from 'vue'
import UserSentRequestsVue from './UserSentRequests.vue'
import UserSentTopNav from './UserSentTopNav.vue'

const desktop = ref(false)

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 1399) desktop.value = true
  else desktop.value = false
}

const userName = localStorage.getItem('userName')
const userEmail = localStorage.getItem('userEmail')

const allRequests = ref<IUserContact[]>([])

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
})
</script>

<template>
  <UserSentTopNav></UserSentTopNav>

  <div
    :class="[
      'display-flex gap-6 padding-16 m-width-1000 margin-au w-100',
      desktop ? 'flex-dir-col' : 'flex-dir-col'
    ]"
  >
    <UserSentRequestsVue
      v-for="index in allRequests"
      :key="index._id"
      :requests="index"
      :onFilter="getMessages"
    />
  </div>
</template>
