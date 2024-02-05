<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import ConsumerNav from '../nav/ConsumerNav.vue'

const props = defineProps({
  userMessage: {
    type: Function,
    required: true
  }
})

const mobile = ref(true)
const isBtnDisabled = ref(true)

const name = ref('')
const email = ref('')
const message = ref('')

const isName = ref(false)
const isEmail = ref(false)
const isMessage = ref(false)
const isEmailReal = ref(true)
const isNameCorrect = ref(true)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isName', value: false },
  { key: 'isEmail', value: false },
  { key: 'isMessage', value: false }
]

let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

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
  console.log(inputsArray)
}

function checkInputDataName() {
  nextTick(() => {
    if (name.value === '') {
      isName.value = false

      const index = inputsArray.findIndex((field) => field.key === 'isName')

      if (index !== -1) {
        inputsArray[index].value = isName.value
      } else {
        inputsArray.push({ key: 'isName', value: isName.value })
      }

      checkInputData()
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

function checkName() {
  const nameRegex = /^[^\s]+\s[^\s]+$/

  isNameCorrect.value = nameRegex.test(name.value)
}

function checkInputDataEmail() {
  nextTick(() => {
    if (email.value === '') {
      isEmail.value = false

      const index = inputsArray.findIndex((field) => field.key === 'isEmail')

      if (index !== -1) {
        inputsArray[index].value = isEmail.value
      } else {
        inputsArray.push({ key: 'isEmail', value: isEmail.value })
      }

      checkInputData()
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

function checkEmail() {
  checkInputData()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  isEmailReal.value = emailRegex.test(email.value.trim())
}

function checkInputDataMessage() {
  nextTick(() => {
    if (message.value === '') {
      isMessage.value = false

      const index = inputsArray.findIndex((field) => field.key === 'isMessage')

      if (index !== -1) {
        inputsArray[index].value = isMessage.value
      } else {
        inputsArray.push({ key: 'isMessage', value: isMessage.value })
      }

      checkInputData()
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

const messageData = computed(() => {
  return {
    userName: name.value,
    userEmail: email.value,
    userMessage: message.value
  }
})

function handleMessage() {
  props.userMessage(messageData.value)
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
    <form @submit.prevent="handleMessage" class="contact-form">
      <label for="name">För- och efternamn</label>
      <input
        type="text"
        name="name"
        placeholder="Förnamn & efternamn"
        v-model="name"
        @input="checkInputDataName"
        @blur="checkName"
        :class="isNameCorrect ? 'contact-form-text-input' : 'input-warning'"
      />
      <p
        class="text-warning-orange font-text-light display-flex gap-8 align-items-center margin-top-n11 margin-bm-16"
        v-if="!isNameCorrect"
      >
        <fontAwesome :icon="['fas', 'triangle-exclamation']" class="text-warning-orange" />Ange både
        för- och efternman!
      </p>

      <label for="email">Email adress</label>
      <input
        type="email"
        name="name"
        placeholder="namn@mail.se"
        v-model="email"
        @input="checkInputDataEmail"
        @change="checkEmail"
        :class="isEmailReal ? 'contact-form-text-input' : 'input-warning'"
      />
      <p
        class="text-warning-orange font-text-light display-flex gap-8 align-items-center margin-top-n11 margin-bm-16"
        v-if="!isEmailReal"
      >
        <fontAwesome
          :icon="['fas', 'triangle-exclamation']"
          class="text-warning-orange"
        />Kontrollera så att mailadressen stämmer!
      </p>

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
