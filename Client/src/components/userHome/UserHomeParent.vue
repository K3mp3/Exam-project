<script setup lang="ts">
import router from '@/router'

import { signOutUser } from '@/services/signOutUser'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { computed, onMounted, ref } from 'vue'
import DialogBox from '../dialogs/DialogBox.vue'
import SideNav from '../sideNav/SideNav.vue'
import { getSignInStatus } from '../utils/signInStatus'
import UserHomeAnswers from './UserHomeAnswers.vue'
import UserSettings from './UserSettings.vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const isUserSettings = ref(false)
const desktop = ref(false)
const showEmptyMessage = ref(false)
const firstName = ref('')

const isDialog = computed(() => useShowPopUp().showPopUp)

const fullName = localStorage.getItem('userName')
const email = localStorage.getItem('userEmail')
const id = localStorage.getItem('user')

const userAuth = computed(() => {
  return {
    userEmail: email,
    userName: fullName,
    userId: userId.value
  }
})

// async function controllUserAuthentication() {
//   const response = await controllUserAuth(userAuth.value)

//   console.log(response)

//   if (response === 201) return
//   else if (response === 401) {
//     router.push({ params: { userId: id } })
//   }
// }

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 1639) desktop.value = true
  else desktop.value = false
}

const user = computed(() => {
  return {
    signedIn: false,
    userId: userId.value
  }
})
function showUserSettings() {
  isUserSettings.value = !isUserSettings.value
}

async function changeUserSignInStatus() {
  const response = await signOutUser(user.value)

  if (response) {
    if (getSignInStatus() === 'false') {
      console.log('hejsan')
      router.push({ name: 'landing page' })
    }
  }
}

function newRequest() {
  // window.history.back()
  router.push(`/user-home-new-request/${userId.value}`)
}

function countNumberOfAnswers(totalAnswers: number) {
  if (totalAnswers < 1) showEmptyMessage.value = true
  else showEmptyMessage.value = false
}

function closeSettingsMenu() {
  isUserSettings.value = !isUserSettings.value
}

onMounted(async () => {
  const auth = getAuth()
  console.log(auth.currentUser?.email)
  const user = {
    userEmail: auth.currentUser?.email
  }
  const response = await axios.post('http://localhost:3000/users/signedInUser', user)

  firstName.value = response.data.message ? response.data.message.split(' ')[0] : ''
})
</script>

<template>
  <UserSettings
    v-if="isUserSettings"
    :signOutFunction="changeUserSignInStatus"
    :closeMenu="closeSettingsMenu"
  ></UserSettings>
  <DialogBox v-if="isDialog"></DialogBox>
  <SideNav v-if="desktop" :signOutFunction="changeUserSignInStatus"></SideNav>
  <div class="bg-red-500 flex justify-between p-4 text-xl sm:text-2xl">
    <h2>Hej {{ firstName }}!</h2>
    <button
      type="button"
      class="btn-transparent text-main z-index-2"
      @click="showUserSettings"
      v-if="!desktop"
    >
      <fontAwesome :icon="['fas', 'user']" class="w-4 h-4" />
    </button>
  </div>
  <div class="signed-in-main">
    <button type="button" class="main-btn px-6 text-main" @click="newRequest">Ny förfrågan</button>
    <p v-if="showEmptyMessage" class="text-main font-title-bold margin-tp-32">
      Whoops, här var det tomt!
    </p>
  </div>

  <UserHomeAnswers :numberOfAnswers="countNumberOfAnswers"></UserHomeAnswers>
</template>
