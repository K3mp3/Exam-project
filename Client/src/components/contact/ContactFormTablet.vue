<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const tablet = ref(false)
const desktop = ref(false)
const isBtnDisabled = ref(true)

const name = ref('')
const email = ref('')
const message = ref('')

const isName = ref(false)
const isEmail = ref(false)
const isMessage = ref(false)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isName', value: false },
  { key: 'isEmail', value: false },
  { key: 'isMessage', value: false }
]

let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  console.log(width)

  if (width > 1481) {
    desktop.value = true
    tablet.value = false
  }

  if (width > 699 && width < 1482) {
    tablet.value = true
    desktop.value = false
  }

  if (width < 700) {
    desktop.value = false
    tablet.value = false
  }
}

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
  console.log(isBtnDisabled.value)
}

function checkInputDataName() {
  nextTick(() => {
    if (name.value === '') {
      return
    } else {
      isName.value = true

      const index = inputsArray.findIndex((field) => field.key === 'isName')

      if (index !== -1) {
        inputsArray[index].value = isName.value
      } else {
        inputsArray.push({ key: 'isName', value: isName.value })
      }

      checkInputData()
    }
  })
}

function checkInputDataEmail() {
  nextTick(() => {
    if (email.value === '') {
      return
    } else {
      isEmail.value = true

      const index = inputsArray.findIndex((field) => field.key === 'isEmail')

      if (index !== -1) {
        inputsArray[index].value = isEmail.value
      } else {
        inputsArray.push({ key: 'isEmail', value: isEmail.value })
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

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <div class="contact-form-container">
    <div class="contact-form-nav-container">
      <RouterLink to="/" class="contact-form-back-router-link"
        ><fontAwesome :icon="['fas', 'chevron-left']"
      /></RouterLink>
      <h2
        :class="{
          'font-title-bold O15rem': tablet,
          'font-title-bold O16rem': desktop
        }"
      >
        Kontakta oss
      </h2>
    </div>
    <form class="contact-form">
      <div class="contact-form-left-side">
        <label for="message-input">Meddelande</label>
        <textarea
          name="message-input"
          v-model="message"
          placeholder="Beskriv varför du kontaktar oss"
          @input="checkInputDataMessage"
          class="contact-form-textarea-input"
        ></textarea>
      </div>
      <div class="contact-form-right-side">
        <label for="name">För- och efternamn</label>
        <input
          type="text"
          name="name"
          placeholder="Förnamn & efternamn"
          v-model="name"
          @input="checkInputDataName"
          class="contact-form-text-input"
        />

        <label for="email">Email adress</label>
        <input
          type="email"
          name="name"
          placeholder="namn@mail.se"
          v-model="email"
          @input="checkInputDataEmail"
          class="contact-form-text-input"
        />

        <button
          v-if="tablet || desktop"
          type="submit"
          :disabled="isBtnDisabled"
          :class="{
            'contact-form-send-btn-disabled': isBtnDisabled,
            'contact-form-send-btn': !isBtnDisabled
          }"
        >
          Skicka
        </button>
      </div>
    </form>
    <div class="contact-form-blue-line"></div>
  </div>
</template>
