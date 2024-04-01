<script setup lang="ts">
import LoadingSpinner from '@/components/assets/LoadingSpinner.vue'
import router from '@/router'
import { contactRepairShops } from '@/services/userContact'
import { computed, nextTick, onMounted, ref, type Ref } from 'vue'
import LocationSelect from './LocationSelect.vue'
import MeterSetting from './MeterSetting.vue'
import RegistrationNumberInput from './RegistrationNumberInput.vue'
import TextareaInput from './TextareaInput.vue'
import TroubleShootTimeSelect from './TroubleShootTimeSelect.vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const props = defineProps({
  job: {
    type: String,
    required: true
  }
})

const location = ref('')
const registrationNumber = ref('')
const meterSetting = ref('')
const troubleshootTime = ref('')
const message = ref('')

const isLoading = ref(false)
const isConfirmation = ref(false)
const isConfirmationError = ref(false)
const isBtnDisabled = ref(true)
const hideMobileBtn = ref(false)
const isLargeScreen = ref(false)

const userEmail = localStorage.getItem('userEmail')

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isLocation', value: false },
  { key: 'isRegistrationNumber', value: false },
  { key: 'isMessage', value: false },
  {
    key: 'isMeterSetting',
    value: props.job === 'Framvagnsinställning' || props.job === 'Övrigt' ? true : false
  }
]

let width = document.documentElement.clientWidth

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
  console.log(inputsArray)
}

function checkInputsData(confirmKey: string) {
  console.log(confirmKey)

  nextTick(() => {
    let refVariable: Ref<string> | null = null
    switch (confirmKey) {
      case 'isLocation':
        refVariable = location
        break
      case 'isRegistrationNumber':
        refVariable = registrationNumber
        break
      case 'isMeterSetting':
        refVariable = meterSetting
        break
      case 'isMessage':
        refVariable = message
        break
      default:
        break
    }

    console.log(!!meterSetting.value)

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

const messageData = computed(() => {
  return {
    customerId: userId.value as unknown as string,
    location: location.value,
    registrationNumber: registrationNumber.value,
    meterSetting:
      props.job === 'Framvagnsinställning' || props.job === 'Övrigt' ? 'null' : meterSetting.value,
    troubleshootTime: troubleshootTime.value,
    customerMessage: message.value,
    customerEmail: userEmail,
    answeredByRepairShop: false
  }
})

function showConfirmationBox(response: any) {
  console.log(response)

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

  console.log(response)

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

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <div class="new-request-surrounding-container">
    <form @submit.prevent="handleMessage" v-if="!isLargeScreen">
      <LocationSelect
        :checkInputData="(e: string) => checkInputsData(e)"
        :selectData="(e: string) => (location = e)"
      ></LocationSelect>

      <RegistrationNumberInput
        :checkInputData="(e: string) => checkInputsData(e)"
        :inputData="(e: string) => (registrationNumber = e)"
      ></RegistrationNumberInput>

      <MeterSetting
        v-if="props.job === 'Kamremsbyte' || props.job === 'Service'"
        :checkInputData="(e: string) => checkInputsData(e)"
        :selectData="(e: string) => (meterSetting = e)"
      ></MeterSetting>

      <TroubleShootTimeSelect
        v-if="props.job === 'Övrigt'"
        :selectData="(e: string) => (troubleshootTime = e)"
      ></TroubleShootTimeSelect>

      <TextareaInput
        :checkInputData="(e: string) => checkInputsData(e)"
        :inputData="(e: string) => (message = e)"
      ></TextareaInput>

      <button
        type="submit"
        :disabled="isBtnDisabled"
        :class="{
          'user-home-send-btn-disabled': isBtnDisabled,
          'user-home-send-btn': !isBtnDisabled,
          hidden: hideMobileBtn
        }"
      >
        Skicka
      </button>
    </form>

    <form @submit.prevent="handleMessage" v-if="isLargeScreen">
      <div class="left-side-contact-form">
        <TextareaInput
          :checkInputData="(e: string) => checkInputsData(e)"
          :inputData="(e: string) => (message = e)"
        ></TextareaInput>
      </div>

      <div class="right-side-contact-form">
        <LocationSelect
          :checkInputData="(e: string) => checkInputsData(e)"
          :selectData="(e: string) => (location = e)"
        ></LocationSelect>

        <RegistrationNumberInput
          :checkInputData="(e: string) => checkInputsData(e)"
          :inputData="(e: string) => (registrationNumber = e)"
        ></RegistrationNumberInput>

        <TroubleShootTimeSelect
          :checkInputData="(e: string) => checkInputsData(e)"
          :selectData="(e: string) => (troubleshootTime = e)"
        ></TroubleShootTimeSelect>

        <button
          type="submit"
          :disabled="isBtnDisabled"
          :class="{
            'user-home-send-btn-disabled': isBtnDisabled,
            'user-home-send-btn': !isBtnDisabled
          }"
        >
          Skicka
        </button>
      </div>
    </form>

    <div class="blue-line"></div>
  </div>
  <div class="spinner-component" v-if="isLoading">
    <LoadingSpinner></LoadingSpinner>
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
