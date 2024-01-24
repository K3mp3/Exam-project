import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSignInStore = defineStore('signInUser', () => {
  const signedIn = ref(false)

  function signInUser(isSignedIn: boolean) {
    console.log('isSignedIn:', isSignedIn)
    signedIn.value = isSignedIn
    console.log(signedIn.value)
  }

  return { signedIn, signInUser }
})
