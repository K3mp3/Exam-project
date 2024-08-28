<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SelectButton from './SelectButton.vue'

const props = defineProps<{
  selectedWorkType: string
  selectedWork: [string[], string, string][]
}>()

const emptyValues = ref(false)
const isBtnDisabled = ref(true)
const textInput = ref('')
const selectedOptions = ref<string[]>([])
const selectedTypes = ref('')
const selectedKeys = ref<string[]>([])

const Ac: { key: string; value: string }[] = [
  { key: 'radio', value: 'AC-Service' },
  { key: 'radio', value: 'AC-Service + rengöring' }
]

const Exhaust: { key: string; value: string }[] = [
  { key: 'checkBox', value: 'Byte av partikelfilter' },
  { key: 'checkBox', value: 'Eftermontering av partikelfilter' },
  { key: 'checkBox', value: 'Byte av katalysator' },
  { key: 'checkBox', value: 'Byte av ljuddämpare' },
  { key: 'checkBox', value: 'Byte av lambdasond' }
]

const Battery: { key: string; value: string }[] = [{ key: 'radio', value: 'Byte av batteri' }]

const Inspection: { key: string; value: string }[] = [
  { key: 'radio', value: 'Kontroll inför besiktning' }
]

const Detailing: { key: string; value: string }[] = [
  { key: 'checkBox', value: 'Invänding rengöring' },
  { key: 'checkBox', value: 'Utvändig rengöring' }
]

const options = computed(() => {
  switch (selectedTypes.value) {
    case 'AC':
      return Ac
    case 'Exhaust':
      return Exhaust
    case 'Battery':
      return Battery
    case 'Inspection':
      return Inspection
    case 'Detailing':
      return Detailing
    default:
      return []
  }
})

const emits = defineEmits<{
  (
    e: 'selectedWorkTypeArray',
    values: string[],
    textInput: string,
    workType: string,
    key: string[]
  ): void
}>()

function handleSelectedOption(option?: string[]) {
  // console.log('textInput:', textInput.value)
  if (option) {
    selectedOptions.value = option
  }

  if (selectedOptions.value.length === 0 && textInput.value.trim() === '') {
    isBtnDisabled.value = true
  } else {
    isBtnDisabled.value = false
  }
}

function handleAddOptions() {
  emits(
    'selectedWorkTypeArray',
    selectedOptions.value,
    textInput.value,
    props.selectedWorkType,
    selectedKeys.value
  )
  emptyValues.value = true
  selectedOptions.value = []
  selectedTypes.value = ''
}

function resetComponent() {
  selectedOptions.value = []
  selectedKeys.value = []
  emptyValues.value = false
  isBtnDisabled.value = true
  textInput.value = ''
  selectedTypes.value = props.selectedWorkType
}

watch(
  () => props.selectedWorkType,
  () => {
    resetComponent()
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex flex-col gap-4 mb-2">
    <SelectButton
      :options="options"
      :setSelectedOption="(e) => handleSelectedOption(e)"
      :emptyValues="emptyValues"
      :selectedWork="selectedWork"
      :setSelectedKey="(e) => (selectedKeys = e)"
    />
    <label for="message-input" class="font-text-light flex flex-col gap-1"
      ><span>Meddelande</span>
      <textarea
        name="message-input"
        class="textarea-input h-40 text-sm"
        placeholder="Beskriv själv"
        v-model="textInput"
        @input="handleSelectedOption()"
      ></textarea>
    </label>

    <button
      type="submit"
      :disabled="isBtnDisabled"
      :class="{
        'main-btn-disabled text-sm mt-6': isBtnDisabled,
        'main-btn text-sm mt-6': !isBtnDisabled
      }"
      @click="handleAddOptions"
    >
      Lägg till arbeten
    </button>
  </div>
</template>
