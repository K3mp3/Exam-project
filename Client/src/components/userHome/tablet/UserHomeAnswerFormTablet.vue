<script setup lang="ts">
import { removeUserRequest } from '@/services/removeRequest'
import { computed, nextTick, ref } from 'vue'

const props = defineProps({
  index: {
    type: Object,
    required: true
  },
  onAnswer: {
    type: Function,
    required: true
  },
  onFilter: {
    type: Function,
    required: true
  }
})

console.log(props.index)

const messageAnswer = ref('')
const priceOffer = ref('')

const isMessageAnswer = ref(false)
const isBtnDisabled = ref(true)
const isTrashBtn = ref(false)

const inputsArray: { key: string; value: boolean }[] = [{ key: 'isMessageAnswer', value: false }]

const requestData = computed(() => {
  return {
    customerId: props.index.customerId,
    messageId: props.index.messageId,
    customerName: props.index.customerName,
    answeredByRepairShop: false
  }
})

const emits = defineEmits(['showMore'])

function showTrashBtn() {
  isTrashBtn.value = true
}

function hideTrashBtn() {
  isTrashBtn.value = false
}

function showMessageBox(index: any) {
  props.onAnswer({
    customerName: props.index.customerName,
    customerId: props.index.customerId,
    messageId: props.index.messageId,
    answeredByRepairShop: false
  })

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

async function removeRequest() {
  await removeUserRequest(requestData.value as object)
  props.onFilter(true)
}
</script>

<template>
  <div class="request-container-tablet" @mouseover="showTrashBtn" @mouseleave="hideTrashBtn">
    <p class="text-main font-text-light">{{ props.index.repairShopName }}</p>
    <div class="request-container-content-tablet">
      <p><span>Registreringsnummer: </span>{{ props.index.registrationNumber }}</p>
      <button type="button" class="show-more-btn" @click="showMessageBox(props.index._id)"></button>
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
