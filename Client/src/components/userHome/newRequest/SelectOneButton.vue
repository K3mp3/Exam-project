<script setup lang="ts"></script>

<template>
  <button
    type="button"
    :class="['text-main', activeButton === 'second' ? 'border-button-active' : 'border-button']"
    @click="activeButton = 'second'"
  >
    <p>AC-Service + rengöring</p>
  </button>
</template>
