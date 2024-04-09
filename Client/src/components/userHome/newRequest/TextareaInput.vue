<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  checkInputData: {
    type: Function,
    required: true
  },
  inputData: {
    type: Function,
    required: true
  }
})

const message = ref('')

const isMessageValid = ref(true)

function controlMessage(refVariable: string) {
  const messageRegex = /^[^\\]*$/
  isMessageValid.value = messageRegex.test(refVariable)
  console.log(isMessageValid.value)
}

function escapeHtml(text: string) {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }

  return text.replace(/[&<>"']/g, function (m) {
    return map[m]
  })
}

function handleChange() {
  controlMessage(message.value)

  props.checkInputData('isMessage')
  props.inputData(isMessageValid.value ? escapeHtml(message.value) : '')
}
</script>

<template>
  <label for="message-input">Meddelande</label>
  <textarea
    name="message-input"
    v-model="message"
    :class="isMessageValid ? 'text-editor' : 'text-editor-warning'"
    placeholder="Beskriv vad du vill ha hjälp med..."
    @input="handleChange"
  ></textarea>

  <p
    class="text-warning-orange font-text-light display-flex gap-8 align-items-center margin-top-n11 margin-bm-16"
    v-if="!isMessageValid"
  >
    <fontAwesome :icon="['fas', 'triangle-exclamation']" class="text-warning-orange" />Detta tecken
    är ej tillåtet!
  </p>
</template>
