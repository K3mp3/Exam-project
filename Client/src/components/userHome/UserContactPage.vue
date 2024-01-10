<script setup lang="ts">
import { ref } from 'vue'

const location = ref('')
const registrationNumber = ref('')
const troubleShootTime = ref('')
const message = ref('')

const isBtnDisabled = ref(true)

function checkInputData() {
  if (
    location.value === '' ||
    registrationNumber.value === '' ||
    troubleShootTime.value === '' ||
    message.value === ''
  )
    isBtnDisabled.value = true
  else {
    isBtnDisabled.value = false
  }
}

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
    <label for="location">Kommun</label>
    <select name="location" class="signed-in-contact-form-select" v-model="location">
      <option value="Sundsvall">Sundsvall</option>
    </select>

    <label for="registrationNumber">Registreringsnummer</label>
    <input
      type="text"
      name="registrationNumber"
      placeholder="ABC 123"
      v-model="registrationNumber"
      @change="checkInputData"
      @input="formatRegistrationNumber"
      maxlength="7"
    />

    <label for="troubleShootTime">Felsökningstid</label>
    <select
      name="troubleShootTime"
      class="signed-in-contact-form-select"
      v-model="troubleShootTime"
    >
      <option value="1 timme">1 timme</option>
      <option value="2 timme">2 timme</option>
      <option value="3 timme">3 timme</option>
      <option value="4 timme">4 timme</option>
    </select>

    <label for="message-input">Meddelande</label>
    <textarea
      name="message-input"
      v-model="message"
      class="text-editor"
      placeholder="Beskriv vad du vill ha hjälp med..."
      @input="checkInputData"
    ></textarea>

    <button
      type="submit"
      :disabled="isBtnDisabled"
      :class="isBtnDisabled ? 'user-home-send-btn-disabled' : 'user-home-send-btn'"
    >
      Skicka
    </button>
  </form>

  <div class="blue-line"></div>
</template>
