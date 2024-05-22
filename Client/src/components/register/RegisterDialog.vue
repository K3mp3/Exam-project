<script setup lang="ts">
import { registerUser } from '@/services/registerUser'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useShowRegisterDialog } from '@/stores/showRegisterDialog'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { useShowUserEmail } from '@/stores/showUserEmail'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { computed, nextTick, onMounted, ref, type Ref } from 'vue'
import { useShowRepairShopDialog } from '../../stores/useShowRepairShopDialog'
import LoadingSpinner from '../assets/LoadingSpinner.vue'
import DialogBox from '../dialogs/DialogBox.vue'
import RegisterErrorDialog from '../dialogs/RegisterErrorDialog.vue'
import SentResponseDialog from '../dialogs/SentResponseDialog.vue'
import InfoInput from '../utils/components/InfoInput.vue'

const props = defineProps({
  showRepairShopRegisterDialog: {
    type: Function,
    required: true
  }
})

const name = ref('')
const email = ref('')
const confirmEmail = ref('')
const password = ref('')
const confirmPassword = ref('')

const isPassword = ref(false)
const isConfirmPassword = ref(false)

const isLoading = ref(false)
const showErrorDialog = ref(false)
const isConfirmationSuccess = ref(false)
const isEmailValid = ref(false)
const isPasswordWrong = ref(false)
const isNameValid = ref(false)
const isBtnDisabled = ref(true)
const isPasswordWeak = ref(false)
const isConfirmPasswordWeak = ref(false)
const isEmailMatch = ref(true)
const isPasswordMatch = ref(true)
const isConfirmEmailValid = ref(true)

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

const isRegister = computed(() => useShowRegisterDialog().isRegisterDialog)
const isRepairShopDialog = computed(() => useShowRepairShopDialog().isRepairShopDialog)
const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)

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
  isNameValid.value = nameRegex.test(name.value)

  console.log(isNameValid.value)
}

function checkInputDataEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  isEmailValid.value = emailRegex.test(email.value.trim())
}

function checkInputDataConfirmEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  isConfirmEmailValid.value = emailRegex.test(confirmEmail.value.trim())
}

function checkInputDataConfirmPassword() {
  checkInputsData('isConfirmPassword')
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
      .then(async (data) => {
        isLoading.value = false
        isConfirmationSuccess.value = true

        setTimeout(() => {
          isConfirmationSuccess.value = false
        }, 4000)
      })
      .catch((error) => {
        isLoading.value = false
      })
  } else {
    isLoading.value = false
    showErrorDialog.value = true
  }
}

function closeRegisterDialog() {
  const showRegisterDialog = useShowRegisterDialog()
  showRegisterDialog.showRegisterDialogForm(!isRegister.value)
}

function showSignInDialog() {
  const showRegisterDialog = useShowRegisterDialog()
  showRegisterDialog.showRegisterDialogForm(!isRegister.value)

  const showSignInDialog = useShowSignInDialog()
  showSignInDialog.showSignInDialogForm(!isSignIn.value)
}

function showRegisterRepairShopDialog() {
  props.showRepairShopRegisterDialog(true)

  const showRepairShopRegisterDialog = useShowRepairShopDialog()
  showRepairShopRegisterDialog.showRepairShopRegisterDialogForm(!isRepairShopDialog.value)

  const showRegisterDialog = useShowRegisterDialog()
  showRegisterDialog.showRegisterDialogForm(!isRegister.value)
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
    <div class="max-w-[1200px] flex flex-col gap-16 bg-main p-16 bg-blue-500">
      <div class="flex gap-4 items-center relative">
        <button type="button" to="/" class="btn-back z-10">
          <fontAwesome :icon="['fas', 'chevron-left']" />
        </button>
        <h2 class="text-xl sm:text-2xl absolute w-full text-center">Registrera dig</h2>
      </div>
      <form @submit.prevent="handleRegistration" class="flex gap-16">
        <div class="w-full flex flex-col gap-7">
          <label for="name" class="font-text-light flex flex-col gap-1"
            ><span>För- och efternamn</span>
            <InfoInput
              :checkInputData="(e: string) => checkInputsData(e)"
              :inputData="(e: string) => (name = e)"
              :inputType="'text'"
              :inputName="'isName'"
              :isDataCorrect="isNameValid"
              :placeholder="'För- och efternamn'"
            />
            <p v-if="!isNameValid" class="text-warning-orange">
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
              :isDataCorrect="isEmailValid"
              :placeholder="'namn@dinmail.se'"
              :predefinedValue="filledEmail ? filledEmail : ''"
              :onBlur="checkEmailMatch"
            />
            <p v-if="!isEmailValid || !isEmailMatch" class="text-warning-orange">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" />Vänligen
              kontrollera email adressen!
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
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" />Vänligen
              kontrollera email adressen!
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
              :isDataCorrect="!isPasswordWeak"
              :placeholder="'lösenord'"
              :onBlur="checkPasswordMatch"
            />
            <p class="text-warning-orange" v-if="isPasswordWeak">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" />Lösenordet är
              svagt! Överväg att använda ett säkrare
            </p>

            <p v-if="isPasswordWrong">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att
              lösenorden stämmer överens!
            </p>
          </label>

          <label for="password">Bekräfta lösenord</label>
          <input
            type="password"
            name="password"
            placeholder="Lösenord"
            v-model="confirmPassword"
            @input="checkInputDataConfirmPassword"
            :class="{
              'input-error': isPasswordWrong,
              'input-password-weak': isConfirmPasswordWeak
            }"
          />
          <p class="warning-text" v-if="isConfirmPasswordWeak">
            <fontAwesome :icon="['fas', 'triangle-exclamation']" />Lösenordet är svagt! Överväg att
            använda ett säkrare
          </p>
          <p v-if="isPasswordWrong">
            <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att
            lösenorden stämmer överens!
          </p>

          <button
            type="submit"
            :disabled="isBtnDisabled"
            :class="isBtnDisabled ? 'register-desktop-button-disable' : 'desktop-register-btn'"
          >
            Registrera
          </button>
        </div>
      </form>
      <div class="dialog-blue-line"></div>

      <div class="dialog-text-form-container">
        <p>
          Har du redan ett konto?
          <button type="button" class="router-link-text" @click="showSignInDialog">
            Logga in här
          </button>
        </p>
        <p>
          Har du en verkstad och vill registrera dig?
          <button type="button" class="router-link-text" @click="showRegisterRepairShopDialog">
            Klicka här
          </button>
        </p>
      </div>

      <DialogBox v-if="isDialog"></DialogBox>
    </div>
    <RegisterErrorDialog
      v-if="showErrorDialog"
      :showErrorDialog="showErrorDialog"
      :closeDialog="() => (showErrorDialog = false)"
    />
    <SentResponseDialog
      :isConfirmationSuccess="isConfirmationSuccess"
      v-if="isConfirmationSuccess"
    />
  </div>
  <div class="spinner-component" v-if="isLoading">
    <LoadingSpinner />
    <!-- Spinner by: https://codepen.io/jkantner/pen/QWrLOXW -->
  </div>
</template>
