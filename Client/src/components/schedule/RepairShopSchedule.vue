<script setup lang="ts">
import type { INewJob } from '@/models/INewJob'
import router from '@/router'
import { getUser } from '@/services/getUserType'
import { saveJob } from '@/services/schedule'
import { signOutUser } from '@/services/signOutUser'
import { useAuthStore } from '@/stores/storeSignedInUser'
import { getAuth } from 'firebase/auth'
import DatePicker from 'primevue/datepicker'
import { computed, nextTick, onMounted, ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import LoadingSpinner from '../assets/LoadingSpinner.vue'
import ErrorDialog from '../dialogs/ErrorDialog.vue'
import BottomNav from '../nav/BottomNav.vue'
import SideNav from '../sideNav/SideNav.vue'
import RegistrationNumberInput from '../userHome/newRequest/RegistrationNumberInput.vue'
import InfoInput from '../utils/components/InfoInput.vue'
import { fetchJobsFromServer } from '../utils/fecthBookingJobs'
import { getSignInStatus } from '../utils/signInStatus'
import BookedJobs from './BookedJobs.vue'

// Define reactive references for form fields
const date = ref('')
const registrationNumber = ref('')
const customerEmail = ref('')
const width = ref<number>()

// Define reactive references for validation and loading states
const isBtnDisabled = ref(true)
const showEmailError = ref(false)
const isEmailValid = ref(true)
const isRegistrationNumberValid = ref(true)
const isLoading = ref(false)

// Get the authentication store instance
const authStore = useAuthStore()
const userEmail = computed(() => authStore.getUser?.email)
const userUid = computed(() => authStore.getUser?.uid)

// Define the array for tracking input validation states
const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isDate', value: false },
  { key: 'isRegistrationNumber', value: false },
  { key: 'isEmail', value: false }
]

console.log(inputsArray)

// Define reactive reference for booked jobs
const bookedJobs = ref<INewJob[]>([])

const auth = getAuth()
const route = useRoute()
const showErrorDialog = computed(() => route.query.errorSavingBooking === 'true')

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width.value = document.documentElement.clientWidth
}

// Function to check if all inputs are valid
function checkInputData() {
  isBtnDisabled.value =
    !inputsArray.every((field) => field.value) ||
    !isEmailValid.value ||
    !isRegistrationNumberValid.value
}

// Function to validate individual input fields
function checkInputsData(confirmKey: string) {
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
    } else {
      const index = inputsArray.findIndex((field) => field.key === confirmKey)
      if (index !== -1) {
        inputsArray[index].value = true
      } else {
        inputsArray.push({ key: confirmKey, value: true })
      }
    }
    checkInputData()
  })
}

// Function to validate email format
function validateEmail() {
  if (!isEmailValid.value) {
    showEmailError.value = true
  } else showEmailError.value = false
}

// Function to save the booking
async function saveBooking() {
  isLoading.value = true

  const job = {
    date: date.value,
    registrationNumber: registrationNumber.value,
    time: new Date().getTime(),
    repairShopEmail: userEmail.value,
    customerEmail: customerEmail.value
  }

  console.log(job)

  const response = await saveJob(job)
  console.log(response)

  bookedJobs.value = await fetchJobsFromServer()

  isLoading.value = false

  date.value = ''
  registrationNumber.value = ''
  customerEmail.value = ''

  checkInputsData('isDate')
  checkInputsData('isRegistrationNumber')

  if (response === 500) {
    router.push({ query: { errorSavingBooking: 'true' } })
  }
}

// Function to retrieve booked jobs from the server
async function retrieveJobs() {
  console.log('retrieveJobs')
  bookedJobs.value = await fetchJobsFromServer()
  console.log(bookedJobs.value)
}

async function changeUserSignInStatus() {
  const user = computed(() => {
    return {
      signedIn: false,
      userId: userId.value
    }
  })

  const response = await signOutUser(user.value)

  if (response) {
    if (getSignInStatus() === 'false') {
      console.log('hejsan')
      router.push({ name: 'landing page' })
    }
  }
}

function newRequest() {
  // window.history.back()
  router.push(`/user-home-new-request/${userId.value}`)
}

watch(date, () => {
  checkInputsData('isDate')
  console.log(date.value)
})

onMounted(async () => {
  updateScreenSize()

  const response = await getUser()
  retrieveJobs()
  console.log(bookedJobs.value)

  if (!response.userType) {
    router.push(`/user-home/${userUid.value}`)
  }
})
</script>

<template>
  <div class="md:flex md:gap-8">
    <div class="z-10">
      <SideNav
        v-if="width && width > 767"
        :signOutFunction="changeUserSignInStatus"
        @newRequest="newRequest"
      />
    </div>

    <div
      class="p-4 md:p-8 text-main flex flex-col gap-4 md:gap-8 xl:gap-16 w-full h-screen overflow-y-auto items-center xl:absolute"
    >
      <div class="max-w-[350px] xl:max-w-[500px] w-full">
        <div class="flex flex-col gap-4">
          <h2 class="text-xl sm:text-2xl w-full md:text-center">Boka in kund</h2>

          <label class="flex flex-col gap-1 w-full">
            <p>Datum och tid</p>
            <DatePicker
              v-model="date"
              dateFormat="yy/mm/dd"
              showButtonBar
              showTime
              hourFormat="24"
              :numberOfMonths="width && width < 768 ? 1 : 2"
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
              placeholder="namn@dinmail.se"
              :onBlur="validateEmail"
            />
            <p v-if="showEmailError" class="text-warning-orange">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" /><span
                >Vänligen skriv en giltig email adress!</span
              >
            </p>
          </label>

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
        </div>

        <div class="flex flex-col gap-4 md:gap-6">
          <h2>Bokningar</h2>
          <BookedJobs
            v-for="job in bookedJobs"
            :key="job.time"
            :booking="job"
            :auth="auth"
            @fetchJobs="retrieveJobs"
          />
        </div>
      </div>
    </div>
  </div>

  <ErrorDialog
    v-if="showErrorDialog"
    :showEmailError="showEmailError"
    :title="'Whoops! Det gick tyvärr inte att spara bokningen just nu.'"
    :text="'Vänligen försök igen senare. Om problemet kvarstår ber vi dig att kontakta support.'"
    :btnText="'Kontakta support'"
    :closeDialog="() => router.replace({ query: {} })"
  />

  <div class="spinner-component" v-if="isLoading">
    <LoadingSpinner />
    <!-- Spinner by: https://codepen.io/jkantner/pen/QWrLOXW -->
  </div>

  <BottomNav v-if="width && width < 768" />
</template>
