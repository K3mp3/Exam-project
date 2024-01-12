<script setup lang="ts">
import { signInUser } from '@/services/signInUser'
import { computed, nextTick, ref } from 'vue'

const email = ref('')
const password = ref('')

const isEmail = ref(false)
const isPassword = ref(false)

const isEmailWrong = ref(false)
const isPasswordWrong = ref(false)
const isBtnDisabled = ref(true)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isEmail', value: false },
  { key: 'isPassword', value: false }
]

const user = computed(() => {
  return {
    email: email.value,
    password: password.value
  }
})

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((filed) => filed.value)
  console.log(isBtnDisabled.value)
}

function checkInputDataEmail() {
  nextTick(() => {
    if (email.value === '') {
      return
    } else {
      isEmail.value = true
      console.log(isEmail.value)

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

function checkInputDataPassword() {
  nextTick(() => {
    if (password.value === '') {
      return
    } else {
      isPassword.value = true

      const index = inputsArray.findIndex((field) => field.key === 'isPassword')

      if (index !== -1) {
        inputsArray[index].value = isPassword.value
      } else {
        inputsArray.push({ key: 'isPassword', value: isPassword.value })
      }

      checkInputData()
    }
  })
}

async function handleSignIn() {
  const response = await signInUser(user.value)

  if (response === 'Wrong email or password!') {
    isEmailWrong.value = true
    isPasswordWrong.value = true
  }
}
</script>

<template>
  <div class="mobile-form-background">
    <div class="mobile-form-nav">
      <RouterLink to="/" class="router-link"
        ><fontAwesome :icon="['fas', 'chevron-left']"
      /></RouterLink>
      <h2>Logga in</h2>
    </div>
    <form @submit.prevent="handleSignIn" class="mobile-sign-in-form">
      <label for="email">Email adress</label>
      <input
        type="email"
        name="email"
        placeholder="namn@mail.com"
        v-model="email"
        :class="isEmailWrong ? 'input-error' : ''"
        @input="checkInputDataEmail"
      />
      <p v-if="isEmailWrong">
        <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email adressen!
      </p>

      <label for="password">Lösenord</label>
      <input
        type="password"
        name="password"
        placeholder="Lösenord"
        v-model="password"
        :class="isPasswordWrong ? 'input-error' : ''"
        @input="checkInputDataPassword"
      />
      <p v-if="isEmailWrong">
        <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenorder!
      </p>

      <label for="isRepairShop">Verkstad</label>
      <input type="checkbox" name="isRepairShop" class="form-mobile-checkbox" />

      <button
        type="submit"
        :disabled="isBtnDisabled"
        :class="isBtnDisabled ? 'sign-in-mobile-button-disable' : 'sign-in-mobile-button'"
      >
        Logga in
      </button>
    </form>

    <div class="blue-line"></div>
  </div>
</template>
