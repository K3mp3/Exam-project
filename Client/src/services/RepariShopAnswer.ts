import type { IUserContact } from '@/models/IUserContact'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

export async function answerFromRepairShop(messageData: IUserContact) {
  try {
    console.log(messageData)
    const response = await axios.post<IUserContact>(
      `${BASE_URL}/answerFromRepairShops/answerFromRepairShop`,
      messageData
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    return error
  }
}

export async function removedAnsweredRequests() {
  try {
    console.log('hejsan')
    const response = await axios.get(`${BASE_URL}/answerFromRepairShops/answerFromRepairShop`)
    console.log(response.data)
    return response.data
  } catch (error) {
    return error
  }
}
