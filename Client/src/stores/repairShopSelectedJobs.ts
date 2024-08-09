import type { IRepairShopAnswer } from '@/models/IRepairShopAnswer'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const repairShopSelectedJobs = defineStore('selectedJobs', () => {
  const selectedWork = ref<IRepairShopAnswer[]>([])

  function filterSelectedWork(jobType?: string, price?: number) {
    selectedWork.value = selectedWork.value.filter((job) => {
      return job.type !== jobType || job.priceOffer !== price
    })
  }

  function saveSelectedJob(job: IRepairShopAnswer, emptyArray: boolean) {
    const jobExists = selectedWork.value.some((existingJob) => existingJob.id === job.id)

    console.log(job.id)

    if (!jobExists) selectedWork.value.push(job)

    if (emptyArray) {
      selectedWork.value = []
    }
  }

  return {
    selectedWork,
    saveSelectedJob,
    filterSelectedWork
  }
})
