<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { getContactRepairShops } from '@/services/userContact'
import { onMounted, ref } from 'vue'
import RepairShopMessageContent from './RepairShopMessageContent.vue'

const messages = ref<IUserContact[]>([])

async function getMessages() {
  const response = await getContactRepairShops()
  messages.value = response

  console.log(response)
}

onMounted(() => {
  getMessages()
})
</script>

<template>
  <h3>Dina förfrågningar</h3>

  <form>
    <RepairShopMessageContent
      v-for="index in messages"
      :key="index._id"
      :index="messages"
    ></RepairShopMessageContent>
  </form>

  <div class="blue-line"></div>
</template>
