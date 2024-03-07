<script setup lang="ts">
const props = defineProps({
  requests: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="display-flex flex-dir-col gap-16 margin-tp-16 m-width-100">
    <p>{{ props.requests.repairShopName }}</p>

    <div class="user-sent-message-content-container">
      <div class="user-sent-message-content-top-nav">
        <p>
          <span v-if="isMessageBox">Registreringsnummer: </span
          >{{ props.requests.registrationNumber }}
        </p>
        <button type="button" class="show-more-btn" @click="showMessageBox">
          <fontAwesome :icon="['fas', 'chevron-down']" />
        </button>
      </div>
      <div class="user-sent-old-message-content-text" v-if="isMessageBox">
        <p v-if="isShortMessage">
          {{ `${props.requests.customerMessage[0].message.slice(0, 100)}...` }}
        </p>
        <p v-if="!isShortMessage">{{ props.requests.customerMessage[0].message }}</p>
        <button
          v-if="isShortMessage"
          type="button"
          class="old-message-show-btn"
          @click="isShortMessage = !isShortMessage"
        >
          <fontAwesome :icon="['fas', 'chevron-down']" /> Se mer
        </button>
        <button
          v-if="!isShortMessage"
          type="button"
          class="old-message-show-btn"
          @click="isShortMessage = !isShortMessage"
        >
          <fontAwesome :icon="['fas', 'chevron-up']" /> stäng
        </button>
        <hr />
      </div>
      <div class="repair-shop-sent-message-content-text" v-if="isMessageBox">
        <p>{{ props.requests.repairShopAnswer[0].message }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>
