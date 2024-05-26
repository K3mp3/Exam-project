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
    type: [],
    required: true
  },
  optionValue: {
    type: String,
    required: true
  },
  optionLabel: {
    type: String,
    required: true
  }
})

const data = ref('')

function handleChange() {
  props.checkInputData(props.inputName)
  props.inputData(data.value)
}
</script>

<template>
  <select :name="props.inputName" v-model="data" @change="handleChange">
    <option v-for="option in props.options" :key="option" :value="props.optionValue">
      {{ props.optionLabel }}
    </option>
  </select>
</template>
