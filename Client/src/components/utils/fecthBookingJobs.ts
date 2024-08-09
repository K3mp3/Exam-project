import type { INewJob } from '@/models/INewJob'
import { getJob } from '@/services/schedule'

export async function fetchJobsFromServer(): Promise<INewJob[]> {
  try {
    const response = await getJob()
    console.log('getJobs:', response)
    return Array.isArray(response) ? response : [response]
  } catch (error) {
    console.error('Could not fetch jobs from server:', error)
    throw error
  }
}
