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
  <div
    class="width-100vw height-100vh bg-main p-absolute top-0 left-0 z-index-2 padding-16 display-flex align-items-center"
  >
    <div class="display-flex flex-dir-col gap-16 m-width-320px margin-auto">
      <p class="font-text-light text-main">{{ dialogMessage }}</p>

      <div class="display-flex justify-between gap-16">
        <RouterLink to="sign-in" class="outline-btn font-text-light text-main text-deco-none"
          >Logga in</RouterLink
        >
        <button type="button" class="filled-btn el-white-main text-secondary" @click="closeDialog">
          Tillbaka
        </button>
      </div>
    </div>
  </div>
</template>
