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

const location = ref('')

function handleChange() {
  props.checkInputData('isLocation')
  props.selectData(location.value)
}
</script>

<template>
  <label for="location">Kommun</label>
  <select
    name="location"
    class="signed-in-contact-form-select"
    v-model="location"
    @change="handleChange"
  >
    <option value="Sundsvall">Sundsvall</option>
  </select>
</template>
