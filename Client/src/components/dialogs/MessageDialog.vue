<!-- <script setup lang="ts">
const props = defineProps({
  index: {
    type: Object,
    required: true
  }
})

console.log(props)
</script>

<template>
  <div class="message-dialog-background">
    <div class="message-dialog-content-container">
      <div class="message-dialog-top-nav">
        <button type="button" class="close-message-dialog-btn" @click="closeSignInDialog">
          <fontAwesome :icon="['fas', 'chevron-left']" />
        </button>
        <p><span>Registreringsnummer: </span>{{ props.index.registrationNumber }}</p>
      </div>
      <div class="message-dialog-text-content-parent">
        <div class="message-dialog-left">
          <p>{{ props.index.name }}</p>

          <div class="message-dialog-text-content-container">
            <p>{{ props.index.message }}</p>
            <hr />

            <textarea
              name="message-input"
              v-model="messageAnswer"
              class="text-editor-answer"
              placeholder="Svar"
              @input="checkInputDataAnswer"
            ></textarea>
          </div>
        </div>
        <div class="message-dialog-right"></div>
      </div>
    </div>
  </div>
</template> -->
