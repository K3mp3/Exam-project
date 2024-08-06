<script setup lang="ts">
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import LoadingSpinner from '../assets/LoadingSpinner.vue'
import ErrorDialog from '../dialogs/ErrorDialog.vue'
import SentResponseDialog from '../dialogs/SentResponseDialog.vue'
import ConsumerNav from '../nav/ConsumerNav.vue'
import InfoInput from '../utils/components/InfoInput.vue'

const isBtnDisabled = ref(true)
const isEmailValid = ref(true)
const isLoading = ref(false)
const isConfirmationSuccess = ref(false)
const showErrorDialog = ref(false)

const email = ref('')

function checkInputData() {
  checkInputDataEmail()
  if (email.value === '' || !isEmailValid.value) {
    isBtnDisabled.value = true
    return false
  } else {
    isBtnDisabled.value = false
    return true
  }
}

function checkInputDataEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  isEmailValid.value = emailRegex.test(email.value.trim())
}

async function handleReset() {
  const auth = getAuth()

  isBtnDisabled.value = true
  isLoading.value = true

  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      isLoading.value = false
      isConfirmationSuccess.value = true

      setTimeout(() => {
        isConfirmationSuccess.value = false
      }, 4000)
    })
    .catch((error) => {
      console.log(error)
    })

  // const user = computed(() => {
  //   return {
  //     email: email.value
  //   }
  // })

  // const response = (await forgotPasswordService(user.value)) as { status: number; data: string }

  // if (response.status === 201) {
  //   console.log('hejsan')
  //   isLoading.value = false
  //   isConfirmationSuccess.value = true

  //   setTimeout(() => {
  //     isConfirmationSuccess.value = false
  //   }, 4000)
  // } else if (response.status === 500) {
  //   isLoading.value = false
  //   showErrorDialog.value = true

  //   setTimeout(() => {
  //     showErrorDialog.value = false
  //   }, 4000)
  // }
}

onMounted(() => {
  const showSignInDialog = useShowSignInDialog()
  showSignInDialog.showSignInDialogForm(false)
})
</script>

<template>
  <nav>
    <ConsumerNav />
  </nav>
  <div class="flex items-center justify-center h-screen">
    <div class="p-4 flex flex-col gap-8 text-main w-full max-w-[340px]">
      <div class="flex gap-4 items-center">
        <RouterLink to="/" class="btn-back"
          ><fontAwesome :icon="['fas', 'chevron-left']"
        /></RouterLink>
        <h2 class="text-xl sm:text-2xl">Återställ ditt lösenord</h2>
      </div>
      <form @submit.prevent="handleReset" class="flex flex-col gap-6">
        <div class="display-flex flex-dir-col text-align-left gap-4">
          <label for="email" class="font-text-light flex flex-col gap-1"
            ><span>Email adress</span>
            <InfoInput
              :checkInputData="checkInputData"
              :inputData="(e: string) => (email = e)"
              :inputType="'email'"
              :inputName="'isEmail'"
              :isDataCorrect="isEmailValid"
              :placeholder="'namn@dinmail.se'"
            />
            <p v-if="!isEmailValid" class="text-warning-orange">
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" /><span
                >Vänligen kontrollera email adressen!</span
              >
            </p>
          </label>
        </div>

        <button
          type="submit"
          :disabled="isBtnDisabled"
          :class="[
            'margin-tp-16 font-text-light',
            isBtnDisabled ? 'main-btn-disabled' : 'main-btn w-full text-main'
          ]"
        >
          Återställ lösenord
        </button>
      </form>
    </div>
    <ErrorDialog
      v-if="showErrorDialog"
      :showErrorDialog="showErrorDialog"
      :title="'Whoops! Tyvärr gick inte mailet att skicka.'"
      :text="'Vänligen försök igen senare. Om problemet kvarstår ber vi dig att kontakta support.'"
      :btnText="'Kontakta support'"
      :closeDialog="() => (showErrorDialog = false)"
    />
    <SentResponseDialog
      :isConfirmationSuccess="isConfirmationSuccess"
      :text="'Återställningslänk har skickats!'"
      v-if="isConfirmationSuccess"
    />
  </div>
  <div class="spinner-component" v-if="isLoading">
    <LoadingSpinner />
    <!-- Spinner by: https://codepen.io/jkantner/pen/QWrLOXW -->
  </div>
</template>
