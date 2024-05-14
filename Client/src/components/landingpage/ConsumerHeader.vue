<script setup lang="ts">
import router from '@/router'
import { nextTick, ref } from 'vue'

const userEmail = ref('')

function saveUserEmail() {
  nextTick(() => {
    if (userEmail.value === '') {
      router.push({ name: 'register form' })
      return
    } else {
      localStorage.setItem('userEmail', userEmail.value)
      router.push({ name: 'register form' })
    }
  })
}
</script>

<template>
  <img src="../../assets/img/headerCar.png" />

  <div class="w-full h-full absolute top-0 flex items-center justify-center">
    <div class="flex flex-col gap-2 mt-16 items-center text-main xl:gap-4">
      <h2 class="text-xl font-extrabold sm:text-3xl xl:text-5xl">
        Jämför och <span class="text-light-blue-gr">spara</span>
      </h2>
      <p class="sm:text-lg xl:text-xl">Hitta prisvärda verkstäder</p>
      <input
        type="text"
        placeholder="dinmail@mail.se"
        v-model="userEmail"
        class="text-input px-4"
      />
      <button type="button" class="main-btn-white w-full mt-2" @click="saveUserEmail">
        Registrera
      </button>
    </div>
    <div class="fade-container"></div>
  </div>
</template>
