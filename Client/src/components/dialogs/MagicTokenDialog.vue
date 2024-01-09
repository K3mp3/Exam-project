<script setup lang="ts">
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import { computed, ref } from 'vue'
import { checkMagicToken } from '../../services/signInUser'

const writtenToken = ref('')

const isMagicTokenWrong = ref(false)

const userEmail = computed(() => useShowMagicTokenDialog().userEmail)

const user = computed(() => {
  return {
    email: userEmail.value,
    magicToken: writtenToken.value
  }
})

async function handleSignIn() {
  const response = await checkMagicToken(user.value)
  console.log(response.repairShop)

  if (response.status === 201 && response.repairShop === false) {
    // router.push({ name: 'user-admin-page' })
  } else if (response.status === 201 && response.repairShop === true) {
    // router.push({ name: 'repair-shop-admin-page' })
  }

  if (response === 'Unauthorized') {
    isMagicTokenWrong.value = true
  }
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
