<script setup lang="ts">
import router from '@/router'
import { signOutUser } from '@/services/signOutUser'
import { controllUserAuth } from '@/services/userAuth'
import { computed, onMounted, ref } from 'vue'
import RepairShopForm from '../repairShopHome/RepairShopForm.vue'
import UserSettings from '../userHome/UserSettings.vue'
import { getSignInStatus } from '../utils/signInStatus'

const isSideNav = ref(false)
const isUserSettings = ref(false)

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

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

async function controllUserAuthentication() {
  console.log(id)
  const response = await controllUserAuth(userAuth.value)

  console.log(response)

  if (response === 201) return
  else if (response === 401) {
    router.push({ params: { userId: id } })
  }
}

function showUserSettings() {
  isUserSettings.value = !isUserSettings.value
}

const user = computed(() => {
  return {
    signedIn: false,
    userId: userId.value
  }
})

async function changeUserSignInStatus() {
  const response = await signOutUser(user.value)

  console.log(response)

  if (response) {
    if (getSignInStatus() === 'false') {
      console.log('hejsan')
      router.push({ name: 'landing page' })
    }
  }
}

function closeSettingsMenu() {
  isUserSettings.value = !isUserSettings.value
}

onMounted(() => {
  controllUserAuthentication()

  if (getSignInStatus() === 'false') {
    router.push('/')
  }
})
</script>

<template>
  <UserSettings
    v-if="isUserSettings"
    :signOutFunction="changeUserSignInStatus"
    :closeMenu="closeSettingsMenu"
  ></UserSettings>
  <div class="repair-shop-home-parent">
    <div class="repair-shop-signed-in-header">
      <h2>Hej {{ fullName }}</h2>
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
