<script setup lang="ts">
import router from '@/router'
import { signOutUser } from '@/services/signInUser'
import { useSignInStore } from '@/stores/signInStore'
import { computed, onMounted, ref } from 'vue'
import { removeCookies } from '../cookies/RemoveCookies'
import RepairShopForm from '../repairShopHome/RepairShopForm.vue'
import UserSettings from '../userHome/UserSettings.vue'

const isSignedIn = computed(() => useSignInStore().signedIn)

const isSideNav = ref(false)
const isUserSettings = ref(false)

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

function showUserSettings() {
  isUserSettings.value = !isUserSettings.value
}

const user = computed(() => {
  return {
    email: email || '',
    signedIn: false
  }
})

async function changeUserSignInStatus() {
  const response = await signOutUser(user.value)

  if (response) {
    const isUserSignedIn = useSignInStore()
    isUserSignedIn.signInUser(!isSignedIn.value)

    if (!isSignedIn.value) {
      removeCookies()
      router.push({ name: 'landing page' })
    }
  }
}

onMounted(() => {
  if (!isSignedIn.value) {
    router.push({ name: 'landing page' })
  }
})
</script>

<template>
  <UserSettings v-if="isUserSettings" :signOutFunction="changeUserSignInStatus"></UserSettings>
  <div class="repair-shop-home-parent">
    <div class="repair-shop-signed-in-header">
      <h2>Hej {{ fullname }}</h2>
      <button
        v-if="!isSideNav"
        type="button"
        class="btn-transparent text-main z-index-2"
        @click="showUserSettings"
      >
        <fontAwesome :icon="['fas', 'user']" />
      </button>
    </div>
    <div class="repair-shop-signed-in-main">
      <RepairShopForm></RepairShopForm>
    </div>
  </div>
</template>
