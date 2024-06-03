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
  },
  inputName: {
    type: String,
    required: true
  },
  options: {
    type: Array<{ value: string; label: string }>,
    required: true
  },
  defaultValue: {
    type: String
  }
})

const data = ref('')

function handleChange() {
  props.checkInputData(props.inputName)
  props.inputData(data.value)
}
</script>

<template>
  <select :name="props.inputName" v-model="data" @change="handleChange" class="w-full">
    <option v-for="option in props.options" :key="option.label" :value="option.label">
      {{ option.label }}
    </option>
  </select>
</template>
