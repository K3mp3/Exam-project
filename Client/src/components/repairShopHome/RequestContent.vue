<script setup lang="ts">
import { requestDataStore } from '@/stores/requestDataStore'
import { computed, nextTick, ref } from 'vue'
import InfoInput from '../utils/components/InfoInput.vue'

const props = defineProps({
  customerMessage: {
    type: Object,
    required: true
  },
  message: {
    type: Object,
    required: true
  }
})

const setButtonValue = ref('')
const priceOption = ref('')

const isBtnDisabled = ref(true)

const repairShopName = computed(() => requestDataStore().repairShopName)
const repairShopEmail = computed(() => requestDataStore().repairShopEmail)
const repairShopPhoneNumber = computed(() => requestDataStore().repairShopNumber)

function checkInputsData() {
  nextTick(() => {
    if (priceOption.value === '') isBtnDisabled.value = true
    else isBtnDisabled.value = false
  })
}

console.log('props.message:', props.message)

function handleAnswer() {
  const messageData = computed(() => {
    return {
      repairShopName: repairShopName.value,
      repairShopEmail: repairShopEmail.value,
      repairShopPhoneNumber: repairShopPhoneNumber.value,
      customerName: props.message.customerName,
      email: props.message.customerEmail,
      type: props.customerMessage[0].type,
      work: props.customerMessage[0].work,
      message: props.customerMessage[0].message,
      registrationNumber: props.message.registrationNumber,
      price: priceOption.value,
      typeOfFix: setButtonValue.value
    }
  })

  console.log(messageData.value)
}
</script>

<template>
  <p class="font-title-bold">{{ (customerMessage as any)[0].type }}</p>

  <p class="" v-if="(customerMessage as any)[0].work">
    {{ (customerMessage as any)[0].work }}
  </p>

  <p class="">{{ (customerMessage as any)[0].message }}</p>

  <p><span class="font-title-bold">Registreringsnummer: </span>{{ message.registrationNumber }}</p>

  <InfoInput
    :checkInputData="checkInputsData"
    :inputData="(e: string) => (priceOption = e)"
    :inputType="'text'"
    :inputName="'isPrice'"
    :isDataCorrect="true"
    :placeholder="'Prisförslag'"
  />

  <span class="flex gap-2 mt-2"
    ><button
      type="button"
      :class="[
        'w-5 h-5 border-main rounded-full',
        setButtonValue === 'Troubleshoot' && 'border-gr-blue'
      ]"
      @click="setButtonValue = 'Troubleshoot'"
    ></button>
    <p>Felsökning</p></span
  >
  <span class="flex gap-2"
    ><button
      type="button"
      :class="['w-5 h-5 border-main rounded-full', setButtonValue === 'Repair' && 'border-gr-blue']"
      @click="setButtonValue = 'Repair'"
    ></button>
    <p>Reparation</p></span
  >
  <button
    type="button"
    :class="['text-center px-6 text-main mt-4', isBtnDisabled ? 'main-btn-disabled' : 'main-btn ']"
    @click="handleAnswer"
  >
    <p>Skicka</p>
  </button>
</template>
