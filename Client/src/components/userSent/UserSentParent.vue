<script setup lang="ts">
import { getSentMessages } from '@/services/userContact'
import { nextTick, onMounted, ref } from 'vue'
import UserSentRequestsVue from './UserSentRequests.vue'
import UserSentTopNav from './UserSentTopNav.vue'
import type { IUserContact } from '@/models/IUserContact'

const desktop = ref(false)

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 1639) desktop.value = true
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
  <!-- <SideNavParent v-if="desktop" :signOutFunction="changeUserSignInStatus"></SideNavParent> -->
  <UserSentTopNav></UserSentTopNav>
  <UserSentRequestsVue
    v-for="index in allRequests"
    :key="index._id"
    :requests="index"
  ></UserSentRequestsVue>
</template>
