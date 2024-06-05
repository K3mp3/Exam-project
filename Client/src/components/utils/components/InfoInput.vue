<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  checkInputData: {
    type: Function,
    required: true
  },
  inputData: {
    type: Function,
    required: true
  },
  inputType: {
    type: String,
    required: true
  },
  inputName: {
    type: String,
    required: true
  },
  isDataCorrect: {
    type: Boolean,
    required: true
  },
  dataError: {
    type: Boolean
  },
  placeholder: {
    type: String,
    required: true
  },
  predefinedValue: {
    type: String
  },
  onBlur: {
    type: Function
  }
})

const inputValue = ref(props.predefinedValue || '')

watch(() => props.predefinedValue, (newValue) => {
  if (newValue !== undefined) {
    inputValue.value = newValue
  }
})

const emit = defineEmits(['update:predefinedValue'])

function handleChange() {
  props.checkInputData(props.inputName)
  props.inputData(inputValue.value)
  emit('update:predefinedValue', inputValue.value)
}

function handleBlur() {
  if (props.onBlur) {
    props.onBlur(inputValue.value)
  }
}

console.log(props.predefinedValue)
</script>

<template>
  <input
  :type="props.inputType"
  :name="props.inputName"
  :placeholder="props.placeholder"
  v-model="inputValue"
  @input="handleChange"
  @blur="handleBlur"
  :class="[
    'w-full text-input px-2',
    !props.isDataCorrect && 'input-warning',
    props.dataError && 'input-error'
  ]"
  />
</template>
