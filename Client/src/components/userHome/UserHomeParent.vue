<script setup lang="ts">
import router from '@/router'

import { signOutUser } from '@/services/signOutUser'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { computed, onMounted, ref } from 'vue'
import DialogBox from '../dialogs/DialogBox.vue'
import BottomNav from '../nav/BottomNav.vue'
import SideNav from '../sideNav/SideNav.vue'
import { getSignInStatus } from '../utils/signInStatus'
import UserHomeAnswers from './UserHomeAnswers.vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const width = ref<number>()
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

  firstName.value = response.data.message ? response.data.message.split(' ')[0] : ''
})
</script>

<template>
  <DialogBox v-if="isDialog"></DialogBox>
  <div v-if="width && width < 768">
    <div class="p-4 text-xl sm:text-2xl">
      <h2>Hej {{ firstName }}!</h2>
    </div>
    <div class="signed-in-main">
      <button
        type="button"
        class="flex gap-2 items-center main-btn px-6 text-main"
        @click="newRequest"
      >
        <fontAwesome :icon="['fa-solid', 'fa-pen-to-square']" />Ny förfrågan
      </button>
    </div>

    <UserHomeAnswers />
    <BottomNav />
  </div>

  <div v-if="width && width > 767">
    <div class="flex gap-8 w-screen">
      <SideNav :signOutFunction="changeUserSignInStatus" @newRequest="newRequest"></SideNav>

      <div class="p-8">
        <!-- <UserHomeAnswers /> -->
      </div>
    </div>
  </div>
</template>
