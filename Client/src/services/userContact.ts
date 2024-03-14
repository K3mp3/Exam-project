import type { IRepairShopId } from '@/models/IRepairShopId'
import type { IUserContact } from '@/models/IUserContact'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

export async function contactRepairShops(messageData: IUserContact) {
  try {
    console.log(messageData)
    const response = await axios.post<IUserContact>(
      `${BASE_URL}/contactRepairShops/contactRepairShops`,
      messageData
    )

    const data = response.data
    const status = response.status

    return { data, status }
  } catch (error) {
    return 500
  }
}

export async function getContactRepairShops(repairShopId: IRepairShopId) {
  try {
    const response = await axios.post(
      `${BASE_URL}/contactRepairShops/getContactRepairShops`,
      repairShopId
    )

    return response.data
  } catch (error) {
    return error
  }
}

export async function getSentMessages(user: Object) {
  console.log(user)

  try {
    const response = await axios.post(`${BASE_URL}/contactRepairShops/sentMessages`, user)

    return response.data
  } catch (error) {
    return error
  }
}

export async function answerRepairShops(messageData: IUserContact) {
  try {
    console.log('hello')
    console.log(messageData)
    const response = await axios.post<IUserContact>(
      `${BASE_URL}/answerRepairShops/answerRepairShops`,
      messageData
    )
    return response.data
  } catch (error) {
    return error
  }
}

export async function getAnswerRepairShops() {
  try {
    const response = await axios.get(`${BASE_URL}/answerRepairShops/answerRepairShops`)
    return response.data
  } catch (error) {
    return error
  }
}
