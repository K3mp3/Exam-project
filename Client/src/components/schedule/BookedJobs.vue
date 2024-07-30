<script setup lang="ts">
import type { INewJob } from '@/models/INewJob'
import router from '@/router'
import { computed, type PropType } from 'vue'
import { useRoute } from 'vue-router'
import ConfirmDialog from '../dialogs/ConfirmDialog.vue'

const props = defineProps({
  bookedJobs: {
    type: Array as PropType<INewJob[]>,
    required: true
  }
})

const route = useRoute()

const showConfirmDialog = computed(() => route.query.removeBooking === 'true')

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('en-SE', {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

function removeBooking() {
  console.log('hejsan')
}
</script>

<template>
  <h2>Bokningar</h2>
  <div
    class="w-full el-bg-gray rounded-lg border-main flex flex-col gap-1 relative"
    v-for="job in props.bookedJobs"
    :key="job.time"
  >
    <button
      type="button"
      @click="() => router.push({ query: { removeBooking: 'true' } })"
      class="absolute right-0 p-2 hover:text-error-red"
    >
      <fontAwesome :icon="['fas', 'trash']" />
    </button>
    <div class="p-2">
      <h3>Registreringsnummer: {{ job.registrationNumber }}</h3>
      <p>Datum: {{ formatDate(job.date) }}</p>
    </div>
  </div>

  <ConfirmDialog
    :removeRequest="removeBooking"
    :closeDialog="() => router.replace({ query: {} })"
    :heading="'Vill du verkligen radera denna bokning?'"
    :text="'Den går inte att återställa'"
    v-if="showConfirmDialog"
  />
</template>
