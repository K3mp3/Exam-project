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
  <div class="w-full h-full pt-[254px] pb-[115px] flex items-center justify-center">
    <div class="w-[355px] h-[355px] z-10 border border-gr-blue absolute rounded-full"></div>
    <div class="w-[405px] h-[405px] border border-gr-purple absolute rounded-full"></div>
    <div class="flex flex-col gap-2 items-center text-main xl:gap-4 z-20">
      <h2 class="text-xl font-extrabold sm:text-3xl xl:text-5xl">
        Jämför och <span class="text-light-blue-gr">spara</span>
      </h2>
      <p class="sm:text-lg xl:text-xl">Hitta prisvärda verkstäder</p>
      <input
        type="text"
        placeholder="dinmail@mail.se"
        v-model="userEmail"
        class="text-input px-2"
      />
      <button type="button" class="main-btn-white w-full mt-2" @click="saveUserEmail">
        Registrera
      </button>
    </div>
    <div class="fade-container"></div>
  </div>
</template>
