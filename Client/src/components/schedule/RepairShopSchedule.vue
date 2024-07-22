<script setup lang="ts">
import DatePicker from 'primevue/datepicker'
import { nextTick, ref, watch, type Ref } from 'vue'
import RegistrationNumberInput from '../userHome/newRequest/RegistrationNumberInput.vue'

const date = ref()
const registrationNumber = ref('')

const isBtnDisabled = ref(true)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isDate', value: false },
  { key: 'isRegistrationNumber', value: false }
]

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
  console.log(inputsArray)
}

function checkInputsData(confirmKey: string) {
  console.log('confirmKey:', confirmKey)

  nextTick(() => {
    let refVariable: Ref<string> | null = null
    switch (confirmKey) {
      case 'isDate':
        refVariable = date
        break
      case 'isRegistrationNumber':
        refVariable = registrationNumber
        break
      default:
        break
    }

    if (refVariable?.value === '' || refVariable?.value === null) {
      const index = inputsArray.findIndex((field) => field.key === confirmKey)

      if (index !== -1) {
        inputsArray[index].value = false
      } else {
        inputsArray.push({ key: confirmKey, value: false })
      }

      checkInputData()
      return
    } else {
      const index = inputsArray.findIndex((field) => field.key === confirmKey)

      if (index !== -1) {
        inputsArray[index].value = true
      } else {
        inputsArray.push({ key: confirmKey, value: true })
      }

      checkInputData()
    }
  })
}

watch(date, (newValue) => {
  checkInputsData('isDate')
  console.log('Selected date:', newValue)
})
</script>

<template>
  <div class="p-4 text-main flex flex-col gap-4">
    <label class="flex flex-col gap-1">
      <p>Datum och tid</p>
      <DatePicker
        v-model="date"
        dateFormat="yy/mm/dd"
        showButtonBar
        showTime
        hourFormat="24"
        fluid
      />
    </label>

    <RegistrationNumberInput
      :checkInputData="(e: string) => checkInputsData(e)"
      :inputData="(e: string) => (registrationNumber = e)"
    ></RegistrationNumberInput>

    <button
      type="submit"
      :disabled="isBtnDisabled"
      :class="{
        'main-btn-disabled mt-5 mb-9': isBtnDisabled,
        'main-btn mt-5 mb-9': !isBtnDisabled
      }"
    >
      Spara
    </button>
  </div>
</template>

<style scoped></style>
