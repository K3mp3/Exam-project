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

const data = ref('')

function handleChange() {
  props.checkInputData(props.inputName)
  props.inputData(data.value)
}

function handleBlur() {
  if (props.onBlur) {
    props.onBlur(data.value)
  }
}

console.log(props.predefinedValue)
</script>

<template>
  <input
    :type="props.inputType"
    :name="props.inputName"
    :placeholder="props.placeholder"
    :value="predefinedValue ? predefinedValue : data"
    v-model="data"
    @input="handleChange"
    @blur="handleBlur"
    :class="['w-full text-input px-2', props.isDataCorrect ? 'text-input' : 'input-warning']"
  />
</template>
