<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const location = ref('')
const registrationNumber = ref('')
const troubleShootTime = ref('')
const message = ref('')

const isLocation = ref(false)
const isTroubleShootTime = ref(false)
const isRegistrationNumber = ref(false)
const isMessage = ref(false)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isLocation', value: false },
  { key: 'isTroubleShootTime', value: false },
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

      // Find the index of isTroubleShootTime in inputsArray
      const index = inputsArray.findIndex((field) => field.key === 'isLocation')

      if (index !== -1) {
        // If isTroubleShootTime is found, update its value at the specific index
        inputsArray[index].value = isLocation.value
      } else {
        // If isTroubleShootTime is not found, push it into the array
        inputsArray.push({ key: 'isLocation', value: isLocation.value })
      }

      checkInputData()
    }
  })
}

function checkInputDataSelect2() {
  nextTick(() => {
    if (troubleShootTime.value === '') {
      return
    } else {
      isTroubleShootTime.value = true

      // Find the index of isTroubleShootTime in inputsArray
      const index = inputsArray.findIndex((field) => field.key === 'isTroubleShootTime')

      if (index !== -1) {
        // If isTroubleShootTime is found, update its value at the specific index
        inputsArray[index].value = isTroubleShootTime.value
      } else {
        // If isTroubleShootTime is not found, push it into the array
        inputsArray.push({ key: 'isTroubleShootTime', value: isTroubleShootTime.value })
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

      // Find the index of isTroubleShootTime in inputsArray
      const index = inputsArray.findIndex((field) => field.key === 'isRegistrationNumber')

      if (index !== -1) {
        // If isTroubleShootTime is found, update its value at the specific index
        inputsArray[index].value = isRegistrationNumber.value
      } else {
        // If isTroubleShootTime is not found, push it into the array
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

      // Find the index of isTroubleShootTime in inputsArray
      const index = inputsArray.findIndex((field) => field.key === 'isMessage')

      if (index !== -1) {
        // If isTroubleShootTime is found, update its value at the specific index
        inputsArray[index].value = isMessage.value
      } else {
        // If isTroubleShootTime is not found, push it into the array
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

onMounted(() => {
  updateScreenSize()
})

function formatRegistrationNumber() {
  // Remove spaces and convert to uppercase
  let formattedValue = registrationNumber.value.replace(/\s/g, '').toUpperCase()

  // Insert a space after the first 3 characters
  if (formattedValue.length > 3) {
    formattedValue = formattedValue.slice(0, 3) + ' ' + formattedValue.slice(3)
  }

  // Update the registrationNumber value
  registrationNumber.value = formattedValue

  // Check input data after formatting
  checkInputData()
}

function handleMessage() {
  console.log(location, registrationNumber, troubleShootTime, message)
}
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

      <label for="troubleShootTime">Felsökningstid</label>
      <select
        name="troubleShootTime"
        class="signed-in-contact-form-select"
        v-model="troubleShootTime"
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
