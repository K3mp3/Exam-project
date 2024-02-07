import type { IUserContact } from '@/models/IUserContact'
import axios from 'axios'

const BASE_URL = 'https://shark-app-mvsjk.ondigitalocean.app'

export async function answerFromRepairShop(messageData: IUserContact) {
  try {
    const response = await axios.post<IUserContact>(
      `${BASE_URL}/answerFromRepairShops/answerFromRepairShop`,
      messageData
    )
    return response.data
  } catch (error) {
    return error
  }
}

export async function removedAnsweredRequests() {
  try {
    const response = await axios.get(`${BASE_URL}/answerFromRepairShops/answerFromRepairShop`)
    return response.data
  } catch (error) {
    return error
  }
}
