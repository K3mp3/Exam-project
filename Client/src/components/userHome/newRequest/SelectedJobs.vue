<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  work: [string[], string, string]
}>()

const isWorkDetails = ref(false)

function showWorkDetails() {
  isWorkDetails.value = !isWorkDetails.value
}

function cleanArrayString(array: String[], text: string) {
  const data = {
    array: array.join(', '),
    text: text
  }
  return data
}
</script>

<template>
  <div class="w-full el-bg-gray rounded-lg px-2 py-1 border-main">
    <div class="flex justify-between items-center relative">
      <h3 class="font-title-bold text-base">{{ props.work[2] }}</h3>
      <button
        type="button"
        @click="showWorkDetails"
        class="w-full h-10 absolute flex justify-end py-2"
      >
        <fontAwesome :icon="['fas', 'chevron-down']" v-if="!isWorkDetails" /><fontAwesome
          :icon="['fas', 'chevron-up']"
          v-if="isWorkDetails"
        />
      </button>
    </div>

    <p>{{ cleanArrayString(props.work[0], props.work[1]).array }}</p>
    <p>{{ cleanArrayString(props.work[0], props.work[1]).text }}</p>
  </div>
</template>
