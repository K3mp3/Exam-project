<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

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

const messageAnswer = ref('')
const priceOffer = ref('')

const isMessageBox = ref(false)
const isShortMessage = ref(true)
const isMessageAnswer = ref(false)
const isBtnDisabled = ref(true)

const inputsArray: { key: string; value: boolean }[] = [{ key: 'isMessageAnswer', value: false }]

const answerData = computed(() => {
  return {
    customerId: props.index.customerId,
    messageId: props.index.messageId,
    customerAnswer: messageAnswer.value,
    answeredByRepairShop: false
  }
})

const emits = defineEmits<{
  (
    e: 'showMore',
    customerMessage: { message: string; name: string; date: string }[],
    repairShopAnswer: { message: string; name: string; date: string }[],
    index: any
  ): void
}>()

function showMessageBox(index: any) {
  isMessageBox.value = true

  nextTick(() => {
    emits('showMore', props.index.customerMessage, props.index.repairShopAnswer, index)
  })
}

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
}

function checkInputDataAnswer() {
  nextTick(() => {
    if (messageAnswer.value === '') {
      return
    } else {
      isMessageAnswer.value = true

      const index = inputsArray.findIndex((field) => field.key === 'isMessageAnswer')

      if (index !== -1) {
        inputsArray[index].value = isMessageAnswer.value
      } else {
        inputsArray.push({ key: 'isMessageAnswer', value: isMessageAnswer.value })
      }

      checkInputData()
    }
  })
}

function sendAnswer() {
  props.onAnswer(answerData.value)
}
</script>

<template>
  <div class="request-container-tablet">
    <p>{{ props.index.repairShopName }}</p>
    <div class="request-container-content-tablet">
      <p><span>Registreringsnummer: </span>{{ props.index.registrationNumber }}</p>
      <button type="button" class="show-more-btn" @click="showMessageBox(props.index._id)"></button>
    </div>
    <div :class="isMessageBox ? 'line-active' : 'line-inactive'"></div>
  </div>
</template>

<!-- <div class="left-column">
      <div class="user-sent-answer-form-container-tablet">
        <p>{{ props.index.repairShopName }}</p>

        <div class="user-sent-message-content-container-tablet">
          <div class="user-sent-message-content-top-nav-tablet">
            <p>
              <span v-if="isMessageBox">Registreringsnummer: </span
              >{{ props.index.registrationNumber }}
            </p>
            <button
              type="button"
              class="show-more-btn"
              @click="showMessageBox"
              v-if="!isMessageBox"
            >
              <fontAwesome :icon="['fas', 'chevron-right']" />
            </button>
            <button type="button" class="show-more-btn" @click="showMessageBox" v-else>
              <fontAwesome :icon="['fas', 'chevron-left']" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="right-column" v-if="isMessageBox">
      <div class="user-sent-old-message-content-text-tablet" v-if="isMessageBox">
        <p>{{ props.index.customerMessage[0].message }}</p>
      </div>
      <div class="user-sent-old-message-content-text-tablet" v-if="isMessageBox">
        <div class="repair-shop-sent-message-content-text" v-if="isMessageBox">
          <p>{{ props.index.repairShopAnswer[0].message }}</p>
        </div>
      </div>
      <div class="user-sent-message-content-answer-tablet">
        <textarea
          v-if="isMessageBox"
          name="message-input"
          v-model="messageAnswer"
          class="user-sent-text-editor-answer"
          placeholder="Svar"
          @input="checkInputDataAnswer"
        ></textarea>
      </div>
      <label for="user-sent-priceOffer-tablet" v-if="isMessageBox">Prisförslag</label>
      <input
        v-if="isMessageBox"
        type="text"
        name="priceOffer"
        placeholder="500 kr"
        v-model="priceOffer"
        maxlength="7"
        class="user-sent-price-offer-input"
      />

      <button
        v-if="isMessageBox"
        type="submit"
        :disabled="isBtnDisabled"
        :class="{
          'user-sent-btn-disabled': isBtnDisabled,
          'user-sent-btn': !isBtnDisabled
        }"
        @click="sendAnswer"
      >
        Skicka
      </button>
    </div> -->
