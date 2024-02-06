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
    password: password.value,
    signedIn: true
  }
})

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((filed) => filed.value)
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

async function handleRegistration() {
  const response = await signInUser(user.value)

  if (response === 'Wrong email or password!') {
    isEmailWrong.value = true
    isPasswordWrong.value = true
  }
}
</script>

<template>
  <div class="sign-in-tablet-form-background">
    <div class="sign-in-tablet-form-nav">
      <RouterLink to="/" class="sign-in-form-back-link"
        ><fontAwesome :icon="['fas', 'chevron-left']"
      /></RouterLink>
      <h2>Logga in</h2>
    </div>
    <form @submit.prevent="handleRegistration" class="sign-in-tablet-form">
      <div class="sign-in-tablet-form-top-container">
        <div class="input-container">
          <label for="email">Email adress</label>
          <input
            type="email"
            name="email"
            placeholder="namn@mail.com"
            v-model="email"
            @input="checkInputDataEmail"
            :class="isEmailWrong ? 'input-error' : ''"
          />
          <p v-if="isEmailWrong">
            <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email
            adressen!
          </p>
        </div>

        <div class="input-container">
          <label for="password">Lösenord</label>
          <input
            type="password"
            name="password"
            placeholder="Lösenord"
            v-model="password"
            @input="checkInputDataPassword"
            :class="isPasswordWrong ? 'input-error' : ''"
          />
          <p v-if="isEmailWrong">
            <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenordet!
          </p>
        </div>
      </div>

      <div class="sign-in-tablet-form-bottom-container">
        <button
          type="submit"
          :disabled="isBtnDisabled"
          :class="isBtnDisabled ? 'sign-in-tablet-btn-disable' : 'sign-in-tablet-btn'"
        >
          Logga in
        </button>
      </div>
    </form>

    <div class="blue-line"></div>
  </div>
</template>
