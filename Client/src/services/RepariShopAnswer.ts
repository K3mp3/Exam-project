import type { IRepairShopAnswer } from '@/models/IRepairShopAnswer'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export async function answerFromRepairShop(messageData: IRepairShopAnswer) {
  console.log(messageData)
  try {
    console.log(messageData)
    const response = await axios.post<IRepairShopAnswer>(
      `${BASE_URL}/users/answerFromRepairShop`,
      messageData
    )

    console.log(response.data)
    return response.data
  } catch (error) {
    return error
  }
}
