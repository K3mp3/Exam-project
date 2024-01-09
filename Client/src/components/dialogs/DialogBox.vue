<script setup lang="ts">
import { computed } from 'vue'
import { useShowPopUp } from '../../stores/ShowPopUpStore'

const dialogMessage = computed(() => useShowPopUp().popUpMessage)

function closeDialog() {
  const closeDialogBox = useShowPopUp()
  closeDialogBox.showPopUpTab(false, '')
}
</script>

<template>
  <div class="dialog-container">
    <div class="dialog-box">
      <p>{{ dialogMessage }}</p>

      <div class="button-container">
        <RouterLink to="sign-in" class="outline-btn">Logga in</RouterLink>
        <button type="button" class="filled-btn" @click="closeDialog">Tillbaka</button>
      </div>
    </div>
  </div>
</template>
