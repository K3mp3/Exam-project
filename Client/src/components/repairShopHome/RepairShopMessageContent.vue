<script setup lang="ts">
import { ref } from 'vue'

const isMessageBox = ref(false)

const props = defineProps({
  index: {
    type: Object,
    required: true
  }
})

console.log(props)

function showMessageBox() {
  isMessageBox.value = !isMessageBox.value
}
</script>

<template>
  <div class="">
    <div
      :class="
        isMessageBox ? 'repair-shop-form-text-container-extend' : 'repair-shop-form-text-container'
      "
    >
      <div class="top-nav" v-if="!isMessageBox">
        <p>{{ props.index.registrationNumber }}</p>
        <button type="button" class="show-more-btn" @click="showMessageBox">
          <fontAwesome :icon="['fas', 'chevron-down']" />
        </button>
      </div>

      <div class="extended-content-container" v-if="isMessageBox">
        <div class="top-nav-extended">
          <p><span>Registreringsnummer: </span>{{ props.index.registrationNumber }}</p>
          <button type="button" class="show-more-btn" @click="showMessageBox">
            <fontAwesome :icon="['fas', 'chevron-up']" />
          </button>
        </div>

        <div class="message-content" v-if="isMessageBox">
          <p>{{ props.index.message }}</p>
          <hr />
        </div>

        <textarea
          name="message-input"
          v-model="message"
          class="text-editor-answer"
          placeholder="Svar"
          @input="checkInputDataMessage"
        ></textarea>
      </div>
    </div>
    <label for="priceOffer" v-if="isMessageBox">Prisförslag</label>
    <input
      v-if="isMessageBox"
      type="text"
      name="priceOffer"
      placeholder="500 kr"
      v-model="registrationNumber"
      @change="checkInputDataRegistrationNumber"
      @input="formatRegistrationNumber"
      maxlength="7"
    />

    <button
      v-if="isMessageBox"
      type="submit"
      :disabled="isBtnDisabled"
      :class="{
        'user-home-send-btn-disabled': isBtnDisabled,
        'user-home-send-btn': !isBtnDisabled,
        hidden: hideMobileBtn
      }"
    >
      Skicka
    </button>
  </div>
</template>
