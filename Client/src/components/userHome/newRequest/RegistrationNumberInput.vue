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

const registrationNumber = ref('')

const isRegistrationNumberValid = ref(true)

function controlRegistrationNumber(value: string) {
  const registrationRegex = /^[a-zA-Z0-9\s]*$/
  isRegistrationNumberValid.value = registrationRegex.test(value)
  console.log(isRegistrationNumberValid.value)
}

function handleChange() {
  controlRegistrationNumber(registrationNumber.value)

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
</script>

<template>
  <label for="registrationNumber">Registreringsnummer</label>
  <input
    type="text"
    name="registrationNumber"
    placeholder="ABC 123"
    v-model="registrationNumber"
    @input="formatRegistrationNumber"
    class="px-2"
    maxlength="7"
  />
  <p
    class="text-warning-orange font-text-light display-flex gap-8 align-items-center margin-top-n11 margin-bm-16"
    v-if="!isRegistrationNumberValid"
  >
    <fontAwesome :icon="['fas', 'triangle-exclamation']" class="text-warning-orange" />Ange ett
    giltigt registreringsnummer!
  </p>
</template>
