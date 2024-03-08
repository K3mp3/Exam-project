<script setup lang="ts">
const props = defineProps({
  requests: {
    type: Object,
    required: true
  }
})

console.log(props.requests)
</script>

<template>
  <div class="request-container-tablet">
    <p class="text-main font-text-light">{{ props.requests.repairShopName }}</p>
    <div class="request-container-content-tablet">
      <p class="text-main font-text-light">
        <span>Registreringsnummer: </span>{{ props.requests.registrationNumber }}
      </p>
      <button
        type="button"
        class="show-more-btn"
        @click="showMessageBox(props.requests._id)"
      ></button>
    </div>
    <button
      type="button"
      :class="isTrashBtn ? 'trash-btn-visible' : 'trash-btn'"
      @click="removeRequest"
    >
      <fontAwesome :icon="['fas', 'trash']" />
    </button>
    <div class="line-inactive"></div>
  </div>
</template>
