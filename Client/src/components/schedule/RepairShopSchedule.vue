<script setup lang="ts">
import type { INewJob } from '@/models/INewJob'
import router from '@/router'
import { getUser } from '@/services/getUserType'
import { saveJob } from '@/services/schedule'
import { getAuth } from 'firebase/auth'
import DatePicker from 'primevue/datepicker'
import { computed, nextTick, onMounted, ref, watch, type Ref } from 'vue'
import LoadingSpinner from '../assets/LoadingSpinner.vue'
import RegistrationNumberInput from '../userHome/newRequest/RegistrationNumberInput.vue'
import InfoInput from '../utils/components/InfoInput.vue'
import { fetchJobsFromServer } from '../utils/fecthBookingJobs'
import BookedJobs from './BookedJobs.vue'

const date = ref('')
const registrationNumber = ref('')
const customerEmail = ref('')

const isBtnDisabled = ref(true)
const showEmailError = ref(false)
const isEmailValid = ref(true)
const isRegistrationNumberValid = ref(true)
const isLoading = ref(false)
// const isRepairShop = ref(false)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isDate', value: false },
  { key: 'isRegistrationNumber', value: false },
  { key: 'isEmail', value: false }
]

console.log(inputsArray)

const bookedJobs = ref<INewJob[]>([])

const auth = getAuth()

function checkInputData() {
  isBtnDisabled.value =
    !inputsArray.every((field) => field.value) ||
    !isEmailValid.value ||
    !isRegistrationNumberValid.value
  // console.log(inputsArray)
}

function checkInputsData(confirmKey: string) {
  // console.log('confirmKey:', confirmKey)

  nextTick(() => {
    let refVariable: Ref<string> | null = null
    switch (confirmKey) {
      case 'isDate':
        refVariable = date
        break

      case 'isRegistrationNumber':
        refVariable = registrationNumber
        break
      case 'isEmail':
        {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          isEmailValid.value = emailRegex.test(customerEmail.value.trim())
        }
        refVariable = customerEmail
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

function validateEmail() {
  if (!isEmailValid.value) {
    showEmailError.value = true
  } else showEmailError.value = false
}

async function saveBooking() {
  isLoading.value = true

  const job = computed(() => {
    return {
      date: date.value,
      registrationNumber: registrationNumber.value,
      time: new Date().getTime(),
      repairShopEmail: auth.currentUser?.email as string,
      customerEmail: customerEmail.value
    }
  })

  console.log(job.value)

  await saveJob(job.value)

  bookedJobs.value = await fetchJobsFromServer()

  isLoading.value = false

  date.value = ''
  registrationNumber.value = ''
  customerEmail.value = ''

  checkInputsData('isDate')
  checkInputsData('isRegistrationNumber')
}

async function retrieveJobs() {
  console.log('retrieveJobs')
  bookedJobs.value = await fetchJobsFromServer()
  console.log(bookedJobs.value)
}

watch(date, () => {
  checkInputsData('isDate')
  console.log(date.value)
})

onMounted(async () => {
  console.log('onMounted')
  const response = await getUser()

  retrieveJobs()

  console.log(bookedJobs.value)

  if (!response.userType) {
    router.push(`/user-home/${auth.currentUser?.uid}`)
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

      <label for="email" class="font-text-light flex flex-col gap-1"
        ><span>Kundens email adress</span>
        <InfoInput
          v-model="customerEmail"
          :checkInputData="(e: string) => checkInputsData(e)"
          :inputData="(e: string) => (customerEmail = e)"
          :inputType="'email'"
          :inputName="'isEmail'"
          :isDataCorrect="!showEmailError"
          :placeholder="'namn@dinmail.se'"
          :onBlur="validateEmail"
        />
        <p v-if="showEmailError" class="text-warning-orange">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" /><span
            >Vänligen skriv en giltig email adress!</span
          >
        </p>
      </label>
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
    <BookedJobs
      v-for="job in bookedJobs"
      :key="job.time"
      :booking="job"
      :auth="auth"
      @fetchJobs="retrieveJobs"
    />
  </div>

  <div class="spinner-component" v-if="isLoading">
    <LoadingSpinner />
    <!-- Spinner by: https://codepen.io/jkantner/pen/QWrLOXW -->
  </div>
</template>
