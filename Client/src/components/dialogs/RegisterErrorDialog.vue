<script setup lang="ts">
import router from '@/router'
import { useShowRegisterDialog } from '@/stores/showRegisterDialog'

const props = defineProps({
  closeDialog: {
    type: Function,
    required: true
  }
})

function directUser() {
  router.push('/contact')
  const showRegisterDialog = useShowRegisterDialog()
  showRegisterDialog.showRegisterDialogForm(false)
}
</script>

<template>
  <div
    class="w-screen h-screen bg-main-90 z-50 fixed flex text-main p-4 sm:p-8 md:p-16 items-center justify-center"
  >
    <div
      class="w-full max-w-[1200px] h-[606px] radius-10 bg-main z-50 absolute flex flex-col gap-12 text-main p-8 items-center justify-center"
    >
      <div class="flex gap-4 w-full max-w-[646px] items-center">
        <button type="button" class="btn-back" @click="() => props.closeDialog(false)">
          <fontAwesome :icon="['fas', 'chevron-left']" />
        </button>
      </div>

      <div class="flex flex-col gap-4 justify-center items-center">
        <fontAwesome :icon="['fas', 'circle-exclamation']" class="w-20 h-20 text-error-red mb-2" />
        <h2 class="O16rem">Whoops! Tyvärr kunde inte ditt konto registreras just nu.</h2>
        <p>Vänligen försök igen senare. Om problemet kvarstår ber vi dig att kontakta support.</p>
        <button type="button" class="main-btn-white flex items-center p-5 mt-4" @click="directUser">
          <p>Kontakta support</p>
        </button>
      </div>
    </div>
  </div>
</template>
