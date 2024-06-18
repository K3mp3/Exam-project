<script setup lang="ts">
import { getAuth } from 'firebase/auth'
import { ref } from 'vue'

const activeButton = ref('')
const auth = getAuth()
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
      </ul>
    </div>
  </div>
</template>
