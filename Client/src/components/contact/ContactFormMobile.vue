<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import ConsumerNav from '../nav/ConsumerNav.vue'

const mobile = ref(true)
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
    mobile.value = false
  }

  if (width > 699 && width < 1482) {
    mobile.value = false
  }

  if (width < 700) {
    mobile.value = true
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
  <nav>
    <ConsumerNav></ConsumerNav>
  </nav>
  <div class="contact-form-container">
    <div class="contact-form-nav-container">
      <RouterLink to="/" class="contact-form-back-router-link"
        ><fontAwesome :icon="['fas', 'chevron-left']"
      /></RouterLink>
      <h2
        :class="{
          'font-title-bold O14rem': mobile
        }"
      >
        Kontakta oss
      </h2>
    </div>
    <form class="contact-form">
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

      <label for="message-input">Meddelande</label>
      <textarea
        name="message-input"
        v-model="message"
        placeholder="Beskriv varför du kontaktar oss"
        @input="checkInputDataMessage"
        class="contact-form-textarea-input"
      ></textarea>

      <button
        v-if="mobile"
        type="submit"
        :disabled="isBtnDisabled"
        :class="{
          'contact-form-send-btn-disabled': isBtnDisabled,
          'contact-form-send-btn': !isBtnDisabled
        }"
      >
        Skicka
      </button>
    </form>
    <div class="contact-form-blue-line"></div>
  </div>
</template>
