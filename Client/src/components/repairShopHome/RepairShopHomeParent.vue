<script setup lang="ts">
import router from '@/router'
import { signOutUser } from '@/services/signOutUser'
import { useSignInStore } from '@/stores/signInStore'
import { computed, onMounted, ref } from 'vue'
import RepairShopForm from '../repairShopHome/RepairShopForm.vue'
import UserSettings from '../userHome/UserSettings.vue'

const isSignedIn = computed(() => useSignInStore().signedIn)

const isSideNav = ref(false)
const isUserSettings = ref(false)

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const fullname = localStorage.getItem('userName')
const email = localStorage.getItem('userEmail')

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
    const isUserSignedIn = useSignInStore()
    isUserSignedIn.signInUser(false)

    if (!isSignedIn.value) {
      router.push({ name: 'landing page' })
    }
  }
}

function closeSettingsMenu() {
  isUserSettings.value = !isUserSettings.value
}

onMounted(() => {
  if (!isSignedIn.value) {
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
