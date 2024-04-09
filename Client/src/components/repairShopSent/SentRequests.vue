<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  index: {
    type: Object,
    required: true
  },
  onAnswer: {
    type: Function,
    required: true
  }
})

const priceOffer = ref('')

const isMessageBox = ref(false)

const messageArray: { message: string; name: string; date: string }[] = []

const repairShopName = localStorage.getItem('userName')

function showMessageBox() {
  isMessageBox.value = !isMessageBox.value
}

onMounted(() => {
  const flattenedMessages = props.index.customerMessage.concat(props.index.repairShopAnswer)

  flattenedMessages.sort(
    (a: { date: string }, b: { date: string }) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  messageArray.push(...flattenedMessages)
})
</script>

<template>
  <div class="display-flex flex-dir-col gap-16">
    <p class="customer-name">{{ props.index.customerName }}</p>

    <div class="message-content-parent-container">
      <div class="message-content-top-nav">
        <p><span>Registreringsnummer: </span>{{ props.index.registrationNumber }}</p>
        <button v-if="!isMessageBox" type="button" class="show-more-btn" @click="showMessageBox">
          <fontAwesome :icon="['fas', 'chevron-down']" />
        </button>
        <button v-if="isMessageBox" type="button" class="show-more-btn" @click="showMessageBox">
          <fontAwesome :icon="['fas', 'chevron-up']" />
        </button>
      </div>
      <div class="message-content-text" v-if="isMessageBox">
        <p v-for="index in messageArray" :key="index.date">
          <span :class="repairShopName === index.name ? 'text-active-blue' : ''">{{
            repairShopName === index.name ? 'Du' : index.name
          }}</span
          >{{ index.message }}
        </p>
      </div>
    </div>

    <label for="priceOffer" v-if="isMessageBox">Prisförslag</label>
    <input
      v-if="isMessageBox"
      type="text"
      name="priceOffer"
      placeholder="500 kr"
      v-model="priceOffer"
      maxlength="7"
      class="price-offer-input"
    />
    <hr />
  </div>
</template>
