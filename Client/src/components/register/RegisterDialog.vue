<script setup lang="ts">
import { registerUser } from '@/services/registerUser'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { computed, nextTick, onMounted, ref, type Ref } from 'vue'
import LoadingSpinner from '../assets/LoadingSpinner.vue'
import RegisterErrorDialog from '../dialogs/RegisterErrorDialog.vue'
import SentResponseDialog from '../dialogs/SentResponseDialog.vue'
import InfoInput from '../utils/components/InfoInput.vue'

const props = defineProps({
  closePrivateRegisterDialog: {
    type: Function,
    required: true
  }
})

const name = ref('')
const email = ref('')
const confirmEmail = ref('')
const password = ref('')
const confirmPassword = ref('')

const isNameValid = ref(true)
const showNameError = ref(false)
const isEmailValid = ref(true)
const isConfirmEmailValid = ref(true)
const showEmailError = ref(false)
const showEmailMatch = ref(false)
const showConfirmEmailError = ref(false)
const isBtnDisabled = ref(true)
const isPasswordWeak = ref(false)
const isConfirmPasswordWeak = ref(false)
const isEmailMatch = ref(true)
const isPasswordMatch = ref(true)
const showPasswordMatch = ref(false)
const showErrorDialog = ref(false)
const isConfirmationSuccess = ref(false)
const isLoading = ref(false)
const showEmailAlreadyExist = ref(false)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isName', value: false },
  { key: 'isEmail', value: false },
  { key: 'isConfirmEmail', value: false },
  { key: 'isPassword', value: false },
  { key: 'isConfirmPassword', value: false }
]

function closeRegisterDialog() {
  props.closePrivateRegisterDialog(false)
}

function checkInputData() {
  isBtnDisabled.value =
    !inputsArray.every((field) => field.value) ||
    !isEmailMatch.value ||
    !isNameValid.value ||
    !isPasswordMatch.value
}

