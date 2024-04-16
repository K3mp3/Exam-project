<script setup lang="ts">
import router from '@/router'

import { signOutUser } from '@/services/signOutUser'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useSignInStore } from '@/stores/signInStore'
import { computed, onMounted, ref } from 'vue'
import DialogBox from '../dialogs/DialogBox.vue'
import SideNav from '../sideNav/SideNav.vue'
import UserHomeAnswers from './UserHomeAnswers.vue'
import UserSettings from './UserSettings.vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const isUserSettings = ref(false)
const desktop = ref(false)
const showEmptyMessage = ref(false)

const isSignedIn = computed(() => useSignInStore().signedIn)
const isDialog = computed(() => useShowPopUp().showPopUp)

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 1639) desktop.value = true
  else desktop.value = false
}

const fullName = localStorage.getItem('userName')
const email = localStorage.getItem('userEmail')

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
    isUserSignedIn.signInUser(false)

    if (!isSignedIn.value) {
      router.push({ name: 'landing page' })
    }
  }
}

function newRequest() {
  // window.history.back()
  router.push(`/user-home-new-request/${userId.value}`)
}

function countNumberOfAnswers(totalAnswers: number) {
  console.log(totalAnswers)
  if (totalAnswers < 1) showEmptyMessage.value = true
  else showEmptyMessage.value = false
}

function closeSettingsMenu() {
  isUserSettings.value = !isUserSettings.value
}

onMounted(() => {
  updateScreenSize()
  // if (!isSignedIn.value) {
  //   router.push('/')
  // }
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
  <div class="signed-in-header">
    <h2>Hej {{ firstName }}</h2>
    <button
      type="button"
      class="btn-transparent text-main z-index-2"
      @click="showUserSettings"
      v-if="!desktop"
    >
      <fontAwesome :icon="['fas', 'user']" />
    </button>
  </div>
  <div class="signed-in-main">
    <button type="button" class="user-home-new-btn text-main z-index-2" @click="newRequest">
      Ny förfrågan
    </button>
    <p v-if="showEmptyMessage" class="text-main font-title-bold margin-tp-32">
      Whoops, här var det tomt!
    </p>
  </div>

  <UserHomeAnswers :numberOfAnswers="countNumberOfAnswers"></UserHomeAnswers>
</template>
