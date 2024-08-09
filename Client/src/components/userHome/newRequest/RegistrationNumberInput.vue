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
  modelValue: {
    type: String,
    default: ''
  }
})

const registrationNumber = ref(props.modelValue || '')
const isRegistrationNumberValid = ref(true)
const showWrongRegistrationNumber = ref(false)

function controlRegistrationNumber(value: string) {
  const registrationRegex = /^[A-Z]{3}\s?([0-9]{3}|[0-9]{2}[A-Z])$/
  showWrongRegistrationNumber.value = !registrationRegex.test(value)
  console.log(isRegistrationNumberValid.value)
}

function handleChange() {
  const registrationRegex = /^[A-Z]{3}\s?([0-9]{3}|[0-9]{2}[A-Z])$/
  isRegistrationNumberValid.value = registrationRegex.test(registrationNumber.value)
  console.log(isRegistrationNumberValid.value)

  props.checkInputData('isRegistrationNumber')
  props.inputData(isRegistrationNumberValid.value ? registrationNumber.value : '')
}

function formatRegistrationNumber() {
  let formattedValue = registrationNumber.value.replace(/\s/g, '').toUpperCase()

  if (formattedValue.length > 3) {
    formattedValue = formattedValue.slice(0, 3) + ' ' + formattedValue.slice(3)
  }

  registrationNumber.value = formattedValue

  handleChange()
}

watch(
  () => props.modelValue,
  (newValue) => {
    registrationNumber.value = newValue
  }
)
</script>

<template>
  <label for="registrationNumber" class="font-text-light flex flex-col gap-1 w-full"
    ><span>Registreringsnummer</span>
    <input
      type="text"
      name="registrationNumber"
      placeholder="ABC 123"
      v-model="registrationNumber"
      @input="formatRegistrationNumber"
      :class="['w-full text-input px-2 text-sm', showWrongRegistrationNumber && 'input-warning']"
      maxlength="7"
      @blur="(e) => controlRegistrationNumber((e.target as HTMLInputElement).value)"
    />
    <p
      class="text-warning-orange font-text-light flex gap-2 items-center"
      v-if="showWrongRegistrationNumber"
    >
      <fontAwesome :icon="['fas', 'triangle-exclamation']" class="text-warning-orange" />Ange ett
      giltigt registreringsnummer!
    </p>
  </label>
</template>
