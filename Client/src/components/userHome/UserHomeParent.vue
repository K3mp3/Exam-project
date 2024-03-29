<script setup lang="ts">
import router from '@/router'
import { signOutUser } from '@/services/signInUser'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useSignInStore } from '@/stores/signInStore'
import { computed, onMounted, ref } from 'vue'
import { removeCookies } from '../cookies/RemoveCookies'
import DialogBox from '../dialogs/DialogBox.vue'
import SideNavParent from '../sideNav/SideNavParent.vue'
import UserContactPage from '../userHome/UserContactPage.vue'
import UserSettings from './UserSettings.vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const isSideNav = ref(false)
const isUserSettings = ref(false)

const isSignedIn = computed(() => useSignInStore().signedIn)
const isDialog = computed(() => useShowPopUp().showPopUp)

let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width > 899) {
    isSideNav.value = true
  } else {
    isSideNav.value = false
  }
}

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const fullname = getCookie('name')
const email = getCookie('email')
const isCookieAccepted = getCookie('accept')

const firstName = fullname ? fullname.split(' ')[0] : ''

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

onMounted(() => {
  updateScreenSize()

  if (!isSignedIn.value) {
    router.push('/')
  }
})
</script>

<template>
  <UserSettings v-if="isUserSettings" :signOutFunction="changeUserSignInStatus"></UserSettings>
  <DialogBox v-if="isDialog"></DialogBox>
  <SideNavParent v-if="isSideNav" :signOutFunction="changeUserSignInStatus"></SideNavParent>
  <div class="signed-in-header">
    <h2>Hej {{ firstName }}</h2>
    <button
      v-if="!isSideNav"
      type="button"
      class="user-home-profile-btn text-main z-index-2"
      @click="showUserSettings"
    >
      <fontAwesome :icon="['fas', 'user']" />
    </button>
  </div>
  <div class="signed-in-main">
    <UserContactPage></UserContactPage>
  </div>
</template>
