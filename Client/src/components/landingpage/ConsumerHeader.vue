<script setup lang="ts">
import router from '@/router'
import { useShowUserEmail } from '@/stores/showUserEmail'
import { nextTick, onMounted, ref } from 'vue'

const userEmail = ref('')

const navTablet = ref(false)

let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width > 699) {
    navTablet.value = true
  } else {
    navTablet.value = false
  }
}

function saveUserEmail() {
  nextTick(() => {
    if (userEmail.value === '') {
      router.push({ name: 'register form' })
      return
    } else {
      const writtenEmail = useShowUserEmail()
      writtenEmail.useUserEmail(userEmail.value, true)
      router.push({ name: 'register form' })
    }
  })
}

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <img src="../../assets/img/headerCar.png" />

  <div class="header-parent-container">
    <div class="register-tab">
      <h2>Jämför och <span>spara</span></h2>
      <p>Hitta prisvärda verkstäder</p>
      <input type="text" placeholder="namn@domän.com" v-model="userEmail" />
      <button type="button" class="header-register-link" @click="saveUserEmail">Registrera</button>
    </div>
    <div class="fade-container"></div>
  </div>
</template>
