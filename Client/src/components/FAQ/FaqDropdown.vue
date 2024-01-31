<script setup lang="ts">
import { ref } from 'vue'

const extendedDropDown = ref(false)

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

function extendDropDown() {
  extendedDropDown.value = !extendedDropDown.value
}
</script>

<template>
  <div class="faq-dropdown">
    <h3 class="font-title-bold O14rem">{{ props.question.title }}</h3>
    <button type="button" class="faq-dropdown-btn" @click="extendDropDown">
      <fontAwesome :icon="['fas', 'chevron-down']" v-if="!extendedDropDown" />
      <fontAwesome :icon="['fas', 'chevron-up']" v-if="extendedDropDown" />
    </button>

    <div class="faq-drop-down-text" v-if="extendedDropDown">
      <p>{{ props.question.text }}</p>
    </div>
  </div>
</template>
