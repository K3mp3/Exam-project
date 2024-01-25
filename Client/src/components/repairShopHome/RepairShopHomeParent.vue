<script setup lang="ts">
import router from '@/router'
import { signOutUser } from '@/services/signInUser'
import { useSignInStore } from '@/stores/signInStore'
import { computed, onMounted } from 'vue'
import RepairShopForm from '../repairShopHome/RepairShopForm.vue'

const isSignedIn = computed(() => useSignInStore().signedIn)

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

const user = computed(() => {
  return {
    email: email || '',
    signedIn: false
  }
})

async function changeUserSignInStatus() {
  const response = await signOutUser(user.value)
  console.log(response)

  if (response) {
    const isUserSignedIn = useSignInStore()
    isUserSignedIn.signInUser(!isSignedIn.value)

    if (!isSignedIn.value) {
      router.push({ name: 'landing page' })
    }
  }
}

onMounted(() => {
  // if (!isSignedIn.value) {
  //   router.push({ name: 'landing page' })
  // }
})
</script>

<template>
  <div class="repair-shop-home-parent">
    <div class="repair-shop-signed-in-header">
      <h2>Hej {{ fullname }}</h2>
      <button
        type="button"
        class="repair-shop-home-sign-out-btn text-main z-index-2"
        @click="changeUserSignInStatus"
      >
        <fontAwesome :icon="['fas', 'gear']" />
        Logga ut
      </button>
    </div>
    <div class="repair-shop-signed-in-main">
      <RepairShopForm></RepairShopForm>
    </div>
  </div>
</template>
