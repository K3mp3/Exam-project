<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  requests: {
    type: Object,
    required: true
  }
})

const isMessageBox = ref(false)

function showMessageBox() {
  isMessageBox.value = !isMessageBox.value
}

console.log(props.requests)
</script>

<template>
  <div class="display-flex flex-dir-col margin-tp-16 m-width-100">
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
  <div class="display-flex flex-dir-col margin-tp-16 m-width-100">
    <p>{{ props.requests.repairShopName }}</p>

    <div class="user-sent-message-content-container">
      <div class="user-sent-message-content-top-nav p-relative">
        <p class="text-main font-text-light">
          <span class="font-title-bold">Registreringsnummer: </span
          >{{ props.requests.registrationNumber }}
        </p>
        <button type="button" class="show-more-btn" @click="showMessageBox">
          <fontAwesome :icon="['fas', 'chevron-down']" v-if="!isMessageBox" />
          <fontAwesome :icon="['fas', 'chevron-up']" v-if="isMessageBox" />
        </button>
      </div>
      <div class="width-100 margin-tp-10 display-flex flex-dir-col gap-4" v-if="isMessageBox">
        <p
          v-for="index in messageArray"
          :key="index.date"
          class="padding-8-16 display-flex flex-dir-col gap-4 margin-bm-4 text-main font-text-light bg-third b-r-10"
        >
          <span
            :class="userName === index.name ? 'text-active-blue' : 'text-third font-text-light'"
            >{{ userName === index.name ? 'Du' : index.name }}</span
          >{{ index.message }}
        </p>
      </div>
      <div class="width-100 margin-tp-8 margin-bm-8">
        <textarea
          v-if="isMessageBox"
          name="message-input"
          v-model="messageAnswer"
          class="textarea-input h-300 margin-tp-8"
          placeholder="Svar"
          @input="checkInputDataAnswer"
        ></textarea>
      </div>
    </div>
    <label for="user-sent-priceOffer" class="margin-bm-4" v-if="isMessageBox">Prisförslag</label>
    <input
      v-if="isMessageBox"
      type="text"
      name="priceOffer"
      :value="props.requests.priceOffer === '' ? 'Ej angivet' : props.requests.priceOffer"
      maxlength="7"
      class="text-input padding-10 margin-bm-32"
      disabled
    />

    <button
      v-if="isMessageBox"
      type="submit"
      :disabled="isBtnDisabled"
      :class="{
        'main-btn-disabled margin-bm-16': isBtnDisabled,
        'main-btn margin-bm-16': !isBtnDisabled
      }"
      @click="sendAnswer"
    >
      Skicka
    </button>
  </div>
  <div class="line-inactive"></div>
</template>
