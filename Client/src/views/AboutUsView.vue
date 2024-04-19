<script setup lang="ts">
import ConsumerFooter from '@/components/footer/ConsumerFooter.vue'
import ConsumerNav from '@/components/nav/ConsumerNav.vue'

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
  <nav>
    <ConsumerNav />
  </nav>
  <header>
    <div class="header-parent-container">
      <div class="register-tab">
        <h2>Jämför och <span>spara</span></h2>
        <p>Hitta prisvärda verkstäder</p>
        <input type="text" placeholder="namn@domän.com" v-model="userEmail" />
        <button type="button" class="header-register-link" @click="saveUserEmail">
          Registrera
        </button>
      </div>
      <div class="fade-container"></div>
    </div>
  </header>
  <footer>
    <ConsumerFooter />
  </footer>
</template>
