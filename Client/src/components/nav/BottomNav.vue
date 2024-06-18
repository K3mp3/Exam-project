<script setup lang="ts">
import router from '@/router'
import { getAuth, signOut } from 'firebase/auth'
import { ref } from 'vue'
import NavMoreDialog from '../dialogs/NavMoreDialog.vue'

const activeButton = ref('')
const showMoreDialog = ref(false)

const auth = getAuth()

function signOutUser() {
  activeButton.value = 'sign-out'

  signOut(auth).then(() => {
    router.push('/')
  })
}
</script>

<template>
  <NavMoreDialog v-if="showMoreDialog" />
  <div class="w-screen p-4 z-10 fixed bottom-0 left-0">
    <div class="flex flex-col px-4 rounded-lg border-main bg-main-40 backdrop-blur-sm gap-8">
      <ul class="flex flex-row justify-center items-center gap-4">
        <li class="activeUrl list-style-none w-full">
          <RouterLink
            :to="`/user-home/${auth.currentUser?.uid}`"
            :class="[
              'w-full text-main font-text-light flex flex-col gap-1 p-4',
              activeButton === 'inbox' && 'ease-in-out duration-300 text-active-blue'
            ]"
            @click="() => (activeButton = 'inbox')"
          >
            <fontAwesome :icon="['fas', 'inbox']" />
          </RouterLink>
        </li>
        <li class="activeUrl list-style-none w-full">
          <button
            type="button"
            :class="[
              'w-full text-main font-text-light flex flex-col gap-1 p-4',
              showMoreDialog && 'ease-in-out duration-300 text-active-blue'
            ]"
            @click="() => (showMoreDialog = !showMoreDialog)"
          >
            <fontAwesome :icon="['fas', 'plus']" />
          </button>
        </li>
        <li class="activeUrl list-style-none w-full">
          <button
            type="button"
            :class="[
              'w-full text-main font-text-light flex flex-col gap-1 p-4',
              activeButton === 'sign-out' && 'ease-in-out duration-300 text-active-blue'
            ]"
            @click="signOutUser"
          >
            <fontAwesome :icon="['fas', 'right-from-bracket']" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
