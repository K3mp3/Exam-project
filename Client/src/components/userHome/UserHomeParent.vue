<script setup lang="ts">
import router from '@/router'

import { signOutUser } from '@/services/signOutUser'
import { requestDataStore } from '@/stores/requestDataStore'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { computed, onMounted, ref } from 'vue'
import DialogBox from '../dialogs/DialogBox.vue'
import BottomNav from '../nav/BottomNav.vue'
import RepairShopForm from '../repairShopHome/RepairShopForm.vue'
import SideNav from '../sideNav/SideNav.vue'
import { getSignInStatus } from '../utils/signInStatus'
import UserHomeAnswers from './UserHomeAnswers.vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const width = ref<number>()
const firstName = ref('')
const fullName = ref('')
const isRepairShop = ref(false)

const isDialog = computed(() => useShowPopUp().showPopUp)

const requestData = requestDataStore()

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width.value = document.documentElement.clientWidth
}

const user = computed(() => {
  return {
    signedIn: false,
    userId: userId.value
  }
})

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

onMounted(async () => {
  updateScreenSize()

  const auth = getAuth()
  console.log(auth.currentUser?.email)
  const user = {
    userEmail: auth.currentUser?.email
  }
  const response = await axios.post('http://localhost:3000/users/signedInUser', user)

  requestData.sendUserRequestData(
    response.data.message.name,
    response.data.message.email,
    response.data.message.phoneNumber
  )

  firstName.value = response.data.message.name ? response.data.message.name.split(' ')[0] : ''
  fullName.value = response.data.message.name
  isRepairShop.value = response.data.message.repairShop
})
</script>

<template>
  <DialogBox v-if="isDialog"></DialogBox>
  <div v-if="width && width < 768">
    <div class="p-4 text-xl sm:text-2xl">
      <h2 v-if="!isRepairShop">Hej {{ firstName }}!</h2>
      <h2 v-if="isRepairShop">Hej {{ fullName }}!</h2>
    </div>
    <div class="signed-in-main">
      <button
        v-if="!isRepairShop"
        type="button"
        class="flex gap-2 items-center main-btn px-6 text-main"
        @click="newRequest"
      >
        <fontAwesome :icon="['fa-solid', 'fa-pen-to-square']" />Ny förfrågan
      </button>
    </div>

    <UserHomeAnswers v-if="!isRepairShop" />
    <RepairShopForm v-if="isRepairShop" />
    <BottomNav />
  </div>

  <div v-if="width && width > 767" class="flex gap-8 w-screen">
    <div class="fixed">
      <SideNav :signOutFunction="changeUserSignInStatus" @newRequest="newRequest" />
    </div>

    <div class="max-w-[600px] w-full margin-auto">
      <RepairShopForm v-if="isRepairShop" />
    </div>
  </div>
</template>
