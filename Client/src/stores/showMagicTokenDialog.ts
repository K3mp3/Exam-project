import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowMagicTokenDialog = defineStore('magicTokenDialog', () => {
  const showMagicTokenDialog = ref(false)
  const userEmail = ref('')

  function showMagicTokenInput(show: boolean, email?: string) {
    showMagicTokenDialog.value = show
    userEmail.value = email || ''
    console.log(userEmail.value)
  }

  return { showMagicTokenDialog, userEmail, showMagicTokenInput }
})
