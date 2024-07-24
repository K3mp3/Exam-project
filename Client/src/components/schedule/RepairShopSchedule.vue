<script setup lang="ts">
import type { INewJob } from '@/models/INewJob'
import { getJob, saveJob } from '@/services/saveJob'
import { getAuth } from 'firebase/auth'
import DatePicker from 'primevue/datepicker'
import { computed, nextTick, onMounted, ref, watch, type Ref } from 'vue'
import RegistrationNumberInput from '../userHome/newRequest/RegistrationNumberInput.vue'

const date = ref('')
const registrationNumber = ref('')

const isBtnDisabled = ref(true)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isDate', value: false },
  { key: 'isRegistrationNumber', value: false }
]

const bookedJobs = ref<INewJob[]>([])

const auth = getAuth()

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

function saveBooking() {
  const job = computed(() => {
    return {
      date: date.value,
      registrationNumber: registrationNumber.value,
      time: new Date().getTime(),
      repairShopEmail: auth.currentUser?.email as string
    }
  })

  bookedJobs.value.push(job.value)

  console.log('bookedJobs:', bookedJobs)

  const response = saveJob(job.value)

  nextTick(() => {})

  date.value = ''
  registrationNumber.value = ''

  checkInputsData('isDate')
  checkInputsData('isRegistrationNumber')
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('en-SE', {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

watch(date, (newValue) => {
  checkInputsData('isDate')
  console.log('Selected date:', newValue)
})

onMounted(async () => {
  try {
    const response = await getJob()

    bookedJobs.value = Array.isArray(response) ? response : [response]

    console.log('response:', response)
  } catch (error) {
    alert('Kunde inte hämta bokade jobb')
  }
})
</script>

<template>
  <div class="p-4 text-main flex flex-col gap-4 md:gap-8 xl:gap-16 max-w-[700px] margin-auto">
    <h2 class="text-xl sm:text-2xl w-full md:text-center">Boka in kund</h2>

    <div class="flex flex-col gap-4 md:flex-row md:gap-6">
      <label class="flex flex-col gap-1 w-full">
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
    </div>

    <button
      type="submit"
      :disabled="isBtnDisabled"
      :class="{
        'main-btn-disabled mt-5 mb-9': isBtnDisabled,
        'main-btn mt-5 mb-9': !isBtnDisabled
      }"
      @click="saveBooking"
    >
      Spara
    </button>

    <h2>Bokningar</h2>
    <div
      class="w-full el-bg-gray rounded-lg p-2 border-main flex flex-col gap-1"
      v-for="job in bookedJobs"
      :key="job.time"
    >
      <h3>Registreringsnummer: {{ job.registrationNumber }}</h3>
      <p>Datum: {{ formatDate(job.date) }}</p>
    </div>
  </div>
</template>

<style scoped></style>
