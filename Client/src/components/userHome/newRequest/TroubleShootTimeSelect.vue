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

const troubleshootTime = ref('')

function handleChange() {
  props.checkInputData('isTroubleshootTime')
  props.selectData(troubleshootTime.value)
}
</script>

<template>
  <label for="troubleshootTime" class="font-text-light flex flex-col gap-1"
    ><span> Felsökningstid </span>
    <select
      name="troubleshootTime"
      class="select text-sm"
      v-model="troubleshootTime"
      @change="handleChange"
    >
      <option value="1 timme">1 timme</option>
      <option value="2 timme">2 timmar</option>
      <option value="3 timme">3 timmar</option>
      <option value="4 timme">4 timmar</option>
    </select>
  </label>
</template>
