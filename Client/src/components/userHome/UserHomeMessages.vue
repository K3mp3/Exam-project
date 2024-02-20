<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  index: {
    type: Object,
    required: true
  }
})

console.log(props.index)

const isCollaspedMessageBox = ref(true)

function collapseMessageBox() {
  isCollaspedMessageBox.value = !isCollaspedMessageBox.value
}

const userName = localStorage.getItem('userName')
</script>

<template>
  <p :class="isCollaspedMessageBox ? 'message-box-collapesed' : ''">
    <button type="button" @click="collapseMessageBox" class="collapse-message-box">
      <fontAwesome :icon="['fas', 'chevron-down']" v-if="isCollaspedMessageBox" /><fontAwesome
        :icon="['fas', 'chevron-up']"
        v-if="!isCollaspedMessageBox"
      />
    </button>
    <span :class="userName === index.name ? 'text-active-blue' : ''">{{
      userName === props.index.name ? 'Du' : props.index.name
    }}</span>
    <span v-if="!isCollaspedMessageBox">{{ props.index.message }}</span>
  </p>
</template>
