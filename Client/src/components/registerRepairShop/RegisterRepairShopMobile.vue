<script setup lang="ts">
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { computed, ref } from 'vue'
import { registerRepairShop } from '../../services/registerUser'
import DialogBox from '../dialogs/DialogBox.vue'

const name = ref('')
const location = ref('')
const phoneNumber = ref('')
const email = ref('')
const confirmEmail = ref('')
const password = ref('')
const confirmPassword = ref('')

const isPhoneNumberWrong = ref(false)
const isEmailWrong = ref(false)
const isPasswordWrong = ref(false)
const disableRegisterBtn = ref(true)
const isPasswordWeak = ref(false)
const isConfirmPasswordWeak = ref(false)

const isDialog = computed(() => useShowPopUp().showPopUp)

const newUser = computed(() => {
  return {
    name: name.value,
    location: location.value,
    phoneNumber: phoneNumber.value,
    email: email.value,
    password: password.value,
    repairShop: true
  }
})

function checkInputData() {
  checkInputEmail()

  if (
    name.value === '' ||
    location.value === '' ||
    phoneNumber.value === '' ||
    email.value === '' ||
    confirmEmail.value === '' ||
    password.value === '' ||
    confirmPassword.value === ''
  ) {
    disableRegisterBtn.value = true
    return false
  } else {
    disableRegisterBtn.value = false
    return true
  }
}

function checkInputPhoneNumber() {
  const numberRegex = /^[0-9\s]+$/

  if (numberRegex.test(phoneNumber.value)) {
    return (isPhoneNumberWrong.value = false)
  } else {
    isPhoneNumberWrong.value = true
  }
}

function checkInputEmail() {
  if (email.value === confirmEmail.value) {
    isEmailWrong.value = false
  } else {
    isEmailWrong.value = true
  }
}

function checkInputPassword() {
  if (password.value === confirmPassword.value) {
    isPasswordWrong.value = false
  } else {
    isPasswordWrong.value = true
  }
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
  checkInputData()

  if (checkInputData()) {
    const response = await registerRepairShop(newUser.value)
    console.log(response)
  } else {
    console.log('error')
  }
}
</script>

<template>
  <div class="mobile-form-background">
    <div class="mobile-form-nav">
      <RouterLink to="/" class="router-link"
        ><fontAwesome :icon="['fas', 'chevron-left']"
      /></RouterLink>
      <h2>Registrera din verkstad</h2>
    </div>
    <form @submit.prevent="handleRegistration" class="mobile-register-form">
      <label for="name">Namn</label>
      <input
        type="text"
        name="name"
        placeholder="Namn på verkstaden"
        v-model="name"
        @change="checkInputData"
      />

      <label for="location">Kommun</label>
      <select
        name="location"
        class="mobile-register-form-select"
        v-model="location"
        :key="location"
        @change="checkInputData"
      >
        <option value="Sundsvall">Sundsvall</option>
      </select>

      <label for="phone-number">Telefonnummer</label>
      <input
        type="tel"
        name="phone-number"
        placeholder="Telefonnummer till din verkstad"
        v-model="phoneNumber"
        @blur="checkInputPhoneNumber"
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
        :class="isEmailWrong ? 'input-error' : ''"
      />
      <p v-if="isEmailWrong">
        <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email adressen!
      </p>

      <label for="email">Bekräfta email adress</label>
      <input
        type="email"
        name="email"
        placeholder="namn@mail.com"
        @blur="checkInputData"
        v-model="confirmEmail"
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
        @input="checkPasswordStrength('password')"
        v-model="password"
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
        @blur="checkInputPassword"
        @input="checkPasswordStrength('confirmPassword')"
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
        :disabled="disableRegisterBtn"
        :class="disableRegisterBtn ? 'register-mobile-button-disable' : 'register-mobile-button'"
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
    </div>

    <DialogBox v-if="isDialog"></DialogBox>
  </div>
</template>
