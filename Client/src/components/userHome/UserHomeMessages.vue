<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from 'vue'

const props = defineProps({
  index: {
    type: Object as () => Record<string, any>,
    required: true
  },
  amount: {
    type: Array as () => Message[],
    required: true
  }
})

interface Message {
  date: string
}

const isCollaspedMessageBox = ref(true)
const isLastMessageBox = ref(false)

const instance = getCurrentInstance()

const userName = localStorage.getItem('userName')

function collapseMessageBox() {
  isCollaspedMessageBox.value = !isCollaspedMessageBox.value
}

watch(
  () => props.index,
  () => {
    const lastDateInAmount = props.amount[props.amount.length - 1].date
    if (lastDateInAmount === props.index.date) isCollaspedMessageBox.value = false
    else isCollaspedMessageBox.value == true
  },
  { immediate: true }
)

onMounted(() => {
  console.log(props.index)
})
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
