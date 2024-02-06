import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSignInStore = defineStore('signInUser', () => {
  const signedIn = ref(false)

  function signInUser(isSignedIn: boolean) {
    signedIn.value = isSignedIn
  }

  return { signedIn, signInUser }
})
