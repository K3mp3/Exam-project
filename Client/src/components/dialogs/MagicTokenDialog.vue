<script setup lang="ts">
import router from '@/router'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import { computed, onMounted, ref } from 'vue'
import { checkMagicToken } from '../../services/signInUser'
import DialogBox from '../dialogs/DialogBox.vue'

const writtenToken = ref('')
const setUserId = ref('')
const isMagicTokenWrong = ref(false)

const userEmail = computed(() => useShowMagicTokenDialog().userEmail)
const userId = computed(() => useShowMagicTokenDialog().userId)
setUserId.value = userId.value
const isMagicTokenDialog = computed(() => useShowMagicTokenDialog().showMagicTokenDialog)
const isDialog = computed(() => useShowPopUp().showPopUp)

const user = computed(() => {
  return {
    email: userEmail.value,
    magicToken: writtenToken.value
  }
})

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const isCookieAccepted = getCookie('accept')

async function handleSignIn() {
  const response = await checkMagicToken(user.value)

  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 60.8)

  if (response.status === 201 && response.repairShop === false) {
    if (isCookieAccepted === 'true') {
      document.cookie = `name=${response.name}; expires=${expirationDate.toUTCString()}; path=/`
      document.cookie = `email=${userEmail.value}; expires=${expirationDate.toUTCString()}; path=/`
      document.cookie = `repairShop=${
        response.repairShop
      }; expires=${expirationDate.toUTCString()}; path=/`
    }

    closeDialog()

    console.log(response)
    router.push(`/user-home/${response.userId}`)
  } else if (response.status === 201 && response.repairShop === true) {
    if (isCookieAccepted === 'true') {
      document.cookie = `name=${response.name}; expires=${expirationDate.toUTCString()}; path=/`
      document.cookie = `email=${userEmail.value}; expires=${expirationDate.toUTCString()}; path=/`
      document.cookie = `repairShop=${
        response.repairShop
      }; expires=${expirationDate.toUTCString()}; path=/`
    }

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

onMounted(() => {
  console.log(userId.value)
})
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
