import { defineStore } from 'pinia'
import { ref } from 'vue'

export const requestDataStore = defineStore('userRequest', () => {
  const repairShopName = ref('')
  const repairShopEmail = ref('')
  const repairShopNumber = ref('')

  function sendUserRequestData(name: string, email: string, number: string) {
    repairShopName.value = name
    repairShopEmail.value = email
    repairShopNumber.value = number
  }

  return {
    repairShopName,
    repairShopEmail,
    repairShopNumber,
    sendUserRequestData
  }
})
