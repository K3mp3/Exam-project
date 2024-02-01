<script setup lang="ts">
import { useShowMobileNavMenu } from '@/stores/showMobileNavMenuStore'
import { computed } from 'vue'

const isMenuOpoen = computed(() => useShowMobileNavMenu().showMenu)

function closeNavMenu() {
  const showMobileNavMenu = useShowMobileNavMenu()
  showMobileNavMenu.showNavMenu(!isMenuOpoen.value)
}
</script>

<template>
  <div class="menu-container" v-if="isMenuOpoen">
    <button type="button" @click="closeNavMenu"><fontAwesome :icon="['fas', 'x']" /></button>
    <ul>
      <li>
        <RouterLink to="/" class="router-link" @click="closeNavMenu"
          ><fontAwesome :icon="['fas', 'house']" /> hem</RouterLink
        >
      </li>
      <li>
        <RouterLink to="sign-in" class="router-link" @click="closeNavMenu"
          ><fontAwesome :icon="['fas', 'right-to-bracket']" />Logga in</RouterLink
        >
      </li>
      <li>
        <RouterLink to="register" class="router-link" @click="closeNavMenu"
          ><fontAwesome :icon="['fas', 'house']" /> Registrera</RouterLink
        >
      </li>
      <li>
        <RouterLink to="contact" class="router-link" @click="closeNavMenu"
          ><fontAwesome :icon="['fas', 'address-book']" /> Kontakt</RouterLink
        >
      </li>
      <li>
        <RouterLink to="register" class="router-link"
          ><fontAwesome :icon="['fas', 'address-card']" /> Om oss</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
