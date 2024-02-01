<script setup lang="ts"></script>

<template>
  <div class="user-settings-container">
    <ul>
      <li>
        <button
          v-if="!isSideNav"
          type="button"
          class="user-home-sign-out-btn text-main z-index-2"
          @click="showUserSettings"
        >
          <fontAwesome :icon="['fas', 'right-from-bracket']" />
          Logga ut
        </button>
      </li>
    </ul>
  </div>
</template>
