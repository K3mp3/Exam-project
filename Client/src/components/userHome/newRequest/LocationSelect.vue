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
  <label for="location" class="font-text-light flex flex-col gap-1 mt-[-5px]"
    ><span>Kommun</span>
    <select name="location" class="select text-sm" v-model="location" @change="handleChange">
      <option value="Sundsvall">Sundsvall</option>
    </select>
  </label>
</template>
