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

  if (document.documentElement.clientWidth > 1280) {
    desktop.value = true
    tablet.value = false
    mobile.value = false
  }

  if (document.documentElement.clientWidth > 699 && document.documentElement.clientWidth < 1281) {
    desktop.value = false
    tablet.value = true
    mobile.value = false
  }

  if (document.documentElement.clientWidth < 700) {
    desktop.value = false
    tablet.value = false
    mobile.value = true
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
  <div class="pt-[132px] flex flex-col gap-8 p-4 items-center text-main">
    <div class="flex gap-4 items-center w-full">
      <RouterLink to="/" class="btn-back z-10"
        ><fontAwesome :icon="['fas', 'chevron-left']"
      /></RouterLink>
      <h2 class="text-xl">Kontakta oss</h2>
    </div>
    <form @submit.prevent="handleMessage" class="flex flex-col w-full gap-6">
      <label for="name" class="font-text-light flex flex-col gap-1"
        ><span>För- och efternamn</span>
        <input
          type="text"
          name="name"
          placeholder="Förnamn & efternamn"
          v-model="name"
          @input="checkInputDataName"
          :class="
            isNameCorrect
              ? 'text-input p-relative width-100 padding-8 z-index-1  '
              : 'input-warning p-relative width-100 padding-8 z-index-1 '
          "
        />
        <p
          class="text-warning-orange font-text-light display-flex gap-2 align-items-center"
          v-if="!isNameCorrect"
        >
          <fontAwesome :icon="['fas', 'triangle-exclamation']" class="text-warning-orange" />Ange
          både för- och efternman!
        </p>
      </label>

      <label for="email" class="font-text-light flex flex-col gap-1"
        ><span>Email adress</span>
        <input
          type="email"
          name="name"
          placeholder="namn@mail.se"
          v-model="email"
          @input="checkInputDataEmail"
          :class="
            isEmailReal
              ? 'text-input p-relative width-100 padding-8 z-index-1  '
              : 'input-warning p-relative width-100 padding-8 z-index-1 '
          "
        />
        <p
          class="text-warning-orange font-text-light display-flex gap-2 align-items-center"
          v-if="!isEmailReal"
        >
          <fontAwesome
            :icon="['fas', 'triangle-exclamation']"
            class="text-warning-orange"
          />Kontrollera så att mailadressen stämmer!
        </p>
      </label>

      <label for="message-input" class="font-text-light flex flex-col gap-1"
        ><span>Meddelande</span
        ><textarea
          name="message-input"
          v-model="message"
          placeholder="Beskriv varför du kontaktar oss"
          @input="checkInputDataMessage"
          :class="['textarea-input', 'height-239px']"
        ></textarea>
      </label>

      <button
        v-if="mobile"
        type="submit"
        :disabled="isBtnDisabled"
        :class="['mt-4 mb-2', isBtnDisabled ? 'main-btn-disabled' : 'main-btn']"
      >
        Skicka
      </button>
    </form>
    <div class="blue-line"></div>
  </div>
</template>
