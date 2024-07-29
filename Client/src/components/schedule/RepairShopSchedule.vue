<script setup lang="ts">
import type { INewJob } from '@/models/INewJob'
import router from '@/router'
import { getUser } from '@/services/getUserType'
import { getJob, saveJob } from '@/services/saveJob'
import { getAuth } from 'firebase/auth'
import DatePicker from 'primevue/datepicker'
import { computed, nextTick, onMounted, ref, type Ref } from 'vue'
import ConfirmDialog from '../dialogs/ConfirmDialog.vue'
import RegistrationNumberInput from '../userHome/newRequest/RegistrationNumberInput.vue'
import InfoInput from '../utils/components/InfoInput.vue'

const date = ref('')
const registrationNumber = ref('')
const customerEmail = ref('')

const isBtnDisabled = ref(true)
const showEmailError = ref(false)
const isEmailValid = ref(true)
const isRegistrationNumberValid = ref(true)
// const isRepairShop = ref(false)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isDate', value: false },
  { key: 'isRegistrationNumber', value: false },
  { key: 'isEmail', value: false }
]

const bookedJobs = ref<INewJob[]>([])

interface IChachedJobs {
  jobs: INewJob[]
  timestamp: number
}

const auth = getAuth()

async function fetchJobsFromServer(): Promise<INewJob[]> {
  try {
    const response = await getJob()
    return Array.isArray(response) ? response : [response]
  } catch (error) {
    console.error('Could not fetch jobs from server:', error)
    throw error
  }
}

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

function saveBooking() {
  const job = computed(() => {
    return {
      date: date.value,
      registrationNumber: registrationNumber.value,
      time: new Date().getTime(),
      repairShopEmail: auth.currentUser?.email as string,
      customerEmail: customerEmail.value
    }
  })

  bookedJobs.value.push(job.value)

  fetchJobsFromServer()

  // console.log('bookedJobs:', bookedJobs)

  saveJob(job.value)

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

function navigateWithQuery() {
  router.push({ query: { removeBooking: 'true' } })
}

onMounted(async () => {
  const response = await getUser()

  bookedJobs.value = await fetchJobsFromServer()

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
    <div
      class="w-full el-bg-gray rounded-lg border-main flex flex-col gap-1 relative"
      v-for="job in bookedJobs"
      :key="job.time"
    >
      <button
        type="button"
        @click="navigateWithQuery"
        class="absolute right-0 p-2 hover:text-error-red"
      >
        <fontAwesome :icon="['fas', 'trash']" />
      </button>
      <div class="p-2">
        <h3>Registreringsnummer: {{ job.registrationNumber }}</h3>
        <p>Datum: {{ formatDate(job.date) }}</p>
      </div>
    </div>

    <ConfirmDialog :removeRequest="removeBooking" />
  </div>
</template>

<style scoped></style>
