<script setup lang="ts">
import type { INewJob } from '@/models/INewJob'
import router from '@/router'
import { removeJob } from '@/services/schedule'
import type { Auth } from 'firebase/auth'
import { computed, type PropType } from 'vue'
import { useRoute } from 'vue-router'
import ConfirmDialog from '../dialogs/ConfirmDialog.vue'

const props = defineProps({
  booking: {
    type: Object as PropType<INewJob>,
    required: true
  },
  auth: {
    type: Object as PropType<Auth>,
    required: true
  }
})

const emits = defineEmits<{
  (e: 'fetchJobs'): void
}>()

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
  console.log(props.booking.customerEmail)
  const jobToRemove = computed(() => {
    return {
      id: props.booking.id,
      repairShopEmail: props.auth.currentUser?.email,
      customerEmail: props.booking.customerEmail,
      date: props.booking.date
    }
  })

  removeJob(jobToRemove.value)
  router.replace({ query: {} })
  emits('fetchJobs')
}
</script>

<template>
  <div class="w-full el-bg-gray rounded-lg border-main flex flex-col gap-1 relative">
    <button
      type="button"
      @click="() => router.push({ query: { removeBooking: 'true' } })"
      class="absolute right-0 p-2 hover:text-error-red"
    >
      <fontAwesome :icon="['fas', 'trash']" />
    </button>
    <div class="p-2">
      <h3>Registreringsnummer: {{ props.booking.registrationNumber }}</h3>
      <p>Datum: {{ formatDate(props.booking.date) }}</p>
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
