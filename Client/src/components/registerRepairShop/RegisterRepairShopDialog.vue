<script setup lang="ts">
import { registerRepairShop } from '@/services/registerUser'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { useShowRepairShopDialog } from '@/stores/useShowRepairShopDialog'
import { computed, nextTick, ref } from 'vue'
import DialogBox from '../dialogs/DialogBox.vue'

const props = defineProps({
  closeRepairShopRegisterDialog: {
    type: Function,
    required: true
  }
})

const name = ref('')
const location = ref('')
const phoneNumber = ref('')
const email = ref('')
const confirmEmail = ref('')
const password = ref('')
const confirmPassword = ref('')

const isName = ref(false)
const isLocation = ref(false)
const isPhoneNumber = ref(false)
const isEmail = ref(false)
const isConfirmEmail = ref(false)
const isPassword = ref(false)
const isConfirmPassword = ref(false)

const isPhoneNumberWrong = ref(false)
const isEmailWrong = ref(false)
const isPasswordWrong = ref(false)
const isBtnDisabled = ref(true)
const isPasswordWeak = ref(false)
const isConfirmPasswordWeak = ref(false)

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isName', value: false },
  { key: 'isLocation', value: false },
  { key: 'isPhoneNumber', value: false },
  { key: 'isEmail', value: false },
  { key: 'isConfirmEmail', value: false },
  { key: 'isPassword', value: false },
  { key: 'isConfirmPassword', value: false }
]

const isRepairShopDialog = computed(() => useShowRepairShopDialog().isRepairShopDialog)
const isDialog = computed(() => useShowPopUp().showPopUp)
const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)

const newUser = computed(() => {
  return {
    name: name.value,
    location: location.value,
    phoneNumber: phoneNumber.value,
    email: email.value,
    password: password.value,
    repairShop: true,
    signedIn: false
  }
})

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((filed) => filed.value)
  console.log('inputsArray:', inputsArray)
  console.log(isBtnDisabled.value)
}

function checkInputDataName() {
  nextTick(() => {
    if (name.value === '') {
      return
    } else {
      isName.value = true
      console.log(isName.value)

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

function checkInputDataLocation() {
  nextTick(() => {
    console.log(location.value)
    if (location.value === '') {
      return
    } else {
      isLocation.value = true
      console.log(isLocation.value)

      const index = inputsArray.findIndex((field) => field.key === 'isLocation')

      if (index !== -1) {
        inputsArray[index].value = isLocation.value
      } else {
        inputsArray.push({ key: 'isLocation', value: isLocation.value })
      }

      checkInputData()
    }
  })
}

function checkInputDataPhone() {
  nextTick(() => {
    if (phoneNumber.value === '') {
      return
    } else {
      isPhoneNumber.value = true
      console.log(isPhoneNumber.value)

      const index = inputsArray.findIndex((field) => field.key === 'isPhoneNumber')

      if (index !== -1) {
        inputsArray[index].value = isPhoneNumber.value
      } else {
        inputsArray.push({ key: 'isPhoneNumber', value: isPhoneNumber.value })
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

function checkEmail() {
  if (email.value === '') return
  if (confirmEmail.value === '') return

  if (email.value === confirmEmail.value) return
  else {
    isEmailWrong.value = true
  }
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

function checkPassword() {
  if (password.value === '') return
  if (confirmPassword.value === '') return
  if (password.value === confirmPassword.value) return
  else {
    isPasswordWrong.value = true
  }
}

function checkPasswordStrength(type: string) {
  if (type === 'password') {
    isPasswordWeak.value = password.value.length < 5
  } else {
    isConfirmPasswordWeak.value = confirmPassword.value.length < 5
  }
}

async function handleRegistration() {
  const response = await registerRepairShop(newUser.value)
  console.log(response)
}

function closeRegisterDialog() {
  props.closeRepairShopRegisterDialog(false)
}

function showSignInDialog() {
  const showRepairShopRegisterDialog = useShowRepairShopDialog()
  showRepairShopRegisterDialog.showRepairShopRegisterDialogForm(!isRepairShopDialog.value)

  const showSignInDialog = useShowSignInDialog()
  showSignInDialog.showSignInDialogForm(!isSignIn.value)

  closeRegisterDialog()
}
</script>

<template>
  <div class="desktop-form-background">
    <div class="desktop-dialog-container">
      <div class="desktop-dialog-nav">
        <button type="button" class="btn-back" @click="closeRegisterDialog">
          <fontAwesome :icon="['fas', 'chevron-left']" />
        </button>
        <h2>Registrera din verkstad</h2>
      </div>
      <form @submit.prevent="handleRegistration" class="desktop-register-form">
        <div class="input-container-left">
          <label for="name">Namn</label>
          <input
            type="text"
            name="name"
            placeholder="Namn på verkstaden"
            v-model="name"
            @input="checkInputDataName"
          />

          <label for="location">Kommun</label>
          <select
            name="location"
            class="desktop-register-form-select"
            v-model="location"
            :key="location"
            @change="checkInputDataLocation"
          >
            <option value="sundsvall">Sundsvall</option>
          </select>

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
        </div>

        <div class="input-container-right">
          <label for="email">Bekräfta email adress</label>
          <input
            type="email"
            name="email"
            placeholder="namn@mail.com"
            v-model="confirmEmail"
            @input="checkInputDataConfirmEmail"
            @blur="checkEmail"
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
            v-model="password"
            @input="checkInputDataPassword"
            @blur="checkPassword"
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
            <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenordet!
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
      </div>

      <DialogBox v-if="isDialog"></DialogBox>
    </div>
  </div>
</template>
