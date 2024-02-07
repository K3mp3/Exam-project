<script setup lang="ts">
import { registerUser } from '@/services/registerUser'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useShowUserEmail } from '@/stores/showUserEmail'
import { computed, nextTick, onMounted, ref } from 'vue'
import DialogBox from '../dialogs/DialogBox.vue'

const name = ref('')
const email = ref('')
const confirmEmail = ref('')
const password = ref('')
const confirmPassword = ref('')

const isName = ref(false)
const isEmail = ref(false)
const isConfirmEmail = ref(false)
const isPassword = ref(false)
const isConfirmPassword = ref(false)

const isEmailWrong = ref(false)
const isPasswordWrong = ref(false)
const isNotBothNames = ref(false)
const isBtnDisabled = ref(true)
const isPasswordWeak = ref(false)
const isConfirmPasswordWeak = ref(false)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isName', value: false },
  { key: 'isEmail', value: false },
  { key: 'isConfirmEmail', value: false },
  { key: 'isPassword', value: false },
  { key: 'isConfirmPassword', value: false }
]

const isDialog = computed(() => useShowPopUp().showPopUp)
const filledEmail = computed(() => useShowUserEmail().userEmail)
const isFilledEmail = computed(() => useShowUserEmail().isEmail)

const newUser = computed(() => {
  return {
    name: name.value,
    email: email.value,
    password: password.value,
    repairShop: false,
    signedIn: false
  }
})

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((filed) => filed.value)
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

function checkInputDataConfirmEmail() {
  nextTick(() => {
    if (confirmEmail.value === '') {
      return
    } else {
      isConfirmEmail.value = true

      const index = inputsArray.findIndex((field) => field.key === 'isConfirmEmail')

      if (index !== -1) {
        inputsArray[index].value = isConfirmEmail.value
      } else {
        inputsArray.push({ key: 'isConfirmEmail', value: isConfirmEmail.value })
      }

      checkInputData()
    }
  })
}

function checkInputDataPassword() {
  checkPasswordStrength('password')
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

function checkInputDataConfirmPassword() {
  checkPasswordStrength('confirmPassword')
  nextTick(() => {
    if (confirmPassword.value === '') {
      return
    } else {
      isConfirmPassword.value = true

      const index = inputsArray.findIndex((field) => field.key === 'isConfirmPassword')

      if (index !== -1) {
        inputsArray[index].value = isConfirmPassword.value
      } else {
        inputsArray.push({ key: 'isConfirmPassword', value: isConfirmPassword.value })
      }

      checkInputData()
    }
  })
}

function checkPasswordStrength(type: string) {
  if (type === 'password') {
    isPasswordWeak.value = password.value.length < 5
  } else {
    isConfirmPasswordWeak.value = confirmPassword.value.length < 5
  }
}

async function handleRegistration() {
  const response = await registerUser(newUser.value)
}

onMounted(() => {
  const storedEmail = localStorage.getItem('userEmail')

  if (storedEmail) {
    email.value = storedEmail
    checkInputDataEmail()
    console.log('hejsan')
  }

  checkInputData()

  console.log(storedEmail, email.value)
})
</script>

<template>
  <div class="mobile-form-background">
    <div class="mobile-form-nav">
      <RouterLink to="/" class="router-link"
        ><fontAwesome :icon="['fas', 'chevron-left']"
      /></RouterLink>
      <h2>Registrera dig</h2>
    </div>
    <form @submit.prevent="handleRegistration" class="mobile-register-form">
      <label for="name">För- och efternamn</label>
      <input
        type="text"
        name="name"
        placeholder="För- och efternammn"
        v-model="name"
        @input="checkInputDataName"
        :class="isNotBothNames ? 'input-error' : ''"
      />
      <p v-if="isNotBothNames">
        <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att både för-
        och efternamn finns med!
      </p>

      <label for="email">Email adress</label>
      <input
        type="email"
        name="email"
        placeholder="namn@mail.com"
        v-model="email"
        @input="checkInputDataEmail"
        :class="isEmailWrong ? 'input-error' : ''"
        :value="isFilledEmail ? filledEmail : email"
      />
      <p v-if="isEmailWrong">
        <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email adressen!
      </p>

      <label for="email">Bekräfta email adress</label>
      <input
        type="email"
        name="email"
        placeholder="namn@mail.com"
        v-model="confirmEmail"
        @input="checkInputDataConfirmEmail"
        :class="isEmailWrong ? 'input-error' : ''"
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
        @input="checkInputDataPassword"
        :class="{ 'input-error': isPasswordWrong, 'input-password-weak': isPasswordWeak }"
      />
      <p class="warning-text" v-if="isPasswordWeak">
        <fontAwesome :icon="['fas', 'triangle-exclamation']" />Lösenordet är svagt! Överväg att
        använda ett säkrare
      </p>
      <p v-if="isPasswordWrong">
        <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenorder!
      </p>

      <label for="password">Bekräfta lösenord</label>
      <input
        type="password"
        name="password"
        placeholder="Lösenord"
        v-model="confirmPassword"
        @input="checkInputDataConfirmPassword"
        :class="{ 'input-error': isPasswordWrong, 'input-password-weak': isConfirmPasswordWeak }"
      />
      <p class="warning-text" v-if="isConfirmPasswordWeak">
        <fontAwesome :icon="['fas', 'triangle-exclamation']" />Lösenordet är svagt! Överväg att
        använda ett säkrare
      </p>
      <p v-if="isPasswordWrong">
        <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenorder!
      </p>

      <button
        type="submit"
        :disabled="isBtnDisabled"
        :class="isBtnDisabled ? 'register-mobile-button-disable' : 'register-mobile-button'"
      >
        Registrera
      </button>
    </form>

    <div class="blue-line"></div>

    <div class="text-form-container">
      <p>
        Har du redan ett konto?
        <RouterLink to="/sign-in" class="router-link-text">Logga in här</RouterLink>
      </p>
      <p>
        Har du en verkstad och vill registrera dig?
        <RouterLink to="/register-repair-shop" class="router-link-text">Klicka här</RouterLink>
      </p>
    </div>

    <DialogBox v-if="isDialog"></DialogBox>
  </div>
</template>
