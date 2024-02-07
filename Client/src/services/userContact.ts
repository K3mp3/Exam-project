import type { IUserContact } from '@/models/IUserContact'
import axios from 'axios'

const BASE_URL = 'https://shark-app-mvsjk.ondigitalocean.app'

export async function contactRepairShops(messageData: IUserContact) {
  try {
    const response = await axios.post<IUserContact>(
      `${BASE_URL}/contactRepairShops/contactRepairShops`,
      messageData
    )

    return response.data
  } catch (error) {
    return error
  }
}

export async function getContactRepairShops() {
  try {
    const response = await axios.get(`${BASE_URL}/contactRepairShops/contactRepairShops`)
    return response.data
  } catch (error) {
    return error
  }
}

export async function answerRepairShops(messageData: IUserContact) {
  try {
    const response = await axios.post<IUserContact>(
      `${BASE_URL}/users/answerRepairShops`,
      messageData
    )
    return response.data
  } catch (error) {
    return error
  }
}
