<script setup lang="ts">
import router from '@/router'

import { signOutUser } from '@/services/signOutUser'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useSignInStore } from '@/stores/signInStore'
import { computed, onMounted, ref } from 'vue'
import { removeCookies } from '../cookies/RemoveCookies'
import DialogBox from '../dialogs/DialogBox.vue'
import SideNavParent from '../sideNav/SideNavParent.vue'
import UserHomeAnswers from './UserHomeAnswers.vue'
import UserSettings from './UserSettings.vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const isUserSettings = ref(false)
const desktop = ref(false)

const isSignedIn = computed(() => useSignInStore().signedIn)
const isDialog = computed(() => useShowPopUp().showPopUp)

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 1599) desktop.value = true
  else desktop.value = false
}

const fullName = localStorage.getItem('userName')
const email = localStorage.getItem('userEmail')
const isCookieAccepted = getCookie('accept')

const firstName = fullName ? fullName.split(' ')[0] : ''

const user = computed(() => {
  return {
    _id: userId.value || '',
    signedIn: false
  }
})

function showUserSettings() {
  isUserSettings.value = !isUserSettings.value
}

async function changeUserSignInStatus() {
  const response = await signOutUser(user.value)

  if (response) {
    const isUserSignedIn = useSignInStore()
    isUserSignedIn.signInUser(!isSignedIn.value)

    if (!isSignedIn.value) {
      if (isCookieAccepted === 'true') {
        removeCookies()
        router.push({ name: 'landing page' })
      } else {
        router.push({ name: 'landing page' })
      }
    }
  }
}

function newRequest() {
  // window.history.back()
  router.push(`/user-home-new-request/${userId.value}`)
}

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <UserSettings v-if="isUserSettings" :signOutFunction="changeUserSignInStatus"></UserSettings>
  <DialogBox v-if="isDialog"></DialogBox>
  <SideNavParent v-if="desktop" :signOutFunction="changeUserSignInStatus"></SideNavParent>
  <div class="signed-in-header">
    <h2>Hej {{ firstName }}</h2>
    <button type="button" class="btn-transparent text-main z-index-2" @click="showUserSettings">
      <fontAwesome :icon="['fas', 'user']" />
    </button>
  </div>
  <div class="signed-in-main">
    <button type="button" class="user-home-new-btn text-main z-index-2" @click="newRequest">
      Ny förfrågan
    </button>
  </div>

  <UserHomeAnswers></UserHomeAnswers>
</template>
