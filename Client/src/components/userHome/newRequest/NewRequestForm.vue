<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import router from '@/router'
import { contactRepairShops } from '@/services/userContact'
import { computed, nextTick, onMounted, ref } from 'vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const location = ref('')
const registrationNumber = ref('')
const troubleshootTime = ref('')
const message = ref('')

const isLocation = ref(false)
const isTroubleshootTime = ref(false)
const isRegistrationNumber = ref(false)
const isMessage = ref(false)
const isLoading = ref(false)
const isConfirmation = ref(false)
const isConfirmationError = ref(false)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isLocation', value: false },
  { key: 'isTroubleshootTime', value: false },
  { key: 'isRegistrationNumber', value: false },
  { key: 'isMessage', value: false }
]

const isBtnDisabled = ref(true)
const hideMobileBtn = ref(false)

let width = document.documentElement.clientWidth

function handleReturnClick() {
  router.push(`/user-home/${userId.value}`)
}

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
}

function checkInputDataSelect1() {
  nextTick(() => {
    if (location.value === '') {
      return
    } else {
      isLocation.value = true

      const index = inputsArray.findIndex((field) => field.key === 'isLocation')

      if (index !== -1) {
        inputsArray[index].value = isLocation.value
      } else {
        inputsArray.push({ key: 'isLocation', value: isLocation.value })
      }

      checkInputData()
    }
  })
}

function checkInputDataSelect2() {
  nextTick(() => {
    if (troubleshootTime.value === '') {
      return
    } else {
      isTroubleshootTime.value = true

      const index = inputsArray.findIndex((field) => field.key === 'isTroubleshootTime')

      if (index !== -1) {
        inputsArray[index].value = isTroubleshootTime.value
      } else {
        inputsArray.push({ key: 'isTroubleshootTime', value: isTroubleshootTime.value })
      }

      checkInputData()
    }
  })
}

function checkInputDataRegistrationNumber() {
  nextTick(() => {
    if (registrationNumber.value === '') {
      return
    } else {
      isRegistrationNumber.value = true

      const index = inputsArray.findIndex((field) => field.key === 'isRegistrationNumber')

      if (index !== -1) {
        inputsArray[index].value = isRegistrationNumber.value
      } else {
        inputsArray.push({ key: 'isRegistrationNumber', value: isRegistrationNumber.value })
      }

      checkInputData()
    }
  })
}

function checkInputDataMessage() {
  nextTick(() => {
    if (message.value === '') {
      return
    } else {
      isMessage.value = true

      const index = inputsArray.findIndex((field) => field.key === 'isMessage')

      if (index !== -1) {
        inputsArray[index].value = isMessage.value
      } else {
        inputsArray.push({ key: 'isMessage', value: isMessage.value })
      }

      checkInputData()
    }
  })
}

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width > 699) {
    hideMobileBtn.value = true
  } else {
    hideMobileBtn.value = false
  }
}

function formatRegistrationNumber() {
  let formattedValue = registrationNumber.value.replace(/\s/g, '').toUpperCase()

  if (formattedValue.length > 3) {
    formattedValue = formattedValue.slice(0, 3) + ' ' + formattedValue.slice(3)
  }

  registrationNumber.value = formattedValue

  checkInputData()
}

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const fullname = getCookie('name')
const email = getCookie('email')

const messageData = computed(() => {
  const nonNullName = fullname || ''
  const nonNullEmaik = email || ''

  return {
    customerId: userId.value as unknown as string,
    location: location.value,
    registrationNumber: registrationNumber.value,
    troubleshootTime: troubleshootTime.value,
    customerMessage: message.value,
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
  } else if (response === 500) {
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
    // Reset input data flags
    inputsArray.forEach((field) => {
      field.value = false
    })
    // Disable submit button
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
    <div class="new-request-top-nav">
      <button type="button" class="btn-back" @click="handleReturnClick">
        <fontAwesome :icon="['fas', 'chevron-left']" />
      </button>
      <h3>Kontakta verkstäder</h3>
    </div>

    <form @submit.prevent="handleMessage">
      <div class="right-side-contact-form">
        <label for="location">Kommun</label>
        <select
          name="location"
          class="signed-in-contact-form-select"
          v-model="location"
          @change="checkInputDataSelect1"
        >
          <option value="Sundsvall">Sundsvall</option>
        </select>

        <label for="registrationNumber">Registreringsnummer</label>
        <input
          type="text"
          name="registrationNumber"
          placeholder="ABC 123"
          v-model="registrationNumber"
          @change="checkInputDataRegistrationNumber"
          @input="formatRegistrationNumber"
          maxlength="7"
        />

        <label for="troubleshootTime">Felsökningstid</label>
        <select
          name="troubleshootTime"
          class="signed-in-contact-form-select"
          v-model="troubleshootTime"
          @change="checkInputDataSelect2"
        >
          <option value="1 timme">1 timme</option>
          <option value="2 timme">2 timmar</option>
          <option value="3 timme">3 timmar</option>
          <option value="4 timme">4 timmar</option>
        </select>

        <button
          type="submit"
          :disabled="isBtnDisabled"
          :class="{
            'user-home-send-btn-disabled': isBtnDisabled,
            'user-home-send-btn': !isBtnDisabled,
            hidden: !hideMobileBtn
          }"
        >
          Skicka
        </button>
      </div>

      <div class="left-side-contact-form">
        <label for="message-input">Meddelande</label>
        <textarea
          name="message-input"
          v-model="message"
          class="text-editor"
          placeholder="Beskriv vad du vill ha hjälp med..."
          @input="checkInputDataMessage"
        ></textarea>
      </div>

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
      <!-- Spinner by: https://codepen.io/jkantner/pen/QWrLOXW -->
    </form>

    <div class="blue-line"></div>
  </div>
  <div class="spinner-component" v-if="isLoading">
    <LoadingSpinner></LoadingSpinner>
  </div>
  <div class="confirmation-box-background" v-if="isConfirmation || isConfirmationError">
    <div class="confirmation-box" v-if="isConfirmation">
      <fontAwesome :icon="['fas', 'check']" class="text-main font-title-bold O35rem" />
      <p class="text-main font-title-bold O1rem">Email skickat!</p>
    </div>

    <div class="confirmation-box-error" v-if="isConfirmationError">
      <fontAwesome :icon="['fas', 'x']" class="text-main font-title-bold O35rem" />
      <p class="text-main font-title-bold O1rem">Email kunde ej skickas!</p>
    </div>
  </div>
</template>
