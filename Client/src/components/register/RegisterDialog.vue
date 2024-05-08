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

const isRegister = computed(() => useShowRegisterDialog().isRegisterDialog)
const isRepairShopDialog = computed(() => useShowRepairShopDialog().isRepairShopDialog)
const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((filed) => filed.value)
}

function checkInputsData(confirmKey: string) {
  console.log(confirmKey)

  nextTick(() => {
    let refVariable: Ref<string> | null = null
    switch (confirmKey) {
      case 'isName':
        refVariable = name
        break
      case 'isEmail':
        refVariable = email
        break
      case 'isConfirmEmail':
        refVariable = confirmEmail
        break
      case 'isPassword':
        refVariable = password
        break
      case 'isConfirmPassword':
        refVariable = confirmPassword
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

function checkInputDataPassword() {
  checkInputsData('isPassword')
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
    }
  })
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
  checkInputData()

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
  <div class="desktop-form-background">
    <div class="desktop-dialog-container">
      <div class="desktop-dialog-nav">
        <button type="button" class="btn-back" @click="closeRegisterDialog">
          <fontAwesome :icon="['fas', 'chevron-left']" />
        </button>
        <h2>Registrera dig</h2>
      </div>
      <form @submit.prevent="handleRegistration" class="desktop-register-form">
        <div class="input-container-left">
          <label for="name">För- och efternamn</label>
          <input
            type="text"
            name="name"
            placeholder="För- och efternammn"
            v-model="name"
            @input="() => checkInputsData('isName')"
            :class="isNotBothNames ? 'input-error' : ''"
          />
          <p v-if="isNotBothNames">
            <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att både
            för- och efternamn finns med!
          </p>

          <label for="email">Email adress</label>
          <input
            type="email"
            name="email"
            placeholder="namn@mail.com"
            v-model="email"
            @input="() => checkInputsData('isEmail')"
            :class="isEmailWrong ? 'input-error' : ''"
            :value="isFilledEmail ? filledEmail : email"
          />
          <p v-if="isEmailWrong">
            <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att email
            adresserna stämmer överens!
          </p>

          <label for="email">Bekräfta email adress</label>
          <input
            type="email"
            name="email"
            placeholder="namn@mail.com"
            v-model="confirmEmail"
            @input="() => checkInputsData('isConfirmEmail')"
            :class="isEmailWrong ? 'input-error' : ''"
          />
          <p v-if="isEmailWrong">
            <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att email
            adresserna stämmer överens!
          </p>
        </div>

        <div class="input-container-right">
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
            <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att
            lösenorden stämmer överens!
          </p>

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
