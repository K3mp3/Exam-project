import type { IUserContact } from '@/models/IUserContact'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export async function answerFromRepairShop(messageData: IUserContact) {
  // console.log(messageData)
  try {
    console.log(messageData)
    const response = await axios.post<IUserContact>(
      `${BASE_URL}/users/answerFromRepairShop`,
      messageData
    )
    // console.log(response.data)
    return response.data
  } catch (error) {
    return error
  }
}

export async function removedAnsweredRequests() {
  try {
    const response = await axios.get(`${BASE_URL}/users/answerFromRepairShop`)
    return response.data
  } catch (error) {
    return error
  }
}
