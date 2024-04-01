<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  selectData: {
    type: Function,
    required: true
  }
})

const troubleshootTime = ref('')

function handleChange() {
  props.selectData(troubleshootTime.value)
}
</script>

<template>
  <label for="troubleshootTime">Felsökningstid</label>
  <select
    name="troubleshootTime"
    class="signed-in-contact-form-select"
    v-model="troubleshootTime"
    @change="handleChange"
  >
    <option value="1 timme">1 timme</option>
    <option value="2 timme">2 timmar</option>
    <option value="3 timme">3 timmar</option>
    <option value="4 timme">4 timmar</option>
  </select>
</template>
