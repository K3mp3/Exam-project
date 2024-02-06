import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowMagicTokenDialog = defineStore('magicTokenDialog', () => {
  const showMagicTokenDialog = ref(false)
  const userEmail = ref('')
  const userId = ref('')

  function showMagicTokenInput(show: boolean, email?: string, _id?: string) {
    showMagicTokenDialog.value = show
    userEmail.value = email || ''
    userId.value = _id || ''
  }

  return { showMagicTokenDialog, userEmail, userId, showMagicTokenInput }
})
