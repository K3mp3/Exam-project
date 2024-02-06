import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowMessageDialog = defineStore('messageDialog', () => {
  const showMessageDialog = ref(false)

  function showMessageContent(show: boolean) {
    showMessageDialog.value = show
  }

  return { showMessageDialog, showMessageContent }
})
