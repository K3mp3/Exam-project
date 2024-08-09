<script setup lang="ts">
import { useAuthStore } from '@/stores/storeSignedInUser'
import { computed, nextTick, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import LoadingSpinner from '../assets/LoadingSpinner.vue'
import ConsumerNav from '../nav/ConsumerNav.vue'
import InfoInput from '../utils/components/InfoInput.vue'

const email = ref('')
const password = ref('')

const isEmailValid = ref(true)
const isPasswordValid = ref(true)
const isEmailWrong = ref(false)
const isPasswordWrong = ref(false)
const isBtnDisabled = ref(true)
const isLoading = ref(false)

const authStore = useAuthStore()
const router = useRouter()

const inputsArray: { key: string; value: boolean }[] = [
  { key: 'isEmail', value: false },
  { key: 'isPassword', value: false }
]

const user = computed(() => {
  return {
    email: email.value,
    password: password.value,
    signedIn: true
  }
})

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
}

function checkInputsData(confirmKey: string) {
  nextTick(() => {
    let refVariable: Ref<string> | null = null
    switch (confirmKey) {
      case 'isEmail':
        refVariable = email
        break
      case 'isPassword':
        refVariable = password
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

const handleSignIn = async () => {
  isBtnDisabled.value = true
  isLoading.value = true
  try {
    const user = await authStore.customSignIn(email.value, password.value)
    router.push(`/user-home/${user.uid}`)
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error && error.message.includes('auth/invalid-credential')) {
      isEmailWrong.value = true
      isPasswordWrong.value = true
    } else {
      console.error('An unknown error occurred during sign-in')
    }
  } finally {
    isLoading.value = false
    isBtnDisabled.value = false
  }
}
</script>

<template>
  <nav>
    <ConsumerNav />
  </nav>
  <div class="flex items-center h-screen max-w-[800px] m-auto">
    <div class="p-4 flex flex-col gap-8 text-main w-full">
      <div class="flex gap-4 items-center">
        <RouterLink to="/" class="btn-back"
          ><fontAwesome :icon="['fas', 'chevron-left']"
        /></RouterLink>
        <h2 class="text-xl sm:text-2xl">Logga in</h2>
      </div>
      <form @submit.prevent="handleSignIn" class="flex flex-col gap-6">
        <div class="flex flex-col gap-6 sm:flex-row sm:gap-16">
          <label for="email" class="font-text-light flex flex-col gap-1 w-full"
            ><span>Email adress</span>
            <InfoInput
              :checkInputData="(e: string) => checkInputsData(e)"
              :inputData="(e: string) => (email = e)"
              :inputType="'email'"
              :inputName="'isEmail'"
              :isDataCorrect="isEmailValid"
              :dataError="isEmailWrong"
              placeholder="namn@dinmail.se"
            />
            <p
              v-if="!isEmailValid || isEmailWrong"
              :class="[!isEmailValid && 'text-warning-orange', isEmailWrong && 'text-error-red']"
            >
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" /><span
                >Vänligen kontrollera email adressen!</span
              >
            </p>
          </label>

          <label for="password" class="font-text-light flex flex-col gap-1 w-full"
            ><span>Lösenord</span>
            <InfoInput
              :checkInputData="(e: string) => checkInputsData(e)"
              :inputData="(e: string) => (password = e)"
              :inputType="'password'"
              :inputName="'isPassword'"
              :isDataCorrect="isPasswordValid"
              :dataError="isEmailWrong"
              placeholder="lösenord"
            />

            <p
              v-if="!isPasswordValid || isPasswordWrong"
              :class="[
                !isPasswordValid && 'text-warning-orange',
                isPasswordWrong && 'text-error-red'
              ]"
            >
              <fontAwesome :icon="['fas', 'triangle-exclamation']" class="mr-1" />Vänligen
              kontrollera lösenordet!
            </p>
          </label>
        </div>

        <button
          type="submit"
          :disabled="isBtnDisabled"
          :class="['mt-4 mb-2', isBtnDisabled ? 'main-btn-disabled' : 'main-btn']"
        >
          Logga in
        </button>

        <div class="flex flex-col gap-2">
          <p>
            Glömt lösenord?
            <RouterLink to="/forgot-password" class="font-semibold">Klicka här</RouterLink>
          </p>

          <p>
            Har du inget konto?
            <RouterLink to="/forgot-password" class="font-semibold">Registrera dig</RouterLink>
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
