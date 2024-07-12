import type { IRepairShopAnswer } from '@/models/IRepairShopAnswer'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const repairShopSelectedJobs = defineStore('selectedJobs', () => {
  const selectedWork = ref<IRepairShopAnswer[]>([])

  function saveSelectedJob(job: IRepairShopAnswer, emptyArray: boolean) {
    selectedWork.value.push(job)
    // console.log('selectedWork.value:', selectedWork.value)

    if (emptyArray) {
      selectedWork.value = []
    }
  }

  return {
    selectedWork,
    saveSelectedJob
  }
})
