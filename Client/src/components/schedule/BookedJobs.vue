<script setup lang="ts">
import type { INewJob } from '@/models/INewJob'
import { removeJob } from '@/services/schedule'
import type { Auth } from 'firebase/auth'
import { ref, type PropType } from 'vue'
import { useRoute } from 'vue-router'
import ConfirmDialog from '../dialogs/ConfirmDialog.vue'
import SentResponseDialog from '../dialogs/SentResponseDialog.vue'

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

console.log(props.booking)

const isConfirmationSuccess = ref(false)
const showConfirmDialog = ref(false)
const bookingIdToRemove = ref<string | null>(null)

const emits = defineEmits<{
  (e: 'fetchJobs'): void
}>()

const route = useRoute()

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

function confirmRemoveBooking(bookingId: string) {
  bookingIdToRemove.value = bookingId
  console.log('Attempting to remove booking with ID:', bookingIdToRemove.value)
  showConfirmDialog.value = true
}

async function removeBooking() {
  if (bookingIdToRemove.value) {
    console.log('Attempting to remove booking with ID:', bookingIdToRemove.value)

    const jobToRemove = {
      id: bookingIdToRemove.value,
      repairShopEmail: props.auth.currentUser?.email,
      customerEmail: props.booking.customerEmail,
      date: props.booking.date
    }

    console.log(jobToRemove)

    const response = await removeJob(jobToRemove)
    console.log('response:', response)

    if (response === 201) {
      isConfirmationSuccess.value = true
      setTimeout(() => {
        isConfirmationSuccess.value = false
      }, 4000)
    }

    emits('fetchJobs')
  }

  showConfirmDialog.value = false
}
</script>

<template>
  <div class="w-full el-bg-gray rounded-lg border-main flex flex-col gap-1 relative">
    <button
      type="button"
      @click="() => confirmRemoveBooking(props.booking.id as string)"
      class="absolute right-0 p-2 hover:text-error-red"
    >
      <fontAwesome :icon="['fas', 'trash']" />
    </button>
    <div class="p-2">
      <h3>Registreringsnummer: {{ props.booking.registrationNumber }}</h3>
      <p>Datum: {{ formatDate(props.booking.date) }}</p>
    </div>
  </div>

  <SentResponseDialog
    v-if="isConfirmationSuccess"
    :isConfirmationSuccess="isConfirmationSuccess"
    :text="'Bokningen har raderats'"
  />

  <ConfirmDialog
    :removeRequest="removeBooking"
    :closeDialog="() => (showConfirmDialog = false)"
    :heading="'Vill du verkligen radera denna bokning?'"
    :text="'Den går inte att återställa'"
    v-if="showConfirmDialog"
  />
</template>
