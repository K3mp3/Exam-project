<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  checkInputData: {
    type: Function,
    required: true
  },
  selectData: {
    type: Function,
    required: true
  },
  selectedWork: {
    type: Array,
    required: true
  }
})

const workType = ref('')
const selectedTypes = ref<string[]>([])

function handleChange() {
  props.checkInputData('isWorkType')
  props.selectData(workType.value)
}

watch(
  () => props.selectedWork as [String[], string][],
  (newVal: [String[], string][]) => {
    selectedTypes.value = []
    newVal.forEach((entry) => {
      selectedTypes.value.push(entry[1])
    })

    if (selectedTypes.value.includes('AC')) console.log('hejsan')
  },
  { deep: true }
)
</script>

<template>
  <label for="workType" class="font-text-light flex flex-col gap-1"
    ><span>Typ av arbete</span>
    <select name="workType" class="select text-sm" v-model="workType" @change="handleChange">
      <option value="AC" :disabled="selectedTypes.includes('AC')">AC</option>
      <option value="Exhaust" :disabled="selectedTypes.includes('Exhaust')">Avgaser</option>
      <option value="Battery" :disabled="selectedTypes.includes('Battery')">Batteri</option>
      <option value="Service" :disabled="selectedTypes.includes('Service')">Service</option>
      <option value="Detailing" :disabled="selectedTypes.includes('Detailing')">Fordonsvård</option>
      <option value="Inspection" :disabled="selectedTypes.includes('Inspection')">
        Besiktning och förkontroll
      </option>
    </select>
  </label>
</template>
