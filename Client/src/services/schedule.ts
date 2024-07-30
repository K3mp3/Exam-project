import type { INewJob } from '@/models/INewJob'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

export async function saveJob(job: object) {
  try {
    const response = await axios.post(`${BASE_URL}/jobs/saveJob`, job)

    return response.data
  } catch (error) {
    return error
  }
}

export async function getJob(): Promise<INewJob[]> {
  const response = await axios.get(`${BASE_URL}/jobs/getJobs`)
  return response.data
}

export async function removeJob(job: INewJob) {
  const response = await axios.post(`${BASE_URL}/jobs/removeJob`, job)
  return response.data
}
