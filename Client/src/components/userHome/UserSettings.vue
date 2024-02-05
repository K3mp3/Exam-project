<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  signOutFunction: (payload: MouseEvent) => void
}>()
</script>

<template>
  <div class="user-settings-background">
    <div class="user-settings-container">
      <ul>
        <li>
          <button
            type="button"
            class="user-home-sign-out-btn text-main z-index-2"
            @click="signOutFunction"
          >
            <fontAwesome :icon="['fas', 'right-from-bracket']" />
            Logga ut
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
