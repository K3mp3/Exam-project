import { defineStore } from 'pinia'
import { ref } from 'vue'

export const storeRemoveRequest = defineStore('storeRemoveRequest', () => {
  const storedData = ref()

  function storeRemovedData(data: object) {
    storedData.value = data
  }

  return { storedData, storeRemovedData }
})
