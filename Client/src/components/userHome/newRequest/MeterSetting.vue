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

const meterSetting = ref('')

function handleChange() {
  props.checkInputData('isMeterSetting')
  props.selectData(meterSetting.value)
}
</script>

<template>
  <label for="meterSetting">Mätarställning (km)</label>
  <input
    type="text"
    name="meterSetting"
    placeholder="Mätarställning"
    class="signed-in-contact-form-select"
    v-model="meterSetting"
    @input="handleChange"
  />
</template>
