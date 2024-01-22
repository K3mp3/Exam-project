<script setup lang="ts">
import { contactRepairShops } from '@/services/userContact'
import { computed, nextTick, onMounted, ref } from 'vue'

const location = ref('')
const registrationNumber = ref('')
const troubleshootTime = ref('')
const message = ref('')

const isLocation = ref(false)
const isTroubleshootTime = ref(false)
const isRegistrationNumber = ref(false)
const isMessage = ref(false)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isLocation', value: false },
  { key: 'isTroubleshootTime', value: false },
  { key: 'isRegistrationNumber', value: false },
  { key: 'isMessage', value: false }
]
console.log(inputsArray)

const isBtnDisabled = ref(true)
const hideMobileBtn = ref(false)

let width = document.documentElement.clientWidth

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
  console.log(isBtnDisabled.value)
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

      // Find the index of isTroubleshootTime in inputsArray
      const index = inputsArray.findIndex((field) => field.key === 'isTroubleshootTime')

      if (index !== -1) {
        // If isTroubleshootTime is found, update its value at the specific index
        inputsArray[index].value = isTroubleshootTime.value
      } else {
        // If isTroubleshootTime is not found, push it into the array
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

      // Find the index of isTroubleshootTime in inputsArray
      const index = inputsArray.findIndex((field) => field.key === 'isRegistrationNumber')

      if (index !== -1) {
        // If isTroubleshootTime is found, update its value at the specific index
        inputsArray[index].value = isRegistrationNumber.value
      } else {
        // If isTroubleshootTime is not found, push it into the array
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

      // Find the index of isTroubleshootTime in inputsArray
      const index = inputsArray.findIndex((field) => field.key === 'isMessage')

      if (index !== -1) {
        // If isTroubleshootTime is found, update its value at the specific index
        inputsArray[index].value = isMessage.value
      } else {
        // If isTroubleshootTime is not found, push it into the array
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
    customerName: nonNullName,
    customerEmail: nonNullEmaik,
    location: location.value,
    registrationNumber: registrationNumber.value,
    troubleshootTime: troubleshootTime.value,
    customerMessage: message.value
  }
})

async function handleMessage() {
  console.log(location, registrationNumber, troubleshootTime, message)
  const response = await contactRepairShops(messageData.value)
}

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <h3>Kontakta verkstäder</h3>

  <form @submit.prevent="handleMessage">
    <div class="right-side-contact-form">
      <label for="location">Kommun</label>
      <select
        name="location"
        class="signed-in-contact-form-select"
        v-model="location"
        @input="checkInputDataSelect1"
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
        @input="checkInputDataSelect2"
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
  </form>

  <div class="blue-line"></div>
</template>
