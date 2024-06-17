<script setup lang="ts">
import { ref } from 'vue'
import NavMoreDialog from '../dialogs/NavMoreDialog.vue'

const activeButton = ref('')
</script>

<template>
  <NavMoreDialog />
  <div class="w-screen p-4 z-10 fixed bottom-0 left-0">
    <div class="flex flex-col px-4 rounded-lg border-main bg-main-40 backdrop-blur-sm gap-8">
      <ul class="flex flex-row justify-center items-center gap-4">
        <li class="activeUrl list-style-none w-full">
          <button
            type="button"
            :class="[
              'w-full text-main font-text-light flex flex-col gap-1 p-4',
              activeButton === 'inbox' && 'ease-in-out duration-300 text-active-blue'
            ]"
            @click="() => (activeButton = 'inbox')"
          >
            <fontAwesome :icon="['fas', 'inbox']" />
          </button>
        </li>
        <li class="activeUrl list-style-none w-full">
          <button
            type="button"
            :class="[
              'w-full text-main font-text-light flex flex-col gap-1 p-4',
              activeButton === 'more' && 'ease-in-out duration-300 text-active-blue'
            ]"
            @click="() => (activeButton = 'more')"
          >
            <fontAwesome :icon="['fas', 'plus']" />
          </button>
        </li>
        <li class="activeUrl list-style-none w-full">
          <button
            type="button"
            :class="[
              'w-full text-main font-text-light flex flex-col gap-1 p-4',
              activeButton === 'sign-out' && 'ease-in-out duration-300 text-active-blue'
            ]"
            @click="() => (activeButton = 'sign-out')"
          >
            <fontAwesome :icon="['fas', 'right-from-bracket']" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
