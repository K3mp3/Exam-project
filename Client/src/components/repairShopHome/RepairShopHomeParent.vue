<script setup lang="ts">
import router from '@/router'
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

onMounted(() => {
  if (!isSignedIn.value) {
    router.push({ name: 'landing page' })
  }
})
</script>

<template>
  <div class="repair-shop-home-parent">
    <div class="repair-shop-signed-in-header">
      <h2>Hej {{ fullname }}</h2>
    </div>
    <div class="repair-shop-signed-in-main">
      <RepairShopForm></RepairShopForm>
    </div>
  </div>
</template>
