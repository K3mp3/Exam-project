<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import ConsumerNav from '../nav/ConsumerNav.vue'

const props = defineProps({
  userMessage: {
    type: Function,
    required: true
  }
})

const tablet = ref(false)
const desktop = ref(false)
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

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 1471) {
    desktop.value = true
    tablet.value = false
  }

  if (document.documentElement.clientWidth > 699 && document.documentElement.clientWidth < 1482) {
    tablet.value = true
    desktop.value = false
  }

  if (document.documentElement.clientWidth < 700) {
    desktop.value = false
    tablet.value = false
  }
}

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
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

      const nameRegex = /^[^\s]+\s[^\s]+$/
      isNameCorrect.value = nameRegex.test(name.value)

      if (isNameCorrect.value) {
        if (index !== -1) {
          inputsArray[index].value = isName.value
        } else {
          inputsArray.push({ key: 'isName', value: isName.value })
        }
      } else {
        isName.value = false

        const index = inputsArray.findIndex((field) => field.key === 'isName')

        if (index !== -1) {
          inputsArray[index].value = isName.value
        } else {
          inputsArray.push({ key: 'isName', value: isName.value })
        }
      }

      checkInputData()
    }
  })
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

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      isEmailReal.value = emailRegex.test(email.value.trim())

      if (isEmailReal.value) {
        if (index !== -1) {
          inputsArray[index].value = isEmail.value
        } else {
          inputsArray.push({ key: 'isEmail', value: isEmail.value })
        }
      } else {
        isEmail.value = false

        const index = inputsArray.findIndex((field) => field.key === 'isEmail')

        if (index !== -1) {
          inputsArray[index].value = isEmail.value
        } else {
          inputsArray.push({ key: 'isEmail', value: isEmail.value })
        }
      }

      checkInputData()
    }
  })
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
  <div
    class="padding-tp-137 padding-rt-32 padding-bm-0 padding-lt-32 margin-au display-flex flex-dir-col justify-center align-items-center gap-48"
  >
    <div class="display-flex align-items-center gap-24 width-100 m-width-1200">
      <RouterLink to="/" class="btn-back"
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
    <form class="contact-form" @submit.prevent="handleMessage">
      <div class="contact-form-left-side">
        <label for="message-input">Meddelande</label>
        <textarea
          name="message-input"
          v-model="message"
          placeholder="Beskriv varför du kontaktar oss"
          @input="checkInputDataMessage"
          :class="['textarea-input', tablet ? 'height-204px' : 'height-219px']"
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
          :class="[
            isEmailReal ? 'text-input' : 'input-warning',
            'p-relative',
            'width-100',
            'padding-8',
            'z-index-1',
            'margin-bm-16',
            'margin-tp-4',
            desktop ? 'margin-bm-24' : 'margin-bm-16'
          ]"
        />
        <p
          class="text-warning-orange font-text-light display-flex gap-8 align-items-center margin-top-n11 margin-bm-16"
          v-if="!isNameCorrect"
        >
          <fontAwesome :icon="['fas', 'triangle-exclamation']" class="text-warning-orange" />Ange
          både för- och efternman!
        </p>

        <label for="email">Email adress</label>
        <input
          type="email"
          name="name"
          placeholder="namn@mail.se"
          v-model="email"
          @input="checkInputDataEmail"
          :class="[
            isEmailReal ? 'text-input' : 'input-warning',
            'p-relative',
            'width-100',
            'padding-8',
            'z-index-1',
            'margin-bm-16',
            'margin-tp-4',
            desktop ? 'margin-bm-24' : 'margin-bm-16'
          ]"
        />

        <p
          class="text-warning-orange font-text-light display-flex gap-16 align-items-center margin-top-n11 margin-bm-16"
          v-if="!isEmailReal"
        >
          <fontAwesome
            :icon="['fas', 'triangle-exclamation']"
            class="text-warning-orange"
          />Kontrollera så att mailadressen stämmer!
        </p>

        <button
          v-if="tablet || desktop"
          type="submit"
          :disabled="isBtnDisabled"
          :class="{
            'main-btn-disabled margin-16-0 text-disabled font-title-bold': isBtnDisabled,
            'main-btn margin-32-0 text-disabled font-title-bold': !isBtnDisabled
          }"
        >
          Skicka
        </button>
      </div>
    </form>
    <div class="blue-line"></div>
  </div>
</template>
