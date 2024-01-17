<script setup lang="ts">
const props = defineProps({
  index: {
    type: Object,
    required: true
  }
})

console.log(props)
</script>

<template>
  <div class="message-dialog-background">
    <div class="message-dialog-content-container">
      <div class="message-dialog-left">
        <p>{{ props.index.name }}</p>
      </div>
    </div>
  </div>
</template>
