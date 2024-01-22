import type { IRepairShopAnswer } from '@/models/IRepairShopAnswer'
import type { IUserContact } from '@/models/IUserContact'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export async function contactRepairShops(messageData: IUserContact) {
  try {
    console.log(messageData)
    const response = await axios.post<IUserContact>(
      `${BASE_URL}/users/contactRepairShops`,
      messageData
    )

    console.log(response.data)
    return response.data
  } catch (error) {
    return error
  }
}

export async function answerRepairShops(messageData: IRepairShopAnswer) {
  try {
    console.log(messageData)
    const response = await axios.post<IRepairShopAnswer>(
      `${BASE_URL}/users/answerRepairShops`,
      messageData
    )

    console.log(response.data)
    return response.data
  } catch (error) {
    return error
  }
}

export async function getContactRepairShops() {
  try {
    const response = await axios.get(`${BASE_URL}/users/contactRepairShops`)
    return response.data
  } catch (error) {
    return error
  }
}
