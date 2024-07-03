<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  work: [string[], string]
}>()

const isWorkDetails = ref(false)

function showWorkDetails() {
  isWorkDetails.value = !isWorkDetails.value
}

function cleanArrayString(array: String[]): string {
  return array.join(', ')
}
</script>

<template>
  <div class="w-full el-bg-gray rounded-lg px-2 py-1 border-main">
    <div class="flex justify-between items-center relative">
      <h3 class="font-title-bold text-base">{{ props.work[1] }}</h3>
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

    <p v-if="isWorkDetails">{{ cleanArrayString(props.work[0]) }}</p>
  </div>
</template>
