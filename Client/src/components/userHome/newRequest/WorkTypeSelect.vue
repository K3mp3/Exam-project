<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  checkInputData: {
    type: Function,
    required: true
  },
  selectData: {
    type: Function,
    required: true
  }
})

const workType = ref('')

function handleChange() {
  props.checkInputData('isWorkType')
  props.selectData(workType.value)
}
</script>

<template>
  <label for="workType" class="font-text-light flex flex-col gap-1"
    ><span>Typ av arbete</span>
    <select name="workType" class="select text-sm" v-model="workType" @change="handleChange">
      <option value="AC">AC</option>
      <option value="Exhaust">Avgaser</option>
      <option value="Battery">Batteri</option>
      <option value="Service">Service</option>
      <option value="Detailing">Fordonsvård</option>
      <option value="Inspection">Besiktning och förkontroll</option>
    </select>
  </label>
</template>
