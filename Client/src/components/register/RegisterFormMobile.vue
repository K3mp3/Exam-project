<script setup lang="ts">
import { registerUser } from '@/services/registerUser'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { computed, nextTick, onMounted, ref, type Ref } from 'vue'
import InfoInput from '../utils/components/InfoInput.vue'

const filledEmail = localStorage.getItem('userEmail')

const name = ref('')
const email = ref(filledEmail || '')
const confirmEmail = ref('')
const password = ref('')
const confirmPassword = ref('')

const isEmailValid = ref(true)
const isConfirmEmailValid = ref(true)
const isNameCorrect = ref(true)
const isBtnDisabled = ref(true)
const isPasswordWeak = ref(false)
const isConfirmPasswordWeak = ref(false)
const isEmailMatch = ref(true)
const isPasswordMatch = ref(true)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isName', value: false },
  { key: 'isEmail', value: !!filledEmail },
  { key: 'isConfirmEmail', value: false },
  { key: 'isPassword', value: false },
  { key: 'isConfirmPassword', value: false }
]

const isDialog = computed(() => useShowPopUp().showPopUp)

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
  isBtnDisabled.value =
    !inputsArray.every((field) => field.value) ||
    !isEmailMatch.value ||
    !isNameCorrect.value ||
    !isPasswordMatch.value
}

function checkInputsData(confirmKey: string) {
  nextTick(() => {
    let refVariable: Ref<string> | null = null
    switch (confirmKey) {
      case 'isName':
        refVariable = name
        checkInputDataName()
        break
      case 'isEmail':
        refVariable = email
        checkInputDataEmail()
        break
      case 'isConfirmEmail':
        refVariable = confirmEmail
        checkInputDataConfirmEmail()
        break
      case 'isPassword':
        refVariable = password
        checkPasswordStrength('password')
        break
      case 'isConfirmPassword':
        refVariable = confirmPassword
        checkPasswordStrength('confirmPassword')
        break
      default:
        break
    }

    if (refVariable?.value === '') {
      const index = inputsArray.findIndex((field) => field.key === confirmKey)

      if (index !== -1) {
        inputsArray[index].value = false
      } else {
        inputsArray.push({ key: confirmKey, value: false })
      }

      checkInputData()
      return
    } else {
      const index = inputsArray.findIndex((field) => field.key === confirmKey)

      if (index !== -1) {
        inputsArray[index].value = true
      } else {
        inputsArray.push({ key: confirmKey, value: true })
      }

      checkInputData()
    }
  })
}

function checkInputDataName() {
  const nameRegex = /^[^\s]+\s[^\s]+$/
  isNameCorrect.value = nameRegex.test(name.value)

  console.log(isNameCorrect.value)
}

function checkEmailMatch() {
  if (email.value === '' || confirmEmail.value === '') {
    isEmailMatch.value = true
    return
  }

  if (email.value === confirmEmail.value) {
    isEmailMatch.value = true
  } else {
    isEmailMatch.value = false
  }

  console.log(isEmailMatch.value)

  checkInputData()
}

function checkPasswordMatch() {
  if (password.value === '' || confirmPassword.value === '') {
    isPasswordMatch.value = true
    return
  }

  if (password.value === confirmPassword.value) {
    isPasswordMatch.value = true
  }
}

function checkInputDataEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  isEmailValid.value = emailRegex.test(email.value.trim())
}

function checkInputDataConfirmEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  isConfirmEmailValid.value = emailRegex.test(confirmEmail.value.trim())
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
  if (filledEmail) {
    checkInputDataEmail()
    const index = inputsArray.findIndex((field) => field.key === 'isEmail')
    if (index !== -1) {
      inputsArray[index].value = true
    } else {
      inputsArray.push({ key: 'isEmail', value: true })
    }
  }
  checkInputData()
})
</script>

<template>
  <div class="p-4 flex flex-col gap-8 text-main">
    <div class="flex gap-4 items-center">
      <RouterLink to="/" class="btn-back"
        ><fontAwesome :icon="['fas', 'chevron-left']"
      /></RouterLink>
      <h2 class="text-xl sm:text-2xl">Registrera dig</h2>
    </div>
    <form @submit.prevent="handleRegistration" class="flex flex-col gap-6">
      <label for="name" class="font-text-light flex flex-col gap-1"
        ><span>För- och efternamn</span>
        <InfoInput
          :checkInputData="(e: string) => checkInputsData(e)"
          :inputData="(e: string) => (name = e)"
          :inputType="'text'"
          :inputName="'isName'"
          :isDataCorrect="isNameCorrect"
          :placeholder="'För- och efternamn'"
        />
        <p v-if="!isNameCorrect" class="text-warning-orange">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att både
          för- och efternamn finns med!
        </p>
      </label>

      <label for="email" class="font-text-light flex flex-col gap-1"
        ><span>Email adress</span>
        <InfoInput
          :checkInputData="(e: string) => checkInputsData(e)"
          :inputData="(e: string) => (email = e)"
          :inputType="'email'"
          :inputName="'isEmail'"
          :isDataCorrect="isEmailValid"
          :placeholder="'namn@dinmail.se'"
          :predefinedValue="filledEmail ? filledEmail : ''"
          :onBlur="checkEmailMatch"
        />
        <p v-if="!isEmailValid || !isEmailMatch" class="text-warning-orange">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email
          adressen!
        </p>
      </label>

      <label for="email" class="font-text-light flex flex-col gap-1"
        ><span>Bekräfta email adress</span>
        <InfoInput
          :checkInputData="(e: string) => checkInputsData(e)"
          :inputData="(e: string) => (confirmEmail = e)"
          :inputType="'email'"
          :inputName="'isConfirmEmail'"
          :isDataCorrect="isConfirmEmailValid"
          :placeholder="'namn@dinmail.se'"
          :onBlur="checkEmailMatch"
        />
        <p v-if="!isConfirmEmailValid || !isEmailMatch" class="text-warning-orange">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email
          adressen!
        </p>
      </label>

      <label for="password" class="font-text-light flex flex-col gap-1"
        ><span>Lösenord</span>
        <InfoInput
          :checkInputData="(e: string) => checkInputsData(e)"
          :inputData="(e: string) => (password = e)"
          :inputType="'password'"
          :inputName="'isPassword'"
          :isDataCorrect="!isPasswordWeak"
          :placeholder="'lösenord'"
          :onBlur="checkPasswordMatch"
        />
        <p class="text-warning-orange" v-if="isPasswordWeak">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Lösenordet är svagt! Överväg att
          använda ett säkrare
        </p>
      </label>

      <label for="password" class="font-text-light flex flex-col gap-1"
        ><span>Bekräfta lösenord</span>
        <InfoInput
          :checkInputData="(e: string) => checkInputsData(e)"
          :inputData="(e: string) => (confirmPassword = e)"
          :inputType="'password'"
          :inputName="'isConfirmPassword'"
          :isDataCorrect="!isConfirmPasswordWeak"
          :placeholder="'lösenord'"
          :onBlur="checkPasswordMatch"
        />
        <p class="text-warning-orange" v-if="isConfirmPasswordWeak">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Lösenordet är svagt! Överväg att
          använda ett säkrare
        </p>
      </label>

      <button
        type="submit"
        :disabled="isBtnDisabled"
        :class="['mt-4 mb-2', isBtnDisabled ? 'main-btn-disabled' : 'main-btn']"
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
        <RouterLink to="/register-repair-shop" class="router-link-text"
          >Registrera dig här</RouterLink
        >
      </p>
    </div>
  </div>
</template>
