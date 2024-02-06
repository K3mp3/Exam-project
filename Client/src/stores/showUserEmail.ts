import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowUserEmail = defineStore('userEmail', () => {
  const userEmail = ref('')
  const isEmail = ref(false)

  function useUserEmail(email: string, isEmailUsed: boolean) {
    userEmail.value = email
    isEmail.value = isEmailUsed
  }

  return { userEmail, isEmail, useUserEmail }
})
