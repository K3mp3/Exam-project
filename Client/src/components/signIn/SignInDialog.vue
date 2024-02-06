<script setup lang="ts">
import { signInUser } from '@/services/signInUser'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { computed, ref } from 'vue'
import DialogBox from '../dialogs/DialogBox.vue'

const email = ref('')
const password = ref('')

const isEmailWrong = ref(false)
const isPasswordWrong = ref(false)
const disableRegisterBtn = ref(true)

const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)
const isDialog = computed(() => useShowPopUp().showPopUp)

const user = computed(() => {
  return {
    email: email.value,
    password: password.value,
    signedIn: true
  }
})

function checkInputData() {
  if (email.value === '' || password.value === '') {
    disableRegisterBtn.value = true
    return false
  } else {
    disableRegisterBtn.value = false
    return true
  }
}

async function handleSignIn() {
  const response = await signInUser(user.value)

  if (response === 'Wrong email or password!') {
    isEmailWrong.value = true
    isPasswordWrong.value = true
  }
}

function closeSignInDialog() {
  const showSignInDialog = useShowSignInDialog()
  showSignInDialog.showSignInDialogForm(!isSignIn.value)
}
</script>

<template>
  <div class="sign-in-desktop-dialog-background">
    <DialogBox v-if="isDialog"></DialogBox>
    <div class="sign-in-desktop-dialog-container">
      <div class="sign-in-desktop-form-nav">
        <button type="button" class="sign-in-form-back-link" @click="closeSignInDialog">
          <fontAwesome :icon="['fas', 'chevron-left']" />
        </button>
        <h2>Logga in</h2>
      </div>
      <form @submit.prevent="handleSignIn" class="sign-in-desktop-form">
        <div class="sign-in-desktop-form-top-container">
          <div class="sign-in-dialog-input-container">
            <label for="email">Email adress</label>
            <input
              type="email"
              name="email"
              placeholder="namn@mail.com"
              v-model="email"
              @input="checkInputData"
              :class="isEmailWrong ? 'input-error' : ''"
            />
            <p v-if="isEmailWrong">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email
              adressen!
            </p>
          </div>

          <div class="sign-in-dialog-input-container">
            <label for="password">Lösenord</label>
            <input
              type="password"
              name="password"
              placeholder="Lösenord"
              v-model="password"
              @input="checkInputData"
              :class="isPasswordWrong ? 'input-error' : ''"
            />
            <p v-if="isEmailWrong">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera
              lösenordet!
            </p>
          </div>
        </div>

        <div class="sign-in-desktop-form-bottom-container">
          <button
            type="submit"
            :disabled="disableRegisterBtn"
            :class="disableRegisterBtn ? 'sign-in-desktop-btn-disable' : 'sign-in-desktop-btn'"
          >
            Logga in
          </button>
        </div>
      </form>
      <div class="blue-line"></div>
    </div>
  </div>
</template>
