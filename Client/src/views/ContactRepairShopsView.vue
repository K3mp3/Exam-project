<script setup lang="ts">
import NewRequestForm from '@/components/userHome/newRequest/NewRequestForm.vue'
import NewRequestTopNav from '@/components/userHome/newRequest/NewRequestTopNav.vue'
import router from '@/router'
import { computed, ref } from 'vue'

const userId = computed(() => {
  const routeParams = router.currentRoute.value.params
  return routeParams.userId || ''
})

const job = ref('')

function handleChange() {
  console.log(job.value)
}
</script>

<template>
  <div class="new-request-parent-container">
    <NewRequestTopNav :userId="userId"></NewRequestTopNav>

    <label for="job" v-if="job === ''">Välj typ av arbete</label>
    <select
      name="job"
      class="signed-in-contact-form-select"
      v-model="job"
      @change="handleChange"
      v-if="job === ''"
    >
      <option value="" selected disabled>Välj typ av arbete</option>
      <option value="Kamremsbyte">Kamremsbyte</option>
      <option value="Framvagnsinställning">Framvagnsinställning</option>
      <option value="Service">Service</option>
      <option value="Övrigt">Övrigt (förklara själv)</option>
    </select>

    <NewRequestForm v-if="job !== ''" :job="job" />
  </div>
</template>
