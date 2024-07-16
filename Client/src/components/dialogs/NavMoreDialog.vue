<script setup lang="ts">
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { onMounted, ref } from 'vue'

const activeButton = ref('')

const isRepairShop = ref(false)

const auth = getAuth()

onMounted(async () => {
  const user = {
    userEmail: auth.currentUser?.email
  }

  const response = await axios.post('http://localhost:3000/users/signedInUser', user)

  isRepairShop.value = response.data.message.repairShop
})
</script>

<template>
  <div class="fixed bottom-0 mb-[83px] w-full">
    <div class="max-w-36 p-4 bg-main-40 border-main backdrop-blur-sm m-auto rounded-lg">
      <ul class="text-main flex flex-col gap-4 text-center">
        <li class="flex gap-2 w-full items-center justify-center">
          <RouterLink
            :to="`/user-sent/${auth.currentUser?.uid}`"
            :class="[
              'flex gap-2 w-full items-center justify-center',
              activeButton === 'inbox' && 'ease-in-out duration-300 text-active-blue'
            ]"
            @click="() => (activeButton = 'inbox')"
          >
            <fontAwesome :icon="['fas', 'paper-plane']" /> Skickat
          </RouterLink>
        </li>
        <li class="flex gap-2 w-full items-center justify-center">
          <RouterLink
            :to="`/user-profile/${auth.currentUser?.uid}`"
            :class="[
              'flex gap-2 w-full items-center justify-center',
              activeButton === 'inbox' && 'ease-in-out duration-300 text-active-blue'
            ]"
            @click="() => (activeButton = 'inbox')"
          >
            <fontAwesome :icon="['fas', 'user']" /> Profil
          </RouterLink>
        </li>
        <li class="flex gap-2 w-full items-center justify-center">
          <RouterLink
            v-if="isRepairShop"
            :to="`/user-calendar/${auth.currentUser?.uid}`"
            :class="[
              'flex gap-2 w-full items-center justify-center',
              activeButton === 'inbox' && 'ease-in-out duration-300 text-active-blue'
            ]"
            @click="() => (activeButton = 'inbox')"
          >
            <fontAwesome :icon="['fas', 'calendar-days']" /> Kalender
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
