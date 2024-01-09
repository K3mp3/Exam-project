<script setup lang="ts">
import router from '@/router'
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import { computed, ref } from 'vue'
import { checkMagicToken } from '../../services/signInUser'

const writtenToken = ref('')

const isMagicTokenWrong = ref(false)

const userEmail = computed(() => useShowMagicTokenDialog().userEmail)
const isMagicTokenDialog = computed(() => useShowMagicTokenDialog().showMagicTokenDialog)

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

    router.push({ name: 'user landing view' })
  } else if (response.status === 201 && response.repairShop === true) {
    document.cookie = `name=${response.name}; expires=${expirationDate.toUTCString()}; path=/`
    document.cookie = `email=${userEmail.value}; expires=${expirationDate.toUTCString()}; path=/`
    document.cookie = `repairShop=${
      response.repairShop
    }; expires=${expirationDate.toUTCString()}; path=/`

    closeDialog()

    // router.push({ name: 'repair-shop-home' })
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
  <div class="dialog-container">
    <div class="dialog-box">
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

      <div class="button-container">
        <button type="button" class="filled-btn" @click="handleSignIn">Logga in</button>
        <button type="button" class="outline-btn" @click="closeDialog">Tillbaka</button>
      </div>
    </div>
  </div>
</template>
