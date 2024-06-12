<script setup lang="ts">
const props = defineProps({
  showPrivateRegisterDialog: {
    type: Function,
    required: true
  },
  showRepairShopRegisterDialog : {
    type: Function,
    required: true
  }
})

function showPrivateRegisterForm() {
  props.showPrivateRegisterDialog(true)
}

function showRepairShopRegisterForm() {
  props.showRepairShopRegisterDialog(true)
}
</script>

<template>
  <div
    class="w-full fixed top-0 left-0 z-10 bg-main-40 backdrop-blur-sm h-screen flex items-center justify-center"
  >
    <div class="w-full max-w-[1000px] flex justify-center items-center">
      <button
        type="button"
        class="bg-main w-full text-2xl py-20 font-title-bold text-main account-btn rounded-l-lg"
        @click="showPrivateRegisterForm"
      >
        Registrera som privatperson
      </button>
      <button
        type="button"
        class="bg-main w-full text-2xl py-20 font-title-bold text-main account-btn rounded-r-lg"
        @click="showRepairShopRegisterForm"
      >
        Registrera som verkstad
      </button>
    </div>
  </div>
</template>
