<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { getContactRepairShops } from '@/services/userContact'
import { onMounted, ref } from 'vue'

const messages = ref<IUserContact[]>([])
const isMessageBox = ref(false)

async function getMessages() {
  const response = await getContactRepairShops()
  messages.value = response

  console.log(response)
}

function showMessageBox() {
  isMessageBox.value = !isMessageBox.value
}

onMounted(() => {
  getMessages()
})
</script>

<template>
  <h3>Dina förfrågningar</h3>

  <form @submit.prevent="">
    <div
      :class="
        isMessageBox ? 'repair-shop-form-text-container-extend' : 'repair-shop-form-text-container'
      "
      type="button"
      v-for="index in messages"
      :key="index._id"
    >
      <p v-if="!isMessageBox">{{ index.registrationNumber }}</p>
      <p v-if="isMessageBox"><span>Registreringsnummer: </span>{{ index.registrationNumber }}</p>
      <button type="button" class="show-more-btn" @click="showMessageBox">
        <fontAwesome :icon="['fas', 'chevron-down']" />
      </button>
      <div class="message-content" v-if="isMessageBox">
        <p>{{ index.message }}</p>
        <hr />
      </div>
    </div>
  </form>

  <div class="blue-line"></div>
</template>
