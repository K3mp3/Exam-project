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
  <label for="workType">Typ av arbete</label>
  <select
    name="workType"
    class="signed-in-contact-form-select"
    v-model="workType"
    @change="handleChange"
  >
    <option value="AC">AC</option>
    <option value="Exhaust">Avgaser</option>
    <option value="Battery">Batteri</option>
    <option value="Service">Service</option>
    <option value="Detailing">Fordonsvård</option>
    <option value="Inspection">Besiktning och förkontroll</option>
  </select>
</template>
