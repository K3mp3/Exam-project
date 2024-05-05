<script setup lang="ts">
import router from '@/router'
import { signInUser } from '@/services/signInUser'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { computed, nextTick, ref } from 'vue'
import LoadingSpinner from '../assets/LoadingSpinner.vue'
import DialogBox from '../dialogs/DialogBox.vue'

const props = defineProps({
  loadingState: {
    type: Boolean,
    required: true
  }
})

const email = ref('')
const password = ref('')

const isEmailWrong = ref(false)
const isPasswordWrong = ref(false)
const isBtnDisabled = ref(true)
const isLoading = ref(false)

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
    isBtnDisabled.value = true
    return false
  } else {
    isBtnDisabled.value = false
    return true
  }
}

async function handleSignIn() {
  isBtnDisabled.value = true
  isLoading.value = true
  const response = await signInUser(user.value)

  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      router.push(`/user-home/${auth.currentUser?.uid}`)
    })
    .catch((error) => {
      console.log(error.code)
      switch (error.code) {
        case 'auth/invalid-credential':
          isEmailWrong.value = true
          isPasswordWrong.value = true
          isLoading.value = false
          break
      }
    })

  const responseStatus = response as unknown as { status: number }
  const responseData = response as { data: { message: string } }

  if (responseData.data.message === 'Wrong email or password!') {
    isEmailWrong.value = true
    isPasswordWrong.value = true
    isLoading.value = false
  }

  if (responseStatus) {
    isLoading.value = false
    nextTick(() => {
      isBtnDisabled.value = false
    })
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

        <div
          :class="[
            'sign-in-desktop-form-bottom-container',
            !isEmailWrong || !isPasswordWrong ? 'margin-tp-32' : ''
          ]"
        >
          <button
            type="submit"
            :disabled="isBtnDisabled"
            :class="
              isBtnDisabled
                ? 'sign-in-desktop-btn-disable display-flex align-items-center justify-center'
                : 'sign-in-desktop-btn display-flex align-items-center justify-center'
            "
          >
            Logga in
          </button>
          <p class="text-main display-flex gap-4 margin-tp-24">
            Glömt lösenord?<RouterLink to="/forgot-password" class="text-main">Byt här</RouterLink>
          </p>
        </div>
      </form>
      <div class="blue-line"></div>
    </div>
  </div>
  <div class="spinner-component" v-if="isLoading">
    <LoadingSpinner />
    <!-- Spinner by: https://codepen.io/jkantner/pen/QWrLOXW -->
  </div>
</template>
import router from '@/router' import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
