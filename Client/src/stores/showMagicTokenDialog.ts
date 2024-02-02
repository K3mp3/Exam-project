import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowMagicTokenDialog = defineStore('magicTokenDialog', () => {
  const showMagicTokenDialog = ref(false)
  const userEmail = ref('')
  const userId = ref('')

  function showMagicTokenInput(show: boolean, email?: string, _id?: string) {
    console.log(show, showMagicTokenDialog.value, userEmail.value)
    showMagicTokenDialog.value = show
    userEmail.value = email || ''
    userId.value = _id || ''
    console.log(userId.value)
  }

  return { showMagicTokenDialog, userEmail, userId, showMagicTokenInput }
})
