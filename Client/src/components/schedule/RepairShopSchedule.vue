<script setup lang="ts">
import DatePicker from 'primevue/datepicker'
import { ref, watch } from 'vue'

const date = ref()

// Watch for changes in the date
watch(date, (newValue) => {
  console.log('Selected date:', newValue)
})

// Alternative: use a function to handle date changes
// const handleDateChange = (newDate: Date) => {
//   console.log('Date changed:', newDate)
// }
</script>

<template>
  <div class="p-4 text-main">
    <DatePicker v-model="date" dateFormat="yy/mm/dd" showButtonBar showTime hourFormat="24" fluid />
  </div>
</template>

<style scoped></style>
