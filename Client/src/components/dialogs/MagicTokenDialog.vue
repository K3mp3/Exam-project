<script setup lang="ts">
import router from '@/router'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import { computed, ref } from 'vue'
import { checkMagicToken } from '../../services/signInUser'
import DialogBox from '../dialogs/DialogBox.vue'

const writtenToken = ref('')

const isMagicTokenWrong = ref(false)

const userEmail = computed(() => useShowMagicTokenDialog().userEmail)
const isMagicTokenDialog = computed(() => useShowMagicTokenDialog().showMagicTokenDialog)
const isDialog = computed(() => useShowPopUp().showPopUp)

const user = computed(() => {
  return {
    email: userEmail.value,
    magicToken: writtenToken.value
  }
})

async function handleSignIn() {
  const response = await checkMagicToken(user.value)

  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 60.8)

  if (response.status === 201 && response.repairShop === false) {
    document.cookie = `name=${response.name}; expires=${expirationDate.toUTCString()}; path=/`
    document.cookie = `email=${userEmail.value}; expires=${expirationDate.toUTCString()}; path=/`
    document.cookie = `repairShop=${
      response.repairShop
    }; expires=${expirationDate.toUTCString()}; path=/`

    closeDialog()

    router.push({ name: 'user home view' })
  } else if (response.status === 201 && response.repairShop === true) {
    document.cookie = `name=${response.name}; expires=${expirationDate.toUTCString()}; path=/`
    document.cookie = `email=${userEmail.value}; expires=${expirationDate.toUTCString()}; path=/`
    document.cookie = `repairShop=${
      response.repairShop
    }; expires=${expirationDate.toUTCString()}; path=/`

    closeDialog()

    router.push({ name: 'repair shop home view' })
  }

  if (response === 'Unauthorized') {
    isMagicTokenWrong.value = true
  }
}

function closeDialog() {
  const closeMagicTokenDialog = useShowMagicTokenDialog()
  closeMagicTokenDialog.showMagicTokenInput(false)
}
</script>

<template>
  <div class="magic-token-dialog-container">
    <DialogBox v-if="isDialog"></DialogBox>
    <div class="magic-token-dialog-box">
      <input
        type="text"
        placeholder="veriferings kod"
        v-model="writtenToken"
        :class="isMagicTokenWrong ? 'input-error' : ''"
      />
      <p v-if="isMagicTokenWrong" class="wrong-text">
        <fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera
        verifieringskoden!
      </p>

      <div class="magic-token-button-container">
        <button type="button" class="filled-btn" @click="handleSignIn">Logga in</button>
        <button type="button" class="outline-btn" @click="closeDialog">Tillbaka</button>
      </div>
    </div>
  </div>
</template>
