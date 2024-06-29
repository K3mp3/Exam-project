<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  options: Option[]
  setSelectedOption: (option: String[]) => void
  emptyValues: Boolean
}>()

type Option = {
  key: string
  value: string
}

const selectedOption = ref<String[]>([])
const keyType = ref('')

function handleSelectedValueRadio(optionValue: string) {
  selectedOption.value = [optionValue]
  props.setSelectedOption(selectedOption.value)

  console.log(selectedOption.value)
}

function handleSelectedValueCheckBox(optionValue: string) {
  const index = selectedOption.value.indexOf(optionValue)
  if (index === -1) {
    selectedOption.value.push(optionValue)
  } else {
    selectedOption.value.splice(index, 1)
  }
  props.setSelectedOption(selectedOption.value)
}

watch(
  () => props.options,
  (newOptions) => {
    if (newOptions.length > 0) {
      keyType.value = newOptions[0].key
    } else {
      keyType.value = ''
    }
    if (props.emptyValues) {
      selectedOption.value = []
    }
    props.setSelectedOption(selectedOption.value)
    console.log(keyType.value)
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="keyType === 'radio'" class="flex flex-col gap-4">
    <button
      v-for="option in props.options"
      :key="option.key"
      type="button"
      :class="[
        'text-main border-button text-sm',
        selectedOption.includes(option.value) && 'border-button-active'
      ]"
      @click="handleSelectedValueRadio(option.value)"
    >
      <p>{{ option.value }}</p>
    </button>
  </div>

  <div v-if="keyType === 'checkBox'" class="flex flex-col gap-4">
    <button
      v-for="option in props.options"
      :key="option.key"
      type="button"
      :class="[
        'text-main border-button text-sm',
        selectedOption.includes(option.value) && 'border-button-active'
      ]"
      @click="handleSelectedValueCheckBox(option.value)"
    >
      <p>{{ option.value }}</p>
    </button>
  </div>
</template>
