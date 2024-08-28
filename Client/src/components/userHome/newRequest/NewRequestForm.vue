<script setup lang="ts">
import LoadingSpinner from '@/components/assets/LoadingSpinner.vue'
import router from '@/router'
import { contactRepairShops } from '@/services/userContact'
import type { SelectedJobType } from '@/types/selectedJobType'
import { getAuth } from 'firebase/auth'
import { computed, nextTick, onMounted, ref, type Ref } from 'vue'
import LocationSelect from './LocationSelect.vue'
import NewRequestTopNav from './NewRequestTopNav.vue'
import RegistrationNumberInput from './RegistrationNumberInput.vue'
import SelectedJobs from './SelectedJobs.vue'
import SelectedWorkType from './SelectedWorkType.vue'
import WorkTypeSelect from './WorkTypeSelect.vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const location = ref('')
const typeOfWork = ref('')
const selectedWork = ref<SelectedJobType[]>([])
const registrationNumber = ref('')
const troubleshootTime = ref('')
const message = ref('')

const isLoading = ref(false)
const isConfirmation = ref(false)
const isConfirmationError = ref(false)
const isBtnDisabled = ref(true)
const hideMobileBtn = ref(false)
const isLargeScreen = ref(false)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isLocation', value: false },
  { key: 'isRegistrationNumber', value: false },
  { key: 'isTypeOfWork', value: false }
]

let width = document.documentElement.clientWidth

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
  console.log(inputsArray)
}

function checkInputsData(confirmKey: string) {
  console.log('confirmKey:', confirmKey)

  nextTick(() => {
    let refVariable: Ref<string> | null = null
    switch (confirmKey) {
      case 'selectedWork':
        refVariable = typeOfWork
        break
      case 'isLocation':
        refVariable = location
        break
      case 'isRegistrationNumber':
        refVariable = registrationNumber
        break
      default:
        break
    }

    if (refVariable?.value === '') {
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

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width > 699) {
    isLargeScreen.value = true
  } else {
    isLargeScreen.value = false
  }
}

const auth = getAuth()

const messageData = computed(() => {
  return {
    email: auth.currentUser?.email ? auth.currentUser.email : '',
    location: location.value,
    registrationNumber: registrationNumber.value,
    customerMessage: selectedWork.value.map((work) => ({
      id: '',
      work: work[0].join(', '),
      message: work[1],
      type: work[2],
      answeredByRepairShop: false
    })),
    answeredByRepairShop: false
  }
})

function deleteWork(work: string) {
  console.log('work:', work)
  const updatedArray = selectedWork.value.filter((entry) => entry[2] !== work)
  selectedWork.value = updatedArray
}

function showConfirmationBox(response: any) {
  // console.log(response)

  if (response.status === 201) {
    isConfirmation.value = true

    setTimeout(() => {
      isConfirmation.value = false
    }, 4000)
  } else if (response === 500 || response === 400) {
    isConfirmationError.value = true

    setTimeout(() => {
      isConfirmationError.value = false
    }, 4000)
  }
}

async function handleMessage() {
  isLoading.value = true
  const response = await contactRepairShops(messageData.value)

  // console.log(response)

  const responseData = response as { status: number }

  if (responseData && responseData.status === 201) {
    isLoading.value = false
    location.value = ''
    registrationNumber.value = ''
    troubleshootTime.value = ''
    message.value = ''
    inputsArray.forEach((field) => {
      field.value = false
    })
    isBtnDisabled.value = true
    showConfirmationBox(response)
  } else {
    setTimeout(() => {
      isLoading.value = false
      showConfirmationBox(response)
    }, 5000)
  }
}

function checkWorkTypeArray(values: string[], textInput: string, type: string, key: string[]) {
  console.log('values:', values)
  checkInputsData('isTypeOfWork')
  typeOfWork.value = type

  nextTick(() => {
    typeOfWork.value = ''
    const index = selectedWork.value.findIndex((entry) => entry[2] === type)

    if (index !== -1) {
      if (key.includes('radio')) {
        selectedWork.value[index][0] = values
        selectedWork.value[index][1] = textInput
      }

      const newValues = values.filter((value) => !selectedWork.value[index][0].includes(value))
      selectedWork.value[index][0].push(...newValues)
      console.log('selectedWork.value:', selectedWork.value)
    } else {
      selectedWork.value.push([values, textInput, type])
      console.log('selectedWork.value:', selectedWork.value)
    }

    console.log(selectedWork.value)
  })
}

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <div class="new-request-surrounding-container text-main flex flex.col items-center h-screen">
    <div class="w-full max-w-[500px] m-auto">
      <NewRequestTopNav :userId="userId"></NewRequestTopNav>
      <div class="flex flex-col gap-4 mb-4">
        <div class="grid grid-cols-1 gap-4">
          <SelectedJobs
            v-for="(work, index) in selectedWork"
            :key="index"
            :work="work"
            @deleteWork="deleteWork"
          />
        </div>

        <WorkTypeSelect
          :selectData="(e: string) => (typeOfWork = e)"
          :selectedWork="selectedWork"
        />

        <SelectedWorkType
          v-if="typeOfWork !== ''"
          :key="typeOfWork"
          :selectedWorkType="typeOfWork"
          :selectedWork="selectedWork"
          @selectedWorkTypeArray="checkWorkTypeArray"
        />
      </div>

      <form @submit.prevent="handleMessage" class="flex flex-col gap-4 max-w-full">
        <LocationSelect
          :checkInputData="(e: string) => checkInputsData(e)"
          :selectData="(e: string) => (location = e)"
        />

        <RegistrationNumberInput
          :checkInputData="(e: string) => checkInputsData(e)"
          :inputData="(e: string) => (registrationNumber = e)"
        ></RegistrationNumberInput>

        <button
          type="submit"
          :disabled="isBtnDisabled"
          :class="{
            'main-btn-disabled mt-5 mb-9': isBtnDisabled,
            'main-btn mt-5 mb-9': !isBtnDisabled,
            hidden: hideMobileBtn
          }"
        >
          Skicka
        </button>
      </form>
      <div class="blue-line"></div>
    </div>
  </div>
  <div class="spinner-component" v-if="isLoading">
    <LoadingSpinner />
    <!-- Spinner by: https://codepen.io/jkantner/pen/QWrLOXW -->
  </div>
  <div class="confirmation-box-background" v-if="isConfirmation || isConfirmationError">
    <div class="confirmation-box" v-if="isConfirmation">
      <fontAwesome :icon="['fas', 'check']" class="text-main font-title-bold O35rem" />
      <p class="text-main font-title-bold O1rem">Meddelande skickat!</p>
    </div>

    <div class="confirmation-box-error" v-if="isConfirmationError">
      <fontAwesome :icon="['fas', 'x']" class="text-main font-title-bold O35rem" />
      <p class="text-main font-title-bold O1rem">Meddelande kunde ej skickas!</p>
    </div>
  </div>
</template>