function checkInputsData(confirmKey: string) {
  nextTick(() => {
    let refVariable: Ref<string> | null = null
    switch (confirmKey) {
      case 'isName':
        {
          const nameRegex = /^[^\s]+\s[^\s]+$/
          isNameValid.value = nameRegex.test(name.value)
        }
        refVariable = name
        break
      case 'isEmail':
        {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          checkEmailMatch()
          isEmailValid.value = emailRegex.test(email.value.trim())
        }
        refVariable = email
        break
      case 'isConfirmEmail':
        {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          checkEmailMatch()
          isConfirmEmailValid.value = emailRegex.test(confirmEmail.value.trim())
        }
        refVariable = confirmEmail
        break
      case 'isPassword':
        refVariable = password
        checkPasswordMatch()
        isPasswordWeak.value = password.value.length < 5
        break
      case 'isConfirmPassword':
        refVariable = confirmPassword
        checkPasswordMatch()
        isConfirmPasswordWeak.value = confirmPassword.value.length < 5
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

function validateName() {
  if (!isNameValid.value) {
    showNameError.value = true
  } else showNameError.value = false
}

function validateEmail() {
  if (!isEmailValid.value) {
    showEmailError.value = true
  } else showEmailError.value = false

  if (email.value !== '' && confirmEmail.value !== '') {
    if (email.value === confirmEmail.value) showEmailMatch.value = false
    else showEmailMatch.value = true
  }
}

function validateConfirmEmail() {
  if (!isConfirmEmailValid.value) {
    showConfirmEmailError.value = true
  } else showConfirmEmailError.value = false

  if (email.value !== '' && confirmEmail.value !== '') {
    if (email.value === confirmEmail.value) showEmailMatch.value = false
    else showEmailMatch.value = true
  }
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

function showIfPasswordMatch() {
  if (password.value !== '' && confirmPassword.value !== '') {
    if (password.value === confirmPassword.value) showPasswordMatch.value = false
    else showPasswordMatch.value = true
  }
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
  console.log(isPasswordMatch.value)
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
      })
  } else {
    isLoading.value = false
    showErrorDialog.value = true
  }
}

onMounted(() => {
  const storedEmail = localStorage.getItem('userEmail')

  if (storedEmail) {
    email.value = storedEmail
    checkInputsData('isEmail')
  }

  checkInputData()
})
</script>

<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-main-90 backdrop-blur-sm"
  >
    <div class="w-[800px] max-w-[1200px] flex flex-col gap-8 bg-main p-16 text-main runded-lg">
      <div class="flex gap-4 items-center relative">
        <button type="button" to="/" class="btn-back z-10" @click="closeRegisterDialog">
          <fontAwesome :icon="['fas', 'chevron-left']" />
        </button>
        <h2 class="text-xl sm:text-2xl absolute w-full text-center">Registrera dig</h2>
      </div>
      <form @submit.prevent="handleRegistration" class="flex gap-16">
        <div class="w-full flex flex-col gap-7">
          <label for="name" class="font-text-light flex flex-col gap-1"
            ><span>För- och efternman</span>
            <InfoInput
              :checkInputData="(e: string) => checkInputsData(e)"
              :inputData="(e: string) => (name = e)"
              :inputType="'text'"
              :inputName="'isName'"
              :isDataCorrect="!showNameError"
              :placeholder="'Namn på din verkstad'"
              :onBlur="validateName"
            />

            <p v-if="showNameError" class="text-warning-orange">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" />Vänligen
              kontrollera så att både för- och efternamn finns med!
            </p>
          </label>

          <label for="email" class="font-text-light flex flex-col gap-1"
            ><span>Email adress</span>
            <InfoInput
              :checkInputData="(e: string) => checkInputsData(e)"
              :inputData="(e: string) => (email = e)"
              :inputType="'email'"
              :inputName="'isEmail'"
              :isDataCorrect="!showEmailError && !showEmailMatch"
              :dataError="showEmailAlreadyExist"
              :placeholder="'namn@dinmail.se'"
              :onBlur="validateEmail"
            />
            <p v-if="showEmailError" class="text-warning-orange">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" /><span
                >Vänligen skriv en giltig email adress!</span
              >
            </p>

            <p v-if="showEmailMatch" class="text-warning-orange">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" /><span
                >Vänligen kontrollera så att email adresserna stämmer överens!</span
              >
            </p>

            <p v-if="showEmailAlreadyExist" class="text-error-red">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" /><span
                >Email adressen är redan registrerad!</span
              >
            </p>
          </label>

          <label for="email" class="font-text-light flex flex-col gap-1"
            ><span>Bekräfta email adress</span>
            <InfoInput
              :checkInputData="(e: string) => checkInputsData(e)"
              :inputData="(e: string) => (confirmEmail = e)"
              :inputType="'email'"
              :inputName="'isConfirmEmail'"
              :isDataCorrect="!showConfirmEmailError && !showEmailMatch"
              :dataError="showEmailAlreadyExist"
              :placeholder="'namn@dinmail.se'"
              :onBlur="validateConfirmEmail"
            />
            <p v-if="showConfirmEmailError" class="text-warning-orange">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" /><span
                >Vänligen skriv en giltig email adress!</span
              >
            </p>

            <p v-if="showEmailMatch" class="text-warning-orange">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" /><span
                >Vänligen kontrollera så att email adresserna stämmer överens!</span
              >
            </p>

            <p v-if="showEmailAlreadyExist" class="text-error-red">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" /><span
                >Email adressen är redan registrerad!</span
              >
            </p>
          </label>
        </div>

        <div class="w-full flex flex-col gap-7">
          <label for="password" class="font-text-light flex flex-col gap-1"
            ><span>Lösenord</span>
            <InfoInput
              :checkInputData="(e: string) => checkInputsData(e)"
              :inputData="(e: string) => (password = e)"
              :inputType="'password'"
              :inputName="'isPassword'"
              :isDataCorrect="!isPasswordWeak && !showPasswordMatch"
              :placeholder="'lösenord'"
              :onBlur="showIfPasswordMatch"
            />
            <p class="text-warning-orange" v-if="isPasswordWeak">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" /><span
                >Lösenordet är svagt! Överväg att använda ett säkrare</span
              >
            </p>

            <p v-if="showPasswordMatch" class="text-warning-orange">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" />Vänligen
              kontrollera så att lösenorden stämmer överens!
            </p>
          </label>

          <label for="password" class="font-text-light flex flex-col gap-1"
            ><span>Bekräfta lösenord</span>
            <InfoInput
              :checkInputData="(e: string) => checkInputsData(e)"
              :inputData="(e: string) => (confirmPassword = e)"
              :inputType="'password'"
              :inputName="'isConfirmPassword'"
              :isDataCorrect="!isConfirmPasswordWeak && !showPasswordMatch"
              :placeholder="'lösenord'"
              :onBlur="showIfPasswordMatch"
            />
            <p class="text-warning-orange" v-if="isConfirmPasswordWeak">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" /><span
                >Lösenordet är svagt! Överväg att använda ett säkrare</span
              >
            </p>

            <p v-if="showPasswordMatch" class="text-warning-orange">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" />Vänligen
              kontrollera så att lösenorden stämmer överens!
            </p>
          </label>

          <button
            type="submit"
            :disabled="isBtnDisabled"
            :class="['mt-[26.5px] mb-2', isBtnDisabled ? 'main-btn-disabled' : 'main-btn']"
          >
            Registrera
          </button>
        </div>
      </form>
      <div class="dialog-blue-line"></div>

      <div class="flex flex-col gap-2">
        <p>
          Har du redan ett konto?
          <RouterLink to="/sign-in" class="font-semibold">Logga in här</RouterLink>
        </p>
        <p>
          Har du en verkstad och vill registrera dig?
          <RouterLink to="/register-repair-shop" class="font-semibold"
            >Registrera dig här</RouterLink
          >
        </p>
      </div>
    </div>
    <RegisterErrorDialog
      v-if="showErrorDialog"
      :showErrorDialog="showErrorDialog"
      :title="'Whoops! Tyvärr kunde inte ditt konto registreras just nu.'"
      :text="'Vänligen försök igen senare. Om problemet kvarstår ber vi dig att kontakta support.'"
      :btnText="'Kontakta support'"
      :closeDialog="() => (showErrorDialog = false)"
    />
    <SentResponseDialog
      :isConfirmationSuccess="isConfirmationSuccess"
      :text="'Ditt konto är nu skapat!'"
      v-if="isConfirmationSuccess"
    />
  </div>
  <div class="spinner-component" v-if="isLoading">
    <LoadingSpinner />
    <!-- Spinner by: https://codepen.io/jkantner/pen/QWrLOXW -->
  </div>
</template>
