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

export async function answerCustomerBack(messageData: IUserContact) {
  try {
    console.log(messageData)
    const response = await axios.post<IUserContact>(
      `${BASE_URL}/answerFromRepairShops/answerCustomer`,
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
    const response = await axios.get(`${BASE_URL}/answerFromRepairShops/answerFromRepairShop`)
    console.log(response.data)
    return response.data
  } catch (error) {
    return error
  }
}

export async function getCorrectAnswer(messageData: object) {
  try {
    console.log(messageData)
    const response = await axios.post(
      `${BASE_URL}/answerFromRepairShops/correctAnswer`,
      messageData
    )
    return response.data
  } catch (error) {
    return error
  }
}
