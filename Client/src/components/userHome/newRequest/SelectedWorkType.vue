<script setup lang="ts">
import WorkTypeAc from './WorkTypeAc.vue'
import WorkTypeExhaust from './WorkTypeExhaust.vue'

const props = defineProps({
  selectedWorkType: {
    type: String,
    required: true
  }
})

console.log(props.selectedWorkType)

if (props.selectedWorkType === 'AC') console.log('fixar det')
</script>

<template>
  <WorkTypeAc v-if="props.selectedWorkType === 'AC'" />
  <WorkTypeExhaust v-if="props.selectedWorkType === 'Exhaust'" />
</template>
