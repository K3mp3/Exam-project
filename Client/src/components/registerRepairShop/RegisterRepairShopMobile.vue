<script setup lang="ts">
import { registerUser } from '@/services/registerUser'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { computed, nextTick, onMounted, ref, type Ref } from 'vue'
import ConsumerNav from '../nav/ConsumerNav.vue'
import CustomSelect from '../utils/components/CustomSelect.vue'
import InfoInput from '../utils/components/InfoInput.vue'

const filledEmail = localStorage.getItem('userEmail')

const name = ref('')
const location = ref('')
const phoneNumber = ref()
const email = ref('')
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
const showErrorDialog = ref(false)
const isConfirmationSuccess = ref(false)
const isLoading = ref(false)

const locations: { key: string; value: string }[] = [
  { key: 'Sundsvall', value: 'Sundsvall' },
  { key: 'Bjurholm', value: 'Bjurholm' }
]

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isName', value: false },
  { key: 'isEmail', value: !!filledEmail },
  { key: 'isConfirmEmail', value: false },
  { key: 'isPassword', value: false },
  { key: 'isConfirmPassword', value: false }
]

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
  } else {
    isPasswordMatch.value = false
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
  isLoading.value = true

  const currentUser = getAuth().currentUser
  const userId = currentUser ? currentUser.uid : ''

  const newUser = computed(() => {
    return {
      name: name.value,
      email: email.value,
      password: password.value,
      repairShop: false,
      userId: userId
    }
  })

  const response = await registerUser(newUser.value)

  if (response === 201) {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then(async () => {
        isLoading.value = false
        isConfirmationSuccess.value = true

        setTimeout(() => {
          isConfirmationSuccess.value = false
        }, 4000)
      })
      .catch(() => {
        isLoading.value = false
        showErrorDialog.value = true
      })
  } else {
    isLoading.value = false
    showErrorDialog.value = true
  }
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
  <nav>
    <ConsumerNav />
  </nav>
  <div class="flex items-center h-screen mt-[92px]">
    <div class="p-4 flex flex-col gap-8 text-main w-full">
      <div class="flex gap-4 items-center">
        <RouterLink to="/" class="btn-back"
          ><fontAwesome :icon="['fas', 'chevron-left']"
        /></RouterLink>
        <h2>Registrera din verkstad</h2>
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
        </label>

        <label for="name" class="font-text-light flex flex-col gap-1"
          ><span>Kommun</span>
          <CustomSelect
            :checkInputData="(e: string) => checkInputsData(e)"
            :inputData="(e: string) => (location = e)"
            :inputName="'location'"
            :options="[{ value: 'sundsvall', label: 'Sundsvall' }]"
            class="select"
          />
        </label>

        <label for="location">Kommun</label>

        <label for="phone-number">Telefonnummer</label>
        <input
          type="tel"
          name="phone-number"
          placeholder="Telefonnummer till din verkstad"
          v-model="phoneNumber"
          @input="checkInputDataPhone"
          :class="isPhoneNumberWrong ? 'input-error' : ''"
        />
        <p v-if="isPhoneNumberWrong">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen skriv ett telefon /
          mobilnummer!
        </p>

        <label for="email">Email adress</label>
        <input
          type="email"
          name="email"
          placeholder="namn@mail.com"
          v-model="email"
          @input="checkInputDataEmail"
          @blur="checkEmail"
          :class="isEmailWrong ? 'input-error' : ''"
        />
        <p v-if="isEmailWrong">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email
          adressen!
        </p>

        <label for="email">Bekräfta email adress</label>
        <input
          type="email"
          name="email"
          placeholder="namn@mail.com"
          @input="checkInputDataConfirmEmail"
          @blur="checkEmail"
          v-model="confirmEmail"
          :class="isEmailWrong ? 'input-error' : ''"
        />
        <p v-if="isEmailWrong">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email
          adressen!
        </p>

        <label for="password">Lösenord</label>
        <input
          type="password"
          name="password"
          placeholder="Lösenord"
          @input="checkInputDataPassword"
          @blur="checkPassword"
          v-model="password"
          :class="{ 'input-error': isPasswordWrong, 'input-password-weak': isPasswordWeak }"
        />
        <p class="warning-text" v-if="isPasswordWeak">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Lösenordet är svagt! Överväg att
          använda ett säkrare
        </p>
        <p v-if="isPasswordWrong">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenordet!
        </p>

        <label for="password">Bekräfta lösenord</label>
        <input
          type="password"
          name="password"
          placeholder="Lösenord"
          v-model="confirmPassword"
          @input="checkInputDataConfirmPassword"
          @blur="checkPassword"
          :class="{ 'input-error': isPasswordWrong, 'input-password-weak': isConfirmPasswordWeak }"
        />
        <p class="warning-text" v-if="isConfirmPasswordWeak">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Lösenordet är svagt! Överväg att
          använda ett säkrare
        </p>
        <p v-if="isPasswordWrong">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenordet!
        </p>

        <button
          type="submit"
          :disabled="isBtnDisabled"
          :class="isBtnDisabled ? 'register-mobile-button-disable' : 'register-mobile-button'"
        >
          Registrera
        </button>
      </form>
    </div>

    <div class="blue-line"></div>

    <div class="text-form-container">
      <p>
        Har du redan ett konto?
        <RouterLink to="/sign-in" class="router-link-text">Logga in här</RouterLink>
      </p>
    </div>

    <DialogBox v-if="isDialog"></DialogBox>
  </div>
</template>
