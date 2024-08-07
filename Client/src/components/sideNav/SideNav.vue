<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/storeSignedInUser'
import axios from 'axios'
import { getAuth, signOut } from 'firebase/auth'
import { computed, onMounted, ref } from 'vue'

const currentUrl = window.location.href
const userId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)

const isRepairShop = ref(false)

const authStore = useAuthStore()
const userEmail = computed(() => authStore.getUser?.email)

const emits = defineEmits<{
  (e: 'newRequest'): void
}>()

const userSentRoute = computed(() => `/user-sent/${userId}`)
let auth: any

function newRequest() {
  emits('newRequest')
}

function signOutUser() {
  signOut(auth).then(() => {
    router.push('/')
  })
}

onMounted(async () => {
  auth = getAuth()

  const user = {
    userEmail: userEmail.value
  }

  console.log(user)

  const response = await axios.post('http://localhost:3000/users/signedInUser', user)

  console.log(response.data)

  isRepairShop.value = response.data.message.repairShop
})
</script>

<template>
  <div class="flex">
    <div class="h-screen p-8 flex flex-col gap-16 justify-between">
      <div class="flex flex-col gap-6">
        <h2 class="sm:text-3xl xl:text-5xl">FixerFinder</h2>
        <button
          v-if="!isRepairShop"
          type="button"
          class="flex gap-2 items-center main-btn px-6 text-main"
          @click="newRequest"
        >
          <fontAwesome :icon="['fa-solid', 'fa-pen-to-square']" />Ny förfrågan
        </button>
      </div>
      <div class="flex flex-col gap-4 h-full">
        <ul class="text-main flex flex-col gap-8">
          <li>
            <RouterLink :to="`/user-home/${userId}`">
              <p
                :class="[
                  currentUrl.includes('user-home') && 'border-gr-blue rounded-[10px]',
                  'flex justify-between py-1.5 px-3'
                ]"
              >
                inkorg
              </p></RouterLink
            >
          </li>
          <li>
            <RouterLink :to="`/user-sent/${userId}`">
              <p
                :class="[
                  currentUrl.includes('user-sent') && 'border-gr-blue rounded-[10px]',
                  'flex justify-between py-1.5 px-3'
                ]"
              >
                Skickat
              </p></RouterLink
            >
          </li>
          <li>
            <RouterLink :to="`/user-profile/${userId}`">
              <p
                :class="[
                  currentUrl.includes('user-profile') && 'border-gr-blue rounded-[10px]',
                  'flex justify-between py-1.5 px-3'
                ]"
              >
                Profil
              </p></RouterLink
            >
          </li>
          <li>
            <RouterLink v-if="isRepairShop" :to="`/user-schedule/${auth.currentUser?.uid}`">
              <p
                :class="[
                  currentUrl.includes('user-schedule') && 'border-gr-blue rounded-[10px]',
                  'flex justify-between py-1.5 px-3'
                ]"
              >
                Kalender
              </p></RouterLink
            >
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-4 h-full"></div>

      <div class="w-full flex justify-center text-main">
        <button type="button" class="outline-btn px-6 py-1 w-full" @click="signOutUser()">
          <p>Logga ut</p>
        </button>
      </div>
    </div>
    <div class="w-[2px] h-screen gray-line-vertical"></div>
  </div>
</template>
