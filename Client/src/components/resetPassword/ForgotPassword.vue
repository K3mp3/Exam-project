<script setup lang="ts">
import { forgotPasswordService } from '@/services/forgotPasswordService'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { computed, onMounted, ref } from 'vue'
import LoadingSpinner from '../assets/LoadingSpinner.vue'
import ConsumerNav from '../nav/ConsumerNav.vue'

const isBtnDisabled = ref(true)
const isEmailWrong = ref(false)
const isLoading = ref(false)
const isConfirmation = ref(false)
const isConfirmationError = ref(false)

const email = ref('')

interface ForgotPasswordResponse {
  status: number
}

function checkInputData() {
  if (email.value === '') {
    isBtnDisabled.value = true
    return false
  } else {
    isBtnDisabled.value = false
    return true
  }
}

async function handleReset() {
  isBtnDisabled.value = true
  isLoading.value = true

  const user = computed(() => {
    return {
      email: email.value
    }
  })

  const response = (await forgotPasswordService(user.value)) as { status: number; data: string }

  if (response.status === 201) {
    console.log('hejsan')
    isLoading.value = false
    isConfirmation.value = true

    setTimeout(() => {
      isConfirmation.value = false
    }, 4000)
  } else if (response.status === 500) {
    isLoading.value = false
    isConfirmationError.value = true

    setTimeout(() => {
      isConfirmationError.value = false
    }, 4000)
  }
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
  <main class="display-flex height-100vh max">
    <form
      @submit.prevent="handleReset"
      class="padding-16 display-flex flex-dir-col gap-16 text-main margin-au bg-main m-width-330px"
    >
      <h2>Återställ ditt lösenord</h2>
      <p>Skriv in din mailadress och så skickar vi en återställningslänk</p>

      <div class="display-flex flex-dir-col text-align-left gap-4">
        <label for="email" class="text-main">Mailadress</label>
        <input
          type="email"
          name="email"
          placeholder="namn@mail.com"
          v-model="email"
          @input="checkInputData"
          :class="['p-10-x ', isEmailWrong ? 'input-error' : 'text-input']"
        />
        <p v-if="isEmailWrong">
          <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email
          adressen!
        </p>
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
    <div class="spinner-component" v-if="isLoading">
      <LoadingSpinner />
      <!-- Spinner by: https://codepen.io/jkantner/pen/QWrLOXW -->
    </div>
  </main>
  <div class="confirmation-box-background" v-if="isConfirmation || isConfirmationError">
    <div class="confirmation-box" v-if="isConfirmation">
      <fontAwesome :icon="['fas', 'check']" class="text-main font-title-bold O35rem" />
      <p class="text-main font-title-bold O1rem">Email skickat!</p>
    </div>

    <div class="confirmation-box-error" v-if="isConfirmationError">
      <fontAwesome :icon="['fas', 'x']" class="text-main font-title-bold O35rem" />
      <p class="text-main font-title-bold O1rem">Email kunde ej skickas!</p>
    </div>
  </div>
</template>
