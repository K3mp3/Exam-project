<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  work: [string[], string, string]
}>()

const isWorkDetails = ref(false)

const emits = defineEmits<{
  (e: 'deleteWork', work: string): void
}>()

function showWorkDetails() {
  isWorkDetails.value = !isWorkDetails.value
  // console.log(isWorkDetails.value)
}

function deleteWork() {
  emits('deleteWork', props.work[2])
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
  <div class="flex flex-col gap-2 py1-1">
    <button type="button" @click="deleteWork" class="w-full flex px-2">
      <fontAwesome :icon="['fas', 'trash']" class="w-3" />
    </button>
    <div class="w-full el-bg-gray rounded-lg p-2 border-main">
      <div class="flex justify-between items-center relative">
        <h3 class="font-title-bold text-base">{{ props.work[2] }}</h3>
        <button
          type="button"
          @click="showWorkDetails"
          class="w-full h-10 absolute flex justify-end py-[9px]"
        >
          <fontAwesome :icon="['fas', 'chevron-down']" v-if="!isWorkDetails" /><fontAwesome
            :icon="['fas', 'chevron-up']"
            v-if="isWorkDetails"
          />
        </button>
      </div>
      <div v-if="isWorkDetails">
        <p>{{ cleanArrayString(props.work[0], props.work[1]).array }}</p>
        <p>{{ cleanArrayString(props.work[0], props.work[1]).text }}</p>
      </div>
    </div>
  </div>
</template>
