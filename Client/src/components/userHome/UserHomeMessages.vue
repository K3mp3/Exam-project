<script setup lang="ts">
const props = defineProps({
  index: {
    type: Object,
    required: true
  }
})

const userName = localStorage.getItem('userName')
</script>

<template>
  <p>
    <button type="button"><fontAwesome :icon="['fas', 'chevron-up']" /></button>
    <span :class="userName === index.name ? 'text-active-blue' : ''">{{
      userName === props.index.name ? 'Du' : props.index.name
    }}</span
    >{{ props.index.message }}
  </p>
</template>
