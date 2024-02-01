<script setup lang="ts">
import type { IMessage } from '@/models/IMessage'
import { contactVibe } from '@/services/contactVibe'
import { nextTick, onMounted, ref } from 'vue'
import ContactFormMobile from './ContactFormMobile.vue'
import ContactFormTablet from './ContactFormTablet.vue'

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
    mobile.value = false
  }

  if (width > 699 && width < 1482) {
    tablet.value = true
    desktop.value = false
    mobile.value = false
  }

  if (width < 700) {
    mobile.value = true
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

async function handleMessage(messageData: Object) {
  console.log('messageData:', messageData)
  const castedMessage = messageData as IMessage
  const response = await contactVibe(castedMessage)
}

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <ContactFormMobile v-if="mobile" :userMessage="handleMessage"></ContactFormMobile>
  <ContactFormTablet v-if="tablet || desktop" :userMessage="handleMessage"></ContactFormTablet>
</template>
