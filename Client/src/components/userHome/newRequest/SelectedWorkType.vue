<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  selectedWorkType: {
    type: String,
    required: true
  }
})

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
  switch (props.selectedWorkType) {
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
</script>

<template>
  <div class="flex flex-col gap-6 mb-4">
    <button
      v-for="option in options"
      :key="option.key"
      type="button"
      :class="['text-main border-button']"
    >
      <p>{{ option.value }}</p>
    </button>

    <textarea
      name="message-input"
      class="textarea-input h-36"
      placeholder="Beskriv själv"
    ></textarea>
  </div>

  <!-- <WorkTypeAc v-if="props.selectedWorkType === 'AC'" />
  <WorkTypeExhaust v-if="props.selectedWorkType === 'Exhaust'" /> -->
</template>
