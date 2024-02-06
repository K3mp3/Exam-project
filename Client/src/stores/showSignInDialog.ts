import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowSignInDialog = defineStore('signInDialog', () => {
  const isSignInDialog = ref(false)

  function showSignInDialogForm(show: boolean) {
    isSignInDialog.value = show
  }

  return { isSignInDialog, showSignInDialogForm }
})
