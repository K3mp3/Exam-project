<script setup lang="ts">
import { ref } from 'vue'
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

console.log(props.customerMessage)
</script>

<template>
  <p class="font-title-bold">{{ (customerMessage as any)[0].type }}</p>

  <p class="" v-if="(customerMessage as any)[0].work">
    {{ (customerMessage as any)[0].work }}
  </p>

  <p class="">{{ (customerMessage as any)[0].message }}</p>

  <p><span class="font-title-bold">Registreringsnummer: </span>{{ message.registrationNumber }}</p>

  <InfoInput
    :checkInputData="(e: string) => checkInputsData(e)"
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
</template>
