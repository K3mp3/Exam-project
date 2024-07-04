<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  // checkInputData: {
  //   type: Function,
  //   required: true
  // },
  selectData: {
    type: Function,
    required: true
  },
  // selectDataType: {
  //   type: Function,
  //   required: true
  // },
  selectedWork: {
    type: Array,
    required: true
  }
})

const workType = ref('')
const selectedTypes = ref<string[]>([])

function handleChange() {
  // console.log('workType.value:', workType.value)
  // props.checkInputData('isTypeOfWork')
  props.selectData(workType.value)
}

watch(
  () => props.selectedWork as [string[], string, string][],
  (newVal: [string[], string, string][]) => {
    selectedTypes.value = []
    newVal.forEach((entry) => {
      selectedTypes.value.push(entry[2])
    })

    if (workType.value && selectedTypes.value.includes(workType.value)) {
      workType.value = ''
    }
  },
  { deep: true }
)
</script>

<template>
  <label for="workType" class="font-text-light flex flex-col gap-1"
    ><span>Typ av arbete</span>
    <select name="workType" class="select text-sm" v-model="workType" @change="handleChange">
      <option value="" selected default disabled>Välj typ av arbete</option>
      <option value="AC">AC</option>
      <option value="Exhaust">Avgaser</option>
      <option value="Battery">Batteri</option>
      <option value="Service">Service</option>
      <option value="Detailing">Fordonsvård</option>
      <option value="Inspection">Besiktning och förkontroll</option>
    </select>
  </label>
</template>
