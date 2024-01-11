<script setup lang="ts">
import RepairShopForm from '../repairShopHome/RepairShopForm.vue'

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const fullname = getCookie('name')
</script>

<template>
  <div class="signed-in-header">
    <h2>Hej {{ fullname }}</h2>
  </div>
  <div class="signed-in-main">
    <RepairShopForm></RepairShopForm>
  </div>
</template>
