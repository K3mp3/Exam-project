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
    <p class="text-main font-text-light">{{ props.index.repairShopName }}</p>
    <div class="request-container-content-tablet">
      <p><span>Registreringsnummer: </span>{{ props.index.registrationNumber }}</p>
      <button type="button" class="show-more-btn" @click="showMessageBox(props.index._id)"></button>
    </div>
    <div :class="isMessageBox ? 'line-active' : 'line-inactive'"></div>
  </div>
</template>
