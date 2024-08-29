<script setup lang="ts">
import { removeUserRequest } from '@/services/removeRequest'
import { computed, nextTick, onMounted, ref } from 'vue'

const props = defineProps({
  index: {
    type: Object,
    required: true
  },
  onAnswer: {
    type: Function,
    required: true
  },
  reFetch: {
    type: Function,
    required: true
  }
})

const messageAnswer = ref('')

const isMessageBox = ref(false)
const isMessageAnswer = ref(false)
const isBtnDisabled = ref(true)
const isConfirmDialog = ref(false)

const inputsArray: { key: string; value: boolean }[] = [{ key: 'isMessageAnswer', value: false }]
const messageArray: { message: string; name: string; date: string }[] = []

const answerData = computed(() => {
  return {
    customerAnswer: messageAnswer.value,
    customerId: props.index.customerId,
    messageId: props.index.messageId,
    answeredByRepairShop: false
  }
})

function showMessageBox() {
  isMessageBox.value = !isMessageBox.value
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
  console.log(answerData.value)
  props.onAnswer(answerData.value)
}

onMounted(() => {
  console.log(props.index.priceOffer)
  const flattenedMessages = props.index.customerMessage.concat(props.index.repairShopAnswer)

  flattenedMessages.sort(
    (a: { date: string }, b: { date: string }) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  messageArray.push(...flattenedMessages)
  console.log(messageArray.length)

  console.log('props.index:', props.index.customerMessage)
})

async function removeRequest() {
  const response = await removeUserRequest(answerData.value as object)
  isConfirmDialog.value = false
  props.reFetch(true)
}
</script>

<template>
  <div
    class="flex flex-col gap-2 w-full max-w-[350px] xl:max-w-[500px] rounded-lg p-3 border-main text-main mb-6"
  >
    <h2>{{ props.index.customerMessage }}</h2>
  </div>
</template>
